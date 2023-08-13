document.addEventListener("DOMContentLoaded", async function () {
  const choices = document.querySelectorAll(".choice");
  const resultDiv = document.getElementById("result");
  const computerWinsDiv = document.getElementById("computer-wins");
  const playerWinsDiv = document.getElementById("player-wins");
  const opponentRadioButtons = document.querySelectorAll('input[name="opponent"]');

  choices.forEach((choice) => {
      choice.addEventListener("click", async () => {
          const selectedOpponent = document.querySelector('input[name="opponent"]:checked');
          const playerChoice = choice.id;

          if (selectedOpponent) {
              const opponentValue = selectedOpponent.value;

              const response = await fetch("/play", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                      opponent: opponentValue,
                      choice: playerChoice,
                  }),
              });

              const data = await response.json();

              if (opponentValue === 'Computer') {
                  // Logic for displaying result when playing against the computer
                  const computerChoice = data.c_choice;
                  const result = data.result;
                  const computerWins = data.computer_wins;
                  const playerWins = data.player_wins;

                  resultDiv.innerHTML = `You chose ${playerChoice}. Computer chose ${computerChoice}. You ${result}!`;
                  computerWinsDiv.innerHTML = `Computer wins: ${computerWins}`;
                  playerWinsDiv.innerHTML = `You win: ${playerWins}`;
              } else if (opponentValue === 'Friend') {
                  // Logic for displaying result when playing against a friend
                  const friendChoice = data.friend_choice;
                  const result = data.result;
                  const friendWins = data.friend_wins;
                  const playerWins = data.player_wins;

                  resultDiv.innerHTML = `You chose ${playerChoice}. Friend chose ${friendChoice}. You ${result}!`;
                  computerWinsDiv.innerHTML = `Friend wins: ${friendWins}`;
                  playerWinsDiv.innerHTML = `You win: ${playerWins}`;
              }
          } else {
              // Handle the case when no opponent is selected
              console.log("Please select an opponent.");
          }
      });
  });
});
