// cach
let cut = document.querySelector("#cut-icon"),
  copy = document.querySelector("#copy-icon"),
  paste = document.querySelector("#paste-icon"),
  undo = document.querySelector("#undo-icon"),
  redo = document.querySelector("#redo-icon"),
  fontDecrease = document.querySelector("#font-decrease-icon"),
  fontIncrease = document.querySelector("#font-increase-icon"),
  theNote = document.querySelector("#theNote");

// Main  Font
let fontSize = 15;
function fontEffect(mode) {
  // Check If The Click On The Decrease
  if (mode === "decrease") {
    if (fontSize != 10) theNote.style.fontSize = `${--fontSize}px`;
  }
  // Check If The Click On The Increase
  else if (mode === "increase") {
    if (fontSize != 25) theNote.style.fontSize = `${++fontSize}px`;
  }

  // If The Font Yunger Then 10 Or Equal To 10
  if (fontSize <= 10) {
    fontDecrease.style.cssText = `opacity: 0.5; cursor: not-allowed`;
    fontIncrease.style.cssText = `opacity: 1; cursor: pointer`;
  }
  // Else If The Font Larger Than 25 Or Equal To 25
  else if (fontSize >= 25) {
    fontDecrease.style.cssText = `opacity: 1; cursor: pointer`;
    fontIncrease.style.cssText = `opacity: 0.5; cursor: not-allowed`;
  }
  // Else If The Font Yunger Then 25 And Larger Than 10
  else if (fontSize < 25 && fontSize > 10) {
    fontDecrease.style.cssText = `opacity: 1; cursor: pointer`;
    fontIncrease.style.cssText = `opacity: 1; cursor: pointer`;
  }
}

fontDecrease.addEventListener("click", () => fontEffect("decrease"));
fontIncrease.addEventListener("click", () => fontEffect("increase"));

// The Selection Text Will Be Here
let selected = "";
// To Save The Selection Text To Make Action On It
document.addEventListener(
  "select",
  () => (selected = document.getSelection().toString())
);

// Copy Effect
copy.addEventListener("click", () => navigator.clipboard.writeText(selected));
// Cut Effect
cut.addEventListener("click", () => {
  navigator.clipboard.writeText(selected);
  // To Remove The Cut Text From The Note Area
  let note = theNote.value.split(""),
    slice = note.splice(
      note.indexOf(selected[0], selected[selected.length - 1], 1)
    );
  // Set The Note
  theNote.value = note.join("");
});

// To Add All The Letter Here To Remove It Or Add It Again
let removedLetters = [];

undo.addEventListener("click", () => {
  // Check If There Is Note Or Not
  if (theNote.value.length > 0) {
    /* convert The Note To Array To Remove Last Letter On It
     And Add The Last Letter To The RemoveLetters Array */
    let note = theNote.value,
      arrayOfNote = note.split(""),
      lastUndo = arrayOfNote.pop();
    removedLetters.push(lastUndo);

    // Set The Note
    theNote.value = arrayOfNote.join("");
  }
});
redo.addEventListener("click", () => {
  // Convert The Note To Array To Add The Last Letter Removed To The Note
  let note = theNote.value.split("");
  note.push(removedLetters[removedLetters.length - 1]);
  removedLetters.pop();

  // Set The Note
  theNote.value = note.join("");
});

// Past Effect
paste.addEventListener(
  "click",
  async () => (theNote.value += await navigator.clipboard.readText())
);

// If There Is Note On The LocalStorage
if (localStorage.getItem("lNote"))
  // Get The Note Form The LocalStorage
  theNote.value = localStorage.getItem("lNote");

// Update And Add The Note To LocalStorage On Write
theNote.addEventListener("input", () =>
  localStorage.setItem("lNote", theNote.value)
);
