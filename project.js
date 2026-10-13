let b = document.body;

// Sentence banks for each difficulty
let sentences = {
    easy: [
        "The quick brown fox jumps over the lazy dog.",
        "Cats and dogs make wonderful household pets.",
        "Learning to type is a fun and useful skill.",
        "A bright morning sun shines across the valley.",
        "Practice daily to improve your typing speed.",
        "Birds fly high in the clear blue sky.",
        "Fresh fruit tastes sweet and keeps you healthy.",
        "Walking in the park is a relaxing habit.",
        "Music brings joy and energy to our lives.",
        "Always remember to smile and stay positive."
    ],
    medium: [
        "Technology continues to change how people communicate, work, and share creative ideas every single day.",
        "Programming requires patience, logic, and consistent practice to master complex algorithms effectively.",
        "Reading books expands your vocabulary and helps you think more critically about the world around you.",
        "Exploring nature trails on a weekend morning provides a refreshing break from screen time.",
        "Good time management helps reduce stress and increases overall daily productivity at work.",
        "Traveling to new places opens your mind to diverse cultures, traditions, and culinary experiences.",
        "Collaborating with a team helps solve difficult problems much faster than working entirely alone.",
        "Writing clean code makes maintenance easier for other developers joining the project later.",
        "Drinking enough water and getting proper sleep are vital for maintaining good daily health.",
        "Setting clear goals keeps you focused and motivated through challenging academic or professional paths."
    ],
    hard: [
        "Asynchronous JavaScript mechanisms utilizing promises and async/await syntax allow developers to handle complex API requests seamlessly without blocking the main execution thread.",
        "Architecting scalable enterprise applications requires meticulous database normalization, robust security protocols, and optimized caching layers to handle massive concurrent traffic.",
        "Quantum computing leverages superposition and entanglement to solve multi-dimensional mathematical equations exponentially faster than traditional silicon-based processors.",
        "Cybersecurity frameworks must continuously evolve to counteract sophisticated zero-day exploits, phishing campaigns, and advanced persistent threats targeting critical infrastructure.",
        "Maintaining optimal software architecture demands clean code principles, comprehensive automated testing suites, and rigorous code reviews across cross-functional engineering teams.",
        "Distributed systems utilize consensus algorithms like Raft or Paxos to ensure fault tolerance and data consistency across independent network nodes operating in separate geographic regions.",
        "Neural network architectures with convolutional layers and transformer blocks have revolutionized natural language processing and computer vision applications globally.",
        "Containerization tools like Docker combined with Kubernetes orchestration clusters simplify deployment lifecycles and streamline continuous integration and continuous delivery pipelines.",
        "Cryptographic hash functions such as SHA-256 provide robust data integrity verification by generating unique fixed-size alphanumeric signatures from arbitrary input data blocks.",
        "Microservices decomposition breaks monolithic codebases into decoupled services communicating over lightweight protocols like HTTP REST or gRPC for enhanced scalability."
    ]
}

let text = document.getElementById("typetext")
let ans = document.getElementById("speedtest")
let submitBtn = document.getElementById("submitbutton")
let anotherBtn = document.getElementById("anotherbutton")

let easyBtn = document.getElementById("easybutton")
let mediumBtn = document.getElementById("mediumbutton")
let hardBtn = document.getElementById("hardbutton")
let scoreNavBtn = document.getElementById("scorebutton")
let backBtn = document.getElementById("backbutton")

let testView = document.getElementById("test-view")
let scoreView = document.getElementById("score-view")
let scoreTbody = document.getElementById("score-tbody")

submitBtn.addEventListener("click", handleMainButtonClick)
anotherBtn.addEventListener("click", handleAnotherQuestion)

scoreNavBtn.addEventListener("click", showScoreboardPage)
backBtn.addEventListener("click", showTestPage)

let textLetters = []
let textWords = []
let startTime = null
let currentSentence = ""
let currentDifficulty = "easy"
let isSubmitted = false

let score = document.createElement("h1")
let mistake = 0
let lastValue = ""

function display() {
    testView.style.display = "block"
    scoreView.style.display = "none"
    ans.style.display = "inline-block"
    submitBtn.style.display = "inline-block"
}

// Event listeners for difficulty buttons
easyBtn.addEventListener("click", function () {
    currentDifficulty = "easy"
    display()
    setRandomSentence("easy")
})

mediumBtn.addEventListener("click", function () {
    currentDifficulty = "medium"
    display()
    setRandomSentence("medium")
})

hardBtn.addEventListener("click", function () {
    currentDifficulty = "hard"
    display()
    setRandomSentence("hard")
})

ans.addEventListener("keydown", function (event) {
    // Check if Enter was pressed without the Shift key
    if (event.key === "Enter") {
        event.preventDefault() // Prevents the default action
        handleMainButtonClick()           // Triggers submit
    }
})

ans.addEventListener("input", function () {
    if (!startTime) {
        startTime = new Date().getTime()
    }

    let currentValue = ans.value

    // Check if user typed a character forward
    if (currentValue.length > lastValue.length) {
        let typedIndex = currentValue.length - 1
        if (textLetters[typedIndex] && currentValue[typedIndex] !== textLetters[typedIndex]) {
            mistake++
        } else if (!textLetters[typedIndex]) {
            mistake++
        }
    }

    lastValue = currentValue
    typing()
})


// Live feedback function triggered on every keystroke
function typing() {
    let typedLetters = ans.value.split("")
    let spans = text.querySelectorAll("span")

    for (let i = 0; i < spans.length; i++) {
        let currentLetter = typedLetters[i]

        if (currentLetter == null) {
            // Not typed yet (reset style)
            spans[i].style.color = "rgb(2, 137, 145)"
            spans[i].style.textDecoration = "none"
        } else if (currentLetter === textLetters[i]) {
            // Correct letter -> Green
            spans[i].style.color = "green"
            spans[i].style.textDecoration = "none"
        } else {
            // Wrong letter -> Red with underscore
            spans[i].style.color = "red"
            spans[i].style.textDecoration = "underline"
        }
    }
}

// Function to pick a random sentence from the selected difficulty
function setRandomSentence(level) {
    let list = sentences[level]
    let randomIndex = Math.floor(Math.random() * list.length)
    currentSentence = list[randomIndex]

    text.innerText = ""
    textLetters = currentSentence.split("")

    // Convert each letter of the sentence into a <span> for live coloring
    for (let i = 0; i < textLetters.length; i++) {
        let span = document.createElement("span")
        span.innerText = textLetters[i]
        text.append(span)
    }

    // Clear input and reset timer
    ans.value = ""
    startTime = null
    score.remove()

    // Reset buttons state
    isSubmitted = false
    submitBtn.innerText = "Check Speed"
    anotherBtn.style.display = "none"
}

function handleMainButtonClick() {
    if (!isSubmitted) {
        checkSpeed()
    }
    else {
        // Try Again logic: clear textarea and timer, keep sentence
        let spans = text.querySelectorAll("span")

        for (let i = 0; i < spans.length; i++) {
            spans[i].style.color = "rgb(2, 137, 145)"
            spans[i].style.textDecoration = "none"
        }

        ans.value = ""
        startTime = null
        score.remove()
        isSubmitted = false
        submitBtn.innerText = "Check Speed"
        anotherBtn.style.display = "none"
    }
}

function handleAnotherQuestion() {
    setRandomSentence(currentDifficulty)
}

function checkSpeed() {

    let endTime = new Date().getTime()

    // Handle case where user clicks submit without typing
    if (!startTime) {
        score.innerText = "Please start typing first!"
        b.append(score)
        return
    }

    // Calculate time in minutes
    let timeTakenInSeconds = (endTime - startTime) / 1000
    let timeTakenInMinutes = timeTakenInSeconds / 60

    //to check final no of mistakes
    /* let ansLetters = ans.value.split("")
    let finalMistake = 0
    
    for (let i = 0; i < textLetters.length; i++) {
        if (textLetters[i] != ansLetters[i]) {
            finalMistake++
        }
    } */

    let uncompletedChars = textLetters.length - ans.value.length
    if (uncompletedChars > 0) {
        mistake += uncompletedChars
    }

    // Calculate WPM (Standard formula: total characters / 5 / minutes)
    let totalCharactersTyped = ans.value.length
    let wpm = Math.round((totalCharactersTyped / 5) / timeTakenInMinutes)
    if (isNaN(wpm) || timeTakenInMinutes === 0) {
        wpm = 0
    }

    // Calculate Accuracy percentage
    let totalTargetChars = textLetters.length
    let correctChars = totalTargetChars - mistake
    let accuracy = Math.round((correctChars / totalTargetChars) * 100)
    if (accuracy < 0) {
        accuracy = 0
    }

    // Display results
    b.append(score)
    score.innerHTML = "Speed: " + wpm + " WPM | Accuracy: " + accuracy + "% | Mistakes: " + mistake

    // Save score data to localStorage
    let now = new Date()
    let dateTimeStr = now.toLocaleDateString() + " " + now.toLocaleTimeString()

    let record = {
        question: currentSentence,
        type: currentDifficulty.toUpperCase(),
        wpm: wpm,
        accuracy: accuracy + "%",
        mistakes: mistake,
        date: dateTimeStr
    }

    let savedScores = JSON.parse(localStorage.getItem("typeTierScores")) || []
    savedScores.push(record)
    localStorage.setItem("typeTierScores", JSON.stringify(savedScores))

    // Update Button States to "Try Again" & Reveal "Try Another Question"
    isSubmitted = true
    submitBtn.innerText = "Try Again"
    anotherBtn.style.display = "inline-block"
}

function showScoreboardPage() {
    testView.style.display = "none"
    scoreView.style.display = "block"

    ans.value = ""
    startTime = null
    score.remove()
    isSubmitted = false
    submitBtn.innerText = "Check Speed"
    anotherBtn.style.display = "none"

    // Populate table from localStorage
    scoreTbody.innerHTML = ""
    let savedScores = JSON.parse(localStorage.getItem("typeTierScores")) || []

    for (let i = 0; i < savedScores.length; i++) {
        let item = savedScores[i]
        let row = document.createElement("tr")
        row.innerHTML =
            "<td>" + item.question + "</td>" +
            "<td>" + item.type + "</td>" +
            "<td>" + item.wpm + "</td>" +
            "<td>" + item.accuracy + "</td>" +
            "<td>" + item.mistakes + "</td>" +
            "<td>" + item.date + "</td>"
        scoreTbody.append(row)
    }
}

function showTestPage() {
    scoreView.style.display = "none"
    testView.style.display = "block"

    let spans = text.querySelectorAll("span")

    for (let i = 0; i < spans.length; i++) {
        spans[i].style.color = "rgb(2, 137, 145)"
        spans[i].style.textDecoration = "none"
    }
}