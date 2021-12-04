let sampleChoice = document.getElementById("sampleChoice");
let languageChoice = document.getElementById("language");
const codebackground = document.getElementById("codebackground");
const timer = document.getElementById("timer");
const samplelist = {};
let samples = [];
const cps = []; // (Character typed per seconds)
let characterTypedInSecond = 0;
let cpsIteration = 0;
let chartInstance = null;
let multiplayer = false;

const codemirror = CodeMirror(document.getElementById("maincontent"), {
    autofocus: true
});

function changeLanguage(language = languageChoice.value) {
    if(language instanceof Event) {
        language = languageChoice.value;
    }
    let syntaxHighlightingInformation;
    import(`../code_samples/${language}.js`).then(() => {
        samples = samplelist[language];
        sampleChoice.innerHTML = "";
        samples.forEach(i => {
            if(i.name == "Highlighting Information") {
                console.log("Syntax highlighting information found!")
                syntaxHighlightingInformation = i;
            } else {
                sampleChoice.innerHTML += `<option value="${i.name}">${i.name}</option>`;
            }
        });
        localStorage.setItem("lastSavedLanguage", languageChoice.value);
        onSampleChoiceChange();
        const mode = syntaxHighlightingInformation.mode;
        import(`https://unpkg.com/codemirror@5.63.3/mode/${mode}/${mode}.js`).then(() =>
        {
            codemirror.setOption("mode", syntaxHighlightingInformation.mime);
        });
    });
}

let currentCode;
let charSpanElements = [];
let isStarted = false;
let internallyChangingContent = false;
let startTime;
let timerRunnerId;

function startTimer() {
    timer.innerText = 0;
    startTime = new Date();
    timerRunnerId = setInterval(() => {
        timer.innerText = getTimerTime();
        cpsIteration += 1;
        cps.push({iteration: cpsIteration, ctis: characterTypedInSecond, timeOfRecording: new Date()});
        characterTypedInSecond = 0;
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

function onSampleChoiceChange() {
    let sample = sampleChoice.value;
    charSpanElements = [];
    for(let i = 0; i < samples.length; i++) {
        if(samples[i].name === sample) {
            currentCode = samples[i].code;
            codebackground.innerHTML = "";
            currentCode.split('').forEach(char => {
                const charSpan = document.createElement("span");
                charSpan.innerText = char;
                charSpanElements.push(charSpan);
                codebackground.appendChild(charSpan);
            });
            break;
        }
    }
    codemirror.setValue("");
    isStarted = false;
    clearInterval(timerRunnerId);
    timer.innerText = 0;
}

const lastSavedLanguage = localStorage.getItem("lastSavedLanguage") ?? "python";
if(!multiplayer) languageChoice.value = lastSavedLanguage;
changeLanguage(languageChoice.value);

let onTypingCompleted = () => {
    codemirror.setValue("");
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
    console.log(chartData);
    console.log(cps);
    console.log(cpsIteration);
    cps.splice(0, cps.length);
    cpsIteration = 0;
    characterTypedInSecond = 0;
    let sum = chartData.reduce((total, num) => {
        return total + num;
    });
    let avg = sum / chartData.length;
    showModal("You made it!", `<p>You've completed the code typing in ${timer.innerText} seconds!<br><canvas id="cps"></canvas><br>Average <abbr title="Characters per second">CPS</abbr>/<abbr title="Characters per minute">CPM</abbr>/<abbr title="Words per minute">WPM</abbr>: ${avg}/${avg * 60}/${(avg * 60) / 5}<br>Sum of the chart data (Helps measuring how accurate is the chart): ${sum} of ${currentCode.length}</p>`, [], () => { chartInstance.destroy(); });
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
    timer.innerText = 0;
}

let onCodeInputChange = () => {
    if(!isStarted) {
        isStarted = true;
        startTimer();
    }
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
    onCodeInputChange?.();
    if(value.replaceAll(" ", "").replaceAll("\n", "") === currentCode.replaceAll(" ", "").replaceAll("\n", "")) {
        onTypingCompleted();
    }
}

codemirror.on("change", onCodeInputChange);

function playInMultiplayer() {
    sessionStorage.setItem("language", languageChoice.value);
    sessionStorage.setItem("sample", sampleChoice.value);
    sessionStorage.setItem("host", true);
    window.location.href = "multiplayer.html";
}
