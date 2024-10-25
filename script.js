let score = 0;
let currentItemIndex = 0;
const trashItems = document.querySelectorAll('.trash-item');

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.closest('.trash-item').id);
}

function drop(event) {
  event.preventDefault();
  const itemId = event.dataTransfer.getData("text");
  const trashItem = document.getElementById(itemId);
  const binElement = event.target.closest('.bin'); // Get the closest .bin element (in case user drops on h2 or img)
  
  if (!binElement) return; // Prevent issues if drop happens outside bins

  const binType = binElement.getAttribute("data-type");

  if (trashItem.getAttribute("data-type") === binType) {
    // Correct bin
    trashItem.classList.add("hidden");
    score += 10;
    document.getElementById("score").innerText = "Score: " + score;
    showNextTrashItem();
  } else {
    // Incorrect bin
    alert("Wrong bin! Try again.");
    score -= 5;
    document.getElementById("score").innerText = "Score: " + score;
  }
}

function showNextTrashItem() {
  currentItemIndex++;
  if (currentItemIndex < trashItems.length) {
    trashItems[currentItemIndex].classList.remove("hidden");
  } else {
    alert("Game Over! Your final score is: " + score);
  }
}

// Start with the first item visible
window.onload = () => {
  trashItems[currentItemIndex].classList.remove("hidden");
};



