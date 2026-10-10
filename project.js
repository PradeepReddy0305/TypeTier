let b = document.body;

let text = document.getElementById("typetext")
let ans = document.getElementById("speedtest")
let submit = document.getElementById("submitbutton")

submit.addEventListener("click", checkSpeed)
ans.addEventListener("change", typing)

let textLetters = text.innerText.split("")
let textWords = text.innerText.split(" ")
let startTime = null


ans.addEventListener("input", function() {
    if (!startTime) {
        startTime = new Date().getTime()
    }
})

let score = document.createElement("h1")
let mistake = 0

function typing() {
    
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
    
    let ansLetters = ans.value.split("")
    mistake = 0
    
    for (let i = 0; i < textLetters.length; i++) {
        if (textLetters[i] != ansLetters[i]) {
            mistake++
        }
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
}