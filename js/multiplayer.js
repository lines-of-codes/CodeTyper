import { app, auth } from "./firebase.js";
import { onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { getDatabase, push, ref, get, update, child, remove, onValue } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

const players = document.getElementById("players");

const db = getDatabase(app);
let raceRef;
let memberIndex;
const unsubscribeFunctions = [];
let raceOwner = false;
let currentMatchData = null;

codemirror.setOption("readOnly", true);

function regeneratePlayerElements(data) {
    players.innerHTML = "";
    const keys = Object.keys(data);
    keys.forEach(i => {
        const v = data[i];
        const player = document.createElement("div");
        player.classList.add("player");
        const playerLabel = document.createElement("span");
        playerLabel.id = "playerName";
        playerLabel.innerText = v.displayName;
        player.appendChild(playerLabel);
        if(v.finishedAt) {
            const finishedAtLabel = document.createElement("span");
            finishedAtLabel.innerText = "Finished " + v.finishedAt;
            finishedAtLabel.style.marginLeft = "5px";
            player.appendChild(finishedAtLabel);
        }
        player.appendChild(document.createElement("br"));
        const playerProgress = document.createElement("progress");
        playerProgress.setAttribute("min", "0");
        playerProgress.setAttribute("max", currentCode.length.toString());
        playerProgress.setAttribute("value", v.charTyped.toString());
        player.appendChild(playerProgress);
        players.appendChild(player);
    });
}

async function createNewRace(userId, displayName) {
    if(displayName == null) {
        displayName = prompt("You need a Display name to be able to join races. Please enter your new display name.");
        await updateProfile({
            displayName: displayName
        });
    }
    raceRef = await push(ref(db), {
        language: sessionStorage.getItem("language"),
        sample: sessionStorage.getItem("sample"),
        started: false,
        members: [
            {
                uid: userId,
                displayName: displayName,
                charTyped: 0,
                owner: true,
                finishedAt: null
            }
        ],
        finishedCount: 0
    });
    regeneratePlayerElements([
        {
            displayName: displayName,
            charTyped: 0,
            owner: true
        }
    ]);
    raceOwner = true;
    memberIndex = 0;
    onValue(raceRef, (snapshot) => {
        const data = snapshot.val();
        regeneratePlayerElements(data.members);
        currentMatchData = data;
    });
    sampleChoice = { value: sessionStorage.getItem("sample") };
    changeLanguage(sessionStorage.getItem("language"));
    showModal("Race created", `The ID of the race is 
    <pre>
        ${raceRef.key}
        <span class="material-icons" id="copyMultiplayerKey" title="Click to copy">
            content_copy
        </span>
    </pre>
    You can invite your friend to the race with that ID.`, []);
    document.getElementById("copyMultiplayerKey").addEventListener("click", () => {
        navigator.clipboard.writeText(raceRef.key);
    });
    const pageHeader = document.getElementById("pageHeader");
    const container = document.createElement("div");
    const startButton = document.createElement("button");
    startButton.innerText = "Start race";
    startButton.onclick = () => {
        update(raceRef, {
            started: true
        });
        codemirror.setOption("readOnly", false);
        document.getElementById("waitingForHost").remove();
        startTimer();
        startButton.remove();
    };
    container.appendChild(startButton);
    pageHeader.appendChild(container);
}

onCodeInputChange = () => {
    characterTypedInSecond += 1;
    const value = codemirror.getValue().replaceAll("\t", "    ");
    charSpanElements.forEach((charSpan, index) => {
        const char = value[index];
        if(char == null) {
            charSpan.classList.remove("correct");
            charSpan.classList.remove("incorrect");
        } else if(char === charSpan.innerText || char === " " || char === "\n") {
            charSpan.classList.add("correct");
            charSpan.classList.remove("incorrect");
        } else {
            charSpan.classList.add("incorrect");
            charSpan.classList.remove("correct");
        }
    });
    if(value.replaceAll(" ", "").replaceAll("\n", "") === currentCode.replaceAll(" ", "").replaceAll("\n", "")) {
        onTypingCompleted();
    }
    update(child(raceRef, `members/${memberIndex}`), {
        charTyped: codemirror.getValue().length
    });
}

async function joinARace(userId, displayName) {
    const raceKey = prompt("Please enter race key");
    try {
        raceRef = child(ref(db), raceKey);
        let raceData = await get(raceRef);
        raceData = raceData.val();
        if(raceData == null) {
            alert("Oops... Seems like that race didn't exist...");
        }
        sampleChoice = { value: raceData.sample };
        changeLanguage(raceData.language);
        memberIndex = Object.keys(raceData.members).length;
        update(child(raceRef, "members/" + memberIndex.toString()), {
            uid: userId,
            displayName: displayName,
            charTyped: 0,
            owner: false,
            finishedAt: null
        })
        unsubscribeFunctions.push(onValue(child(raceRef, "members"), (snapshot) => {
            const data = snapshot.val();
            regeneratePlayerElements(data);
        }));
        unsubscribeFunctions.push(onValue(raceRef, (snapshot) => {
            const data = snapshot.val();
            if(data.started && !isStarted) {
                codemirror.setOption("readOnly", false);
                document.getElementById("waitingForHost")?.remove();
                startTimer();
                isStarted = true;
            }
            currentMatchData = data;
            regeneratePlayerElements(data.members);
        }));
    } catch(err) {
        alert("Oops! An error occurred. :/\nDeveloper tips: The error is being printed out to console.");
        console.error(err);
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        if(sessionStorage.getItem("host")) createNewRace(user.uid, user.displayName);
        else joinARace(user.uid, user.displayName);
    } else {
        window.location.href = "auth.html";
    }
});

function generateFinishedAt(num) {
    const str = num.toString();
    if(str.length == 2 && str.startsWith("1")) {
        return str + "th";
    }
    if(str.endsWith("1")) {
        return str + "st";
    } else if(str.endsWith("2")) {
        return str + "nd";
    } else if(str.endsWith("3")) {
        return str + "rd";
    } else {
        return str + "th";
    }
}

onTypingCompleted = () => {
    isStarted = false;
    clearInterval(timerRunnerId);
    const chartLabels = [];
    const chartData = [];
    const cpmData = [];
    const wpmData = [];
    let lastDataSet = {};
    cps.forEach(i => {
        chartLabels.push(i.iteration);
        chartData.push(i.ctis);
        cpmData.push(i.ctis * 60);
        wpmData.push((i.ctis * 60) / 5);
        lastDataSet = i;
    });
    if(lastDataSet.timeOfRecording != new Date()) {
        chartLabels.push((new Date() - startTime) / 1000);
        chartData.push(characterTypedInSecond);
        cpmData.push(characterTypedInSecond * 60);
        wpmData.push((characterTypedInSecond * 60) / 5);
    }
    cps.splice(0, cps.length);
    cpsIteration = 0;
    characterTypedInSecond = 0;
    let sum = chartData.reduce((total, num) => {
        return total + num;
    });
    let avg = sum / chartData.length;
    showModal("You made it!", `<p>You've completed the code typing in ${timer.innerText} seconds!<br>
    <canvas id="cps"></canvas><br>
    Average <abbr title="Characters per second">CPS</abbr>/<abbr title="Characters per minute">CPM</abbr>/<abbr title="Words per minute">WPM</abbr>: ${avg}/${avg * 60}/${(avg * 60) / 5}<br>
    <button onclick="window.location.href = '/'">Go back home</button>
</p>`, []);
    chartInstance = new Chart(
        document.getElementById("cps"),
        {
            type: "line",
            data: {
                labels: chartLabels,
                datasets: [
                    {
                        label: "Character per second",
                        backgroundColor: "#d35400",
                        borderColor: "#d35400",
                        data: chartData
                    }, {
                        label: "Word per minute",
                        backgroundColor: "#f1c40f",
                        borderColor: "#f1c40f",
                        data: wpmData
                    }, {
                        label: "Character per minute",
                        backgroundColor: "#27ae60",
                        borderColor: "#27ae60",
                        data: cpmData
                    }
                ]
            }
        }
    );
    codemirror.setOption("readOnly", true);
    update(raceRef, {
        finishedCount: currentMatchData.finishedCount + 1
    });
    update(child(raceRef, `members/${memberIndex}`), {
        finishedAt: generateFinishedAt(currentMatchData.finishedCount)
    });
}

window.onbeforeunload = () => {
    unsubscribeFunctions.forEach(i => i());
    const data = currentMatchData;
    if(raceRef && data.exists()) {
        // If you are the only one in the race, Delete the race.
        if(data.members.length == 1) {
            remove(raceRef);
        }
    }
}
