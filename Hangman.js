<!DOCTYPE html>
<html>
<head>
    <title>Hangman Game</title>
</head>
<body>
    <h1>Hangman Game</h1>
    <p id="category"></p>
    <p id="word"></p>
    <p id="guesses"></p>
    <input type="text" id="letterInput">
    <button onclick="guessLetter()">Guess</button>
    <p id="message"></p>

    <script>
        // Define word categories
        const categories = {
            animals: ["cat", "dog", "elephant", "giraffe", "lion"],
            fruits: ["apple", "banana", "cherry", "grape", "orange"],
            countries: ["canada", "france", "germany", "japan", "spain"]
        };

        let selectedCategory = "";
        let selectedWord = "";
        let guesses = 6;
        let guessedLetters = [];

        function startGame(category) {
            selectedCategory = category;
            selectedWord = getRandomWord(category);
            guessedLetters = [];
            guesses = 6;

            document.getElementById('category').textContent = `Category: ${category}`;
            updateWordDisplay();
            updateGuessesDisplay();
            document.getElementById('message').textContent = "";
        }

        function getRandomWord(category) {
            const words = categories[category];
            return words[Math.floor(Math.random() * words.length)];
        }

        function updateWordDisplay() {
            let wordDisplay = "";
            for (const letter of selectedWord) {
                if (guessedLetters.includes(letter)) {
                    wordDisplay += letter;
                } else {
                    wordDisplay += "_";
                }
            }
            document.getElementById('word').textContent = wordDisplay;
        }

        function updateGuessesDisplay() {
            document.getElementById('guesses').textContent = `Guesses left: ${guesses}`;
        }

        function guessLetter() {
            const letterInput = document.getElementById('letterInput');
            const letter = letterInput.value.toLowerCase();

            if (guessedLetters.includes(letter)) {
                document.getElementById('message').textContent = "You already guessed that letter.";
                return;
            }

            guessedLetters.push(letter);
            letterInput.value = "";

            if (selectedWord.includes(letter)) {
                updateWordDisplay();
                if (selectedWord === document.getElementById('word').textContent) {
                    document.getElementById('message').textContent = "Congratulations! You won!";
                }
            } else {
                guesses--;
                updateGuessesDisplay();
                if (guesses === 0) {
                    document.getElementById('message').textContent = `Game over. The word was ${selectedWord}.`;
                }
            }
        }

        // Start the game with a default category
        startGame("animals");
    </script>
</body>
</html>
