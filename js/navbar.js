"use strict";
import { auth } from "./firebase.js";
import { onAuthStateChanged, updateProfile, signOut } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";

const header = document.getElementById("pageHeader");

onAuthStateChanged(auth, (user) => {
    if(user) {
        const container = document.createElement("div");
        const userDisplayName = document.createElement("span");
        userDisplayName.innerText = user.displayName;
        container.appendChild(userDisplayName);
        const updateDisplayName = document.createElement("button");
        updateDisplayName.onclick = () => {
            const newDisplayName = prompt("Please enter your new display name...");
            if(!newDisplayName) return;
            updateProfile(user, {
                displayName: newDisplayName
            });
        };
        updateDisplayName.innerText = "Update Display name";
        container.appendChild(updateDisplayName);
        const signOutBtn = document.createElement("button");
        signOutBtn.onclick = () => {
            signOut(auth);
        };
        signOutBtn.innerText = "Log out";
        container.appendChild(signOutBtn);
        const joinRace = document.createElement("button");
        joinRace.onclick = () => {
            sessionStorage.removeItem("host");
            window.location.href = "multiplayer.html";
        }
        joinRace.innerText = "Join a multiplayer race";
        container.appendChild(joinRace);
        header.appendChild(container);
    } else {
        const container = document.createElement("div");
        const signInBtn = document.createElement("button");
        signInBtn.innerText = "Register/Login";
        signInBtn.onclick = () => {
            window.location.href = "auth.html";
        };
        container.appendChild(signInBtn);
        header.appendChild(container);
    }
});
