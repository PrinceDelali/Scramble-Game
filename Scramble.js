        const words = [
            { word: "javascript", hint: "A programming language commonly used in web development" },
            { word: "html", hint: "The standard markup language for creating web pages" },
            { word: "css", hint: "A style sheet language used for describing the presentation of a document written in a markup language" },
            { word: "python", hint: "A high-level programming language known for its readability" },
            { word: "developer", hint: "A person who creates software applications" },
            { word: "coding", hint: "The process of writing instructions for a computer to execute" },
            { word: "programming", hint: "The process of designing and building an executable computer software" },
            { word: "software", hint: "A set of instructions that tell a computer how to work" },
            { word: "engineer", hint: "A professional who designs, builds, and maintains software and systems" },
            { word: "algorithm", hint: "A step-by-step procedure for solving a problem or accomplishing a task" },
            { word: "database", hint: "An organized collection of data, generally stored and accessed electronically" }
        ];

        const validWords = ["javascript", "html", "css", "python", "developer", "coding", "programming", "software", "engineer", "algorithm", "database",
            "java", "script", "develop", "code", "program", "soft", "ware", "engine", "algor", "data", "base", "pig"];

        let currentWord = "";
        let scrambledWord = "";
        let currentHint = "";
        let derivedWords = new Set();
        let score = 0;
        let timer;

        function generateScrambledWord() {
            const randomIndex = Math.floor(Math.random() * words.length);
            currentWord = words[randomIndex].word;
            currentHint = words[randomIndex].hint;
            scrambledWord = currentWord.split("").sort(() => Math.random() - 0.5).join("");
            document.getElementById("scrambledWord").innerText = scrambledWord;
            document.getElementById("hint").innerText = `Hint: ${currentHint}`;
            document.getElementById("derivedWords").innerHTML = '';
            derivedWords.clear();
            resetTimer();
        }

        function isDerivedWordValid(word) {
            const wordArr = word.split('');
            const scrambledArr = scrambledWord.split('');
            for (const letter of wordArr) {
                const index = scrambledArr.indexOf(letter);
                if (index === -1) return false;
                scrambledArr.splice(index, 1);
            }
            return validWords.includes(word);
        }

        function checkDerivedWord() {
            const derivedWordInput = document.getElementById("derivedWordInput").value.toLowerCase();
            if (derivedWordInput && isDerivedWordValid(derivedWordInput) && !derivedWords.has(derivedWordInput)) {
                derivedWords.add(derivedWordInput);
                document.getElementById("derivedWords").innerHTML += `<p>${derivedWordInput} ✅</p>`;
                score++;
                document.getElementById("score").innerText = `Score: ${score}`;
                alert("Correct! Keep going.");
            } else if (derivedWords.has(derivedWordInput)) {
                alert("You already entered that word. Try another one.");
            } else {
                alert("Invalid word. Try again.");
            }
            document.getElementById("derivedWordInput").value = ''; // Clear input after checking
        }

        function resetTimer() {
            clearInterval(timer);
            let timeLeft = 30;
            document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
            timer = setInterval(() => {
                timeLeft--;
                document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    alert("Time's up! Moving to the next word.");
                    generateScrambledWord();
                }
            }, 1000);
        }

        generateScrambledWord(); // Generate word on page load

        document.getElementById("checkButton").addEventListener("click", checkDerivedWord);
        document.getElementById("newWordButton").addEventListener("click", generateScrambledWord);