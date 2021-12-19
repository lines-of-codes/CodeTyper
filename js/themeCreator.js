"use strict";
const currentThemeInfo = {
    background: "white",
    darkerBackground: "whitesmoke",
    fontColor: "black",
    cssFile: "default",
    codeMirrorName: "default"
}

const codemirror = new CodeMirror(
    document.getElementById("codecontainer"),
    {
        value: `#include <iostream>

int main() {
    // Prints out Hello world
    printf("Hello, world!");
    int age = 15;
    /*
    * Says that Jim is {age} years old using the most complex formatting algorithm as possible on the world
    * And age is declared just above this comment which has the hardcoded value of 15
    */
    printf("Jim is %d years old.", age);
    return 0;
}`,
        mode: "text/x-csrc",
        readOnly: true
    }
);

function importTheme() {
    const themeJSON = JSON.parse(prompt("Please enter theme's JSON data."));
    themeInfos["custom"] = themeJSON;
    setTheme("custom");
}
function onCodeMirrorThemeChange(e) {
    const themeIdentifier = e.target.value.split("|");
    const themeName = themeIdentifier[0];
    const themeFile = themeIdentifier[1] ?? themeName;
    currentThemeInfo.codeMirrorName = themeName;
    currentThemeInfo.cssFile = themeFile;
    themeInfos.custom = currentThemeInfo;
    setTheme("custom");
}
function onFontColorChange(e) {
    currentThemeInfo.fontColor = e.target.value;
    themeInfos.custom = currentThemeInfo;
    setTheme("custom");
}
function onDarkerBackgroundChange(e) {
    currentThemeInfo.darkerBackground = e.target.value;
    themeInfos.custom = currentThemeInfo;
    setTheme("custom");
}
function onBackgroundChange(e) {
    currentThemeInfo.background = e.target.value;
    themeInfos.custom = currentThemeInfo;
    setTheme("custom");
}
function exportTheme() {
    const jsonResult = JSON.stringify(currentThemeInfo);
    showModal("Result", `<p>
    Here's your generated JSON data result! You can share it to your other friends by copying it and let them import the theme.<br>
    <pre id="jsonResultPre">
        ${jsonResult}
        <span class="material-icons" id="copyThemeJSONData" class="copyButton" title="Click to copy">
            content_copy
        </span>
    </pre>
</p>`, [])
    const copyThemeJSONData = document.getElementById("copyThemeJSONData");
    copyThemeJSONData.addEventListener("click", () => {
        navigator.clipboard.writeText(jsonResult);
    });
    const jsonResultPre = document.getElementById("jsonResultPre");
    jsonResultPre.style.overflowX = "scroll";
}

themeInfos.custom = JSON.parse(localStorage.getItem("customTheme")) ?? currentThemeInfo;
setTheme("custom");

window.onbeforeunload = () => {
    localStorage.setItem("customTheme", JSON.stringify(currentThemeInfo));
}