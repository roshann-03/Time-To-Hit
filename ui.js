$(document).ready(function () {
  // Constants for Local Storage keys
  const LOCAL_STORAGE_NAME_KEY = "username";
  const LOCAL_STORAGE_SCORE_KEY = "highscore";

  const sounds = {
    click: new Audio("sounds/click.mp3"),
    hitCorrect: new Audio("sounds/hitCorrect.mp3"),
    hitWrong: new Audio("sounds/hitWrong.wav"),
    gameOver: new Audio("sounds/game-over.wav"),
    success: new Audio("sounds/success.wav"),
    error: new Audio("sounds/error.mp3"),
  };
  // Game level configurations
  const levels = {
    easy: 25,
    medium: 50,
    hard: 100,
  };

  // Game state variables
  let chance = 3;
  let hit = 1;
  let score = 0;
  let highScore = getHighScoreFromLocalStorage() || 0;
  let currentLevel;
  let lastToHit;

  function togglePanels(panelId) {
    $("#home-panel").hide();
    $("#game-over").hide();
    $("#game-panel").hide();
    $("#entry-panel").hide();
    $(panelId).show();
  }

  function updateUI() {
    $(".chance span").text("Chance Left: " + chance);
    $(".hit span").text("Hit: " + hit);
    $(".high-score").text(highScore);
    $(".current-score-container .current-score").text(score);
    $(".high-score-container .high-score").text(highScore);
    $(".username").text(getNameFromLocalStorage());
    currentLevel = $(".selected").data("value");
  }

  // Display initial values
  updateUI();

  // Restart the game function
  function restart() {
    resetGameState();
    setBoardDimensions(currentLevel);
    displayNumbers(currentLevel);
    startTimer();
  }

  // Attach click handler for play again button
  $(".play-again-btn").on("click", restart);

  // Local Storage functions
  function getNameFromLocalStorage() {
    return localStorage.getItem(LOCAL_STORAGE_NAME_KEY);
  }

  function setNameInLocalStorage(name) {
    localStorage.setItem(LOCAL_STORAGE_NAME_KEY, name);
  }

  function getHighScoreFromLocalStorage() {
    return localStorage.getItem(LOCAL_STORAGE_SCORE_KEY);
  }

  function setHighScoreInLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_SCORE_KEY, highScore);
  }

  // UI Functions
  function homePanel() {
    const storedName = getNameFromLocalStorage();

    if (storedName) {
      enterGame();
      $("#userInput").val(storedName);
      return;
    }
    togglePanels("#entry-panel");

    $("#userForm").submit((e) => {
      e.preventDefault();
      const name = $("#userInput").val().trim();

      // Validate name input
      if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
        generateFlash("Please enter a valid name A-Z a-z", "error");
        return;
      }
      generateFlash("Welcome, " + name, "success");
      setNameInLocalStorage(name);
      enterGame();
    });
  }

  function deleteAccount() {
    // Clear account details from Local Storage
    localStorage.removeItem(LOCAL_STORAGE_NAME_KEY);
    localStorage.removeItem(LOCAL_STORAGE_SCORE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_LOGIN_KEY);
    togglePanels("#entry-panel");
    updateUI();
    $("#userInput").val("");
    generateFlash("Account deleted successfully", "success");
  }

  // Attach click handler for delete account button
  $(".delete-account-btn").click(deleteAccount);

  function generateFlash(message, type = "error") {
    // Set the appropriate classes based on the message type
    if (type === "success") {
      playSound("success");
      $("#flash-message").removeClass("error").addClass("success");
      $("#flash-close").removeClass("error-close").addClass("success-close");
    } else {
      playSound("error");
      $("#flash-message").removeClass("success").addClass("error");
      $("#flash-close").removeClass("success-close").addClass("error-close");
    }

    // Display the message
    $("#flash-message .flash-text").text(message);
    $("#flash-message").css("top", "3%");

    // Hide the message on close button click
    $("#flash-close")
      .off("click")
      .click(() => {
        $("#flash-message").css("top", "-20%");
        clearTimeout(errorTimeout);
      });

    // Automatically hide the message after 3 seconds
    let errorTimeout = setTimeout(() => {
      $("#flash-message").css("top", "-20%"); // Use #flash-message instead of #message
    }, 3000);
  }

  // Enter game function
  function enterGame() {
    togglePanels("#home-panel");
    $("#start-btn").click(() => startGame());
    handleBoardClick();
    $(".username").text(getNameFromLocalStorage());
  }

  // Logout function
  function logout() {
    togglePanels("#entry-panel");
    generateFlash("Logout successfully", "success");
  }

  // Show home panel
  function home() {
    togglePanels("#home-panel");
  }

  // Exit game function
  function exitGame() {
    resetGameState();
    togglePanels("#home-panel");
  }

  // Button Click Handlers
  $(".home-btn").click(home);
  $(".logout-btn").click(logout);
  $(".exit-btn").on("click", exitGame);

  // Start game function
  function startGame() {
    if (!getNameFromLocalStorage()) {
      homePanel();
      return;
    }
    let selectedLevel = $(".selected").data("value");
    if (!selectedLevel) {
      generateFlash("Please select a level", "error");
      return;
    }

    togglePanels("#game-panel");
    $("#ready-panel").show();
    $("#ready-btn").on("click", function () {
      $("#ready-panel").hide();
      currentLevel = selectedLevel;
      setBoardDimensions(currentLevel);
      displayNumbers(currentLevel);
      startTimer();
    });
  }

  function* generateNumber(count) {
    while (true) {
      yield ++count;
    }
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Display numbers on the board
  function displayNumbers(level, min = 0) {
    let numberGenerator = generateNumber(min);
    const board = document.querySelector(".board");
    board.innerHTML = ""; // Clear the board

    // Get the number of cells based on the level
    let cellCount = levels[level];

    if (!cellCount) {
      console.error("Invalid level");
      return;
    }

    let cells = [];
    let number;
    // Generate and display the cells
    for (let i = 0; i < cellCount; i++) {
      number = numberGenerator.next();
      // Create a new cell
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = number.value;
      cell.dataset.value = number.value; // Store the number value
      cells.push(cell);
    }
    // Store the last number
    lastToHit = number;
    $(".progress").css("width", "0%");
    cells = shuffle(cells);
    cells.forEach((cell) => board.appendChild(cell));
  }

  // Game over function
  function gameOverFunc() {
    clearInterval(timer);
    playSound("gameOver");
    togglePanels("#game-over");
    setHighScoreInLocalStorage(highScore);
    $(".high-score").text(highScore);
    $(".current-score").text(score);
    $(".play-again-btn").on("click", restart); // Restart game on play again button press
  }

  function resetGameState() {
    score = 0;
    hit = 1;
    chance = 3;
    $(".chance span").text("Chance Left: " + chance);
    $(".hit span").text("Hit: " + hit);
    $(".current-score").text(score);
    $(".progress").css("width", "0%");
    togglePanels("#game-panel");
    clearInterval(timer);
  }

  // Cell click handler
  function handleBoardClick() {
    $(".board").on("click", ".cell", function () {
      let hitNumber = $(this).text();
      let number = parseInt(hitNumber);
      let element = $(this);

      if (chance === 0) {
        gameOverFunc();
        return;
      }

      if (number === hit) {
        element.addClass("broken");
        playSound("hitCorrect");
        element.css("background-color", "#a5106a");
        checkNumber();
      } else {
        element.addClass("shake");
        playSound("hitWrong");
        chance--;
        $(".chance span").text("Chance Left: " + chance);
        if (chance <= 0) {
          gameOverFunc(); // Game over if no chances left
        }
      }
      setTimeout(function () {
        element.removeClass("shake broken");
      }, 500); // Pass the hit number to your checkNumber function
    });
  }

  // Timer for the game
  let timer; // Store timer reference
  let timeLeft;

  function startTimer() {
    // Set timeLeft based on currentLevel
    if (currentLevel === "easy") timeLeft = 6000; // 5 seconds
    else if (currentLevel === "medium") timeLeft = 8000; // 8 seconds
    else if (currentLevel === "hard") timeLeft = 10000; // 10 seconds

    const maxTime = timeLeft; // Store the maximum time for width calculation

    clearInterval(timer); // Clear any existing timer
    $(".progress").css("width", "20%"); // Reset width to start from 0

    timer = setInterval(() => {
      timeLeft -= 1000; // Decrease time by 1 second
      let widthPercentage = ((maxTime - timeLeft) / maxTime) * 100 + 20; // Calculate width percentage
      $(".progress").css("width", widthPercentage + "%"); // Update width

      if (timeLeft <= 0) {
        clearInterval(timer); // Stop the timer
        $(".progress").css("width", "100%"); // Ensure it reaches 100%
        gameOverFunc(); // Trigger game over if time runs out
      }
    }, 1000);
  }
  function generateNewNumbers() {
    displayNumbers(currentLevel, hit);
  }
  // Check number and update score
  function checkNumber() {
    score++;
    if (hit == lastToHit.value) {
      // Generate new numbers starting from the last hit number
      generateNewNumbers();
    }

    if (score >= highScore) {
      highScore = score;
      setHighScoreInLocalStorage(highScore);
      $(".high-score").text(getHighScoreFromLocalStorage());
    }
    hit++;

    $(".current-score").text(score);
    $(".hit span").text("Hit: " + hit);

    clearInterval(timer);
    $(".progress").css("width", "0%");
    startTimer();
  }

  // Set board dimensions based on the level
  function setBoardDimensions(level) {
    let cellsPerRow, cellsPerColumn;

    switch (level) {
      case "easy":
        cellsPerRow = 5;
        cellsPerColumn = 5;
        break;
      case "medium":
        cellsPerRow = 9;
        cellsPerColumn = 5;
        break;
      case "hard":
        cellsPerRow = 10;
        cellsPerColumn = 10;
        break;
      default:
        console.error("Invalid level");
        return;
    }

    document
      .querySelector(".board")
      .style.setProperty("--cells-per-row", cellsPerRow);
    document
      .querySelector(".board")
      .style.setProperty("--cells-per-column", cellsPerColumn);
  }

  $(".buttons").on("click", function () {
    playSound("click");
  });

  function playSound(sound) {
    if (sounds[sound]) {
      sounds[sound].currentTime = 0; // Rewind to the start
      sounds[sound].play();
    }
  }

  // Initialize the home panel on page load
  homePanel();
});
