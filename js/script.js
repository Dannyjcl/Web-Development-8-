console.log("script.js connected!");

// Stores the user's answer for each question, e.g. { "1": "husky", "2": "bulldog" }
let userAnswers = {};

// Text shown for each possible outcome
let results = {
  "golden-retriever": "You're a Golden Retriever! Friendly, loyal, and everybody's best friend. 🐕",
  "border-collie": "You're a Border Collie! Brilliant, driven, and always up for a challenge. 🧠",
  "bulldog": "You're a Bulldog! Laid-back, dependable, and a master of relaxation. 😴",
  "husky": "You're a Husky! Adventurous, dramatic, and full of energy. 🐺"
};

let answerButtons = document.querySelectorAll(".answer-btn");

answerButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    let questionID = button.dataset.question;

    // Un-highlight other answers for this question only
    answerButtons.forEach(function(btn) {
      if (btn.dataset.question === questionID) {
        btn.classList.remove("selected");
      }
    });
    button.classList.add("selected");

    userAnswers[questionID] = button.dataset.answer;
    console.log(userAnswers);
  });
});

function displayResult() {
  let resultContainer = document.getElementById("result-container");
  let resultText = document.getElementById("result-text");

  if (Object.keys(userAnswers).length === 0) {
    resultText.textContent = "Answer at least one question first!";
    resultContainer.style.display = "block";
    return;
  }

  // Tally how many times each outcome was chosen
  let tally = {};
  for (let questionID in userAnswers) {
    let answer = userAnswers[questionID];
    tally[answer] = (tally[answer] || 0) + 1;
  }

  // Find the most-selected outcome (first one reached wins a tie)
  let winner = null;
  for (let outcome in tally) {
    if (winner === null || tally[outcome] > tally[winner]) {
      winner = outcome;
    }
  }

  resultText.textContent = results[winner];
  resultContainer.style.display = "block";
}

document.getElementById("show-result").addEventListener("click", displayResult);
