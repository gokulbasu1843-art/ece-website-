// ===============================
// ECE Computer Center
// script.js - Part 3A
// ===============================

// Mobile Menu
const mobileMenu = document.getElementById("mobileMenu");

function toggleMenu() {
    mobileMenu.classList.toggle("show");
}

// Close mobile menu after clicking a link
document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("show");
    });
});

// ===============================
// Register Popup
// ===============================

const registerBox = document.getElementById("registerBox");

function openRegister() {
    registerBox.style.display = "flex";
}

function closeRegister() {
    registerBox.style.display = "none";
}

// ===============================
// Notes Popup
// ===============================

const noteBox = document.getElementById("noteBox");

let currentNote = "";

function openNote(noteId) {

    currentNote = noteId;

    const email = localStorage.getItem("studentEmail");

    if (!email) {
        openRegister();
        return;
    }

    noteBox.style.display = "flex";
    document.getElementById("noteInput").value = noteId;
}

function closeNoteBox() {
    noteBox.style.display = "none";
}

// ===============================
// Open Notes
// ===============================

function checkNote() {

    const note = document.getElementById("noteInput").value.trim().toUpperCase();

    switch (note) {

        case "CF101":
            window.location.href = "notes/cf101.html";
            break;

        case "WD102":
            window.location.href = "notes/wd102.html";
            break;

        case "EX202":
            window.location.href = "notes/ex202.html";
            break;

        case "TP301":
            window.location.href = "notes/tp301.html";
            break;

        default:
            alert("Invalid Note ID ❌");
    }

}

// ===============================
// Search Notes
// ===============================

function searchNotes() {

    const value = document
        .getElementById("searchNote")
        .value
        .toLowerCase();

    const cards = document.querySelectorAll(".note-card");

    cards.forEach(card => {

        const text = card.innerText.toLowerCase();

        if (text.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}

// ===============================
// Close Popup Outside Click
// ===============================

window.onclick = function(e){

    if(e.target === registerBox){
        closeRegister();
    }

    if(e.target === noteBox){
        closeNoteBox();
    }

};
