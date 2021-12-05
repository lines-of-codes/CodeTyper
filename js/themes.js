const themeInfos = {
    "default": {
        background: "white",
        darkerBackground: "whitesmoke",
        fontColor: "black"
    },
    "monokai": {
        background: "#272822",
        darkerBackground: "#49483E",
        fontColor: "white",
        cssFile: "monokai"
    },
    "monokai vibrant": {
        background: "#16171D",
        darkerBackground: "#1F2328",
        fontColor: "#f8f8f0",
        cssFile: "monokai",
        codeMirrorName: "monokai"
    },
    "dracula": {
        background: "#282a36",
        darkerBackground: "rgb(20, 22, 34)",
        fontColor: "#f8f8f2",
        cssFile: "dracula"
    },
    "blackboard": {
        background: "#0C1021",
        darkerBackground: "#253B76",
        fontColor: "#F8F8F8",
        cssFile: "blackboard"
    },
    "solarized light": {
        background: "#fdf6e3",
        darkerBackground: "#eee8d5",
        fontColor: "#002b36",
        cssFile: "solarized"
    },
    "solarized dark": {
        background: "#002b36",
        darkerBackground: "#073642",
        fontColor: "#fdf6e3",
        cssFile: "solarized"
    }
};

async function setTheme(themeName) {
    if(themeInfos[themeName] && themeName != "default") {
        let theme = themeInfos[themeName];
        
        const cmTheme = document.createElement("link");
        cmTheme.rel = "stylesheet";
        cmTheme.href = `https://unpkg.com/codemirror@5.63.3/theme/${theme.cssFile}.css`;
        document.head.appendChild(cmTheme);

        codemirror?.setOption("theme", theme.codeMirrorName ?? themeName);
        localStorage.setItem("theme", themeName);
        document.body.style.setProperty("--background", theme.background);
        document.body.style.setProperty("--darker-background", theme.darkerBackground);
        document.body.style.setProperty("--font-color", theme.fontColor);
    } else {
        codemirror?.setOption("theme", "default");
        localStorage.setItem("theme", "default");
        document.body.style.setProperty("--background", themeInfos["default"].background);
        document.body.style.setProperty("--darker-background", themeInfos["default"].darkerBackground);
        document.body.style.setProperty("--font-color", themeInfos["default"].fontColor);
    }
}

setTheme(localStorage.getItem("theme"));

const themeSelector = document.getElementById("themeOption");
themeSelector.value = localStorage.getItem("theme") ?? "default";
themeSelector.addEventListener("change", (e) => {
    setTheme(e.target.value);
});
