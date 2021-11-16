const sampleChoice = document.getElementById("sampleChoice");
const languageChoice = document.getElementById("language");
const codebackground = document.getElementById("codebackground");
const timer = document.getElementById("timer");
const samplelist = {};
let samples = [];

function loadjsfile(filename, callback = null) {
    let script = document.createElement("script");
    script.src = filename;
    script.onload = callback;
    document.head.appendChild(script);
}

function changeLanguage() {
    loadjsfile(`./code_samples/${languageChoice.value}.js`, () => {
        samples = samplelist[languageChoice.value];
        sampleChoice.innerHTML = "";
        samplelist[languageChoice.value].forEach(i => {
            sampleChoice.innerHTML += `<option value="${i.name}">${i.name}</option>`;
        });
        localStorage.setItem("lastSavedLanguage", languageChoice.value);
        onSampleChoiceChange();
    });
}

const codemirror = CodeMirror(document.getElementById("maincontent"), {
    autofocus: true
});
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
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

function onSampleChoiceChange() {
    charSpanElements = [];
    for(let i = 0; i < samples.length; i++) {
        if(samples[i].name === sampleChoice.value) {
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
changeLanguage(lastSavedLanguage);

function onTypingCompleted() {
    codemirror.setValue("");
    isStarted = false;
    clearInterval(timerRunnerId);
    showModal("You made it!", `<p>You've completed the code typing in ${timer.innerText} seconds!</p>`, []);
    timer.innerText = 0;
}

codemirror.on("change", () => {
    if(!isStarted) {
        isStarted = true;
        startTimer();
    }
    const value = codemirror.getValue().replaceAll("\t", "    ");
    charSpanElements.forEach((charSpan, index) => {
        const char = value[index];
        if(char == null) {
            charSpan.classList.remove("correct");
            charSpan.classList.remove("incorrect");
        } else if(char === charSpan.innerText) {
            charSpan.classList.add("correct");
            charSpan.classList.remove("incorrect");
        } else {
            charSpan.classList.add("incorrect");
            charSpan.classList.remove("correct");
        }
    });
    if(value === currentCode) onTypingCompleted();
});
