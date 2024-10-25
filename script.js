let score = 0;
let currentItemIndex = 0;
const trashItems = document.querySelectorAll('.trash-item');
let draggedItem = null;

// Allow drop event
function allowDrop(event) {
  event.preventDefault();
}

// Drag event for desktop
function drag(event) {
  draggedItem = event.target.closest('.trash-item');
  event.dataTransfer.setData("text", draggedItem.id);
}

// Drop event
function drop(event) {
  event.preventDefault();
  const binElement = event.target.closest('.bin');
  if (!binElement) return;

  const binType = binElement.getAttribute("data-type");
  const itemType = draggedItem.getAttribute("data-type");

  if (itemType === binType) {
    // Correct bin
    draggedItem.classList.add("hidden");
    score += 10;
    document.getElementById("score").innerText = "Score: " + score;
    showNextTrashItem();
  } else {
    // Incorrect bin
    alert("Wrong bin! Try again.");
    score -= 5;
    document.getElementById("score").innerText = "Score: " + score;
  }
  draggedItem = null; // Clear the dragged item after drop
}

// Touch event handlers for mobile
function touchStart(event) {
  draggedItem = event.target.closest('.trash-item');
}

function touchMove(event) {
  event.preventDefault(); // Prevent scrolling while dragging on mobile
}

function touchEnd(event) {
  const touchTarget = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
  const binElement = touchTarget.closest('.bin');
  if (binElement && draggedItem) {
    const binType = binElement.getAttribute("data-type");
    const itemType = draggedItem.getAttribute("data-type");

    if (itemType === binType) {
      // Correct bin
      draggedItem.classList.add("hidden");
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
  draggedItem = null;
}

function showNextTrashItem() {
  currentItemIndex++;
  if (currentItemIndex < trashItems.length) {
    trashItems[currentItemIndex].classList.remove("hidden");
  } else {
    alert("Game Over! Your final score is: " + score);
  }
}

// Attach event listeners for touch on mobile and drag for desktop
trashItems.forEach(item => {
  item.addEventListener('dragstart', drag);
  item.addEventListener('touchstart', touchStart, { passive: false });
  item.addEventListener('touchmove', touchMove, { passive: false });
  item.addEventListener('touchend', touchEnd);
});

// Show the first trash item when the page loads
window.onload = () => {
  trashItems[currentItemIndex].classList.remove("hidden");
};