// Guess the Movie activity
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const resultMessage = document.getElementById('result-message');

guessButton.addEventListener('click', function () {
    const guess = guessInput.value.toLowerCase();
    const movieTitle = "spider-man: homecoming";

    if (guess === movieTitle) {
        resultMessage.textContent = "Congratulations! You guessed it right! Spider-Man: Homecoming is an awesome movie!";
    } else {
        resultMessage.textContent = "Oops! That's not the movie I'm thinking of. Keep guessing!";
    }
});
