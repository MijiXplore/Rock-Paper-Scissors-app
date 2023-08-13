document.addEventListener("DOMContentLoaded", function () {
  const choices = document.querySelectorAll(".choice");
  const resultDiv = document.getElementById("result");
  const computerWinsDiv = document.getElementById("computer-wins");
  const playerWinsDiv = document.getElementById("player-wins");

  choices.forEach((choice) => {
      choice.addEventListener("click", async () => {
          const playerChoice = choice.id;

          const response = await fetch("/play", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ choice: playerChoice }),
          });

          const data = await response.json();
          const computerChoice = data.c_choice;
          const result = data.result;
          const computerWins = data.computer_wins;
          const playerWins = data.player_wins;

          resultDiv.innerHTML = `You chose ${playerChoice}. Computer chose ${computerChoice}. You ${result}!`;
          computerWinsDiv.innerHTML = `Computer wins: ${computerWins}`;
          playerWinsDiv.innerHTML = `You win: ${playerWins}`;
      });
  });
});
