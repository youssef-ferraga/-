let currentQ = 0;
let score = 0;
let selectedNumber = 0;
let questions = [];

function showSelection() {
    document.getElementById("home-screen").style.display = "none";
    document.getElementById("selection-screen").style.display = "block";
    
    const grid = document.getElementById("circles-grid");
    grid.innerHTML = "";
    
    for (let i = 1; i <= 9; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.onclick = () => startQuiz(i);
        grid.appendChild(btn);
    }
}

function startQuiz(num) {
    selectedNumber = num;
    document.getElementById("selection-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    
    // Générer 10 questions pour le nombre choisi
    questions = [];
    for (let i = 1; i <= 10; i++) {
        let correctAns = num * i;
        let options = [correctAns, correctAns + Math.floor(Math.random()*5)+1, correctAns - Math.floor(Math.random()*5)-1, correctAns + 10];
        // Mélanger les options
        options = options.sort(() => Math.random() - 0.5);
        
        questions.push({
            q: `${num} x ${i} ?`,
            a: options,
            correct: options.indexOf(correctAns)
        });
    }
    loadQuestion();
}

function loadQuestion() {
    if (currentQ < questions.length) {
        document.getElementById("question").innerHTML = `<h3>السؤال ${currentQ + 1} / ${questions.length}</h3>` + questions[currentQ].q;
        const container = document.getElementById("answers");
        container.innerHTML = "";
        
        questions[currentQ].a.forEach((choice, index) => {
            const btn = document.createElement("button");
            btn.innerText = choice;
            btn.onclick = () => checkAnswer(index, btn);
            container.appendChild(btn);
        });
    } else {
        const container = document.getElementById("game-container");
        let htmlContent = `<div class="score-text">النتيجة النهائية :</div><div class="score-value">${score} / ${questions.length}</div>`;
        if (score === questions.length) {
            htmlContent += `<img src="bravo.png" alt="Bravo !" style="width: 300px; margin-top: 20px; border-radius: 20px;">`;
        }
        htmlContent += `<br><button class="restart-btn" onclick="location.reload()">إعادة اللعبة</button>`;
        container.innerHTML = htmlContent;
    }
}

function checkAnswer(index, btn) {
    const buttons = document.querySelectorAll("#answers button");
    buttons.forEach(b => b.disabled = true);
    if (index === questions[currentQ].correct) {
        btn.style.backgroundColor = "#28a745";
        btn.style.color = "white";
        score++;
    } else {
        btn.style.backgroundColor = "#dc3545";
        btn.style.color = "white";
        buttons[questions[currentQ].correct].style.backgroundColor = "#28a745";
    }
    setTimeout(() => { currentQ++; loadQuestion(); }, 700);
}