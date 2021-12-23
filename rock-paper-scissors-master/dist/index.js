const showRulesModalBtn = document.getElementById("rules-btn")
const modalEl = document.body.querySelector(".rules-modal")
const closeModalBtn = modalEl.querySelector(".close-icon")
const selectionChoices = document.body.querySelectorAll(".selection-part .choice")
const selectionPartContainer = document.body.querySelector(".selection-part")
const playingPartContainer = document.body.querySelector(".playing-part")
const userSelectionEl = playingPartContainer.querySelector(".user-choice .choice")
const houseSelectionEl = playingPartContainer.querySelector(".house-choice .choice")
const gameResultEl = document.querySelector(".game-result")
const userScoreEl = document.getElementById("user-score")
const playAgainBtn = document.getElementById("play-again-btn")

let score = JSON.parse(localStorage.getItem('score')) || 0
userScoreEl.textContent = score

let choices = [
    {
        name: 'rock',
        imgUrl: './img/icon-rock.svg',
        res: {
            'rock': 'draw',
            'scissors': 'win',
            'paper': 'lose'
        }
    },
    {
        name: 'scissors',
        imgUrl: './img/icon-scissors.svg',
        res: {
            'rock': 'lose',
            'scissors': 'draw',
            'paper': 'win'
        }
    },
    {
        name: 'paper',
        imgUrl: './img/icon-paper.svg',
        res: {
            'rock': 'win',
            'scissors': 'lose',
            'paper': 'draw'
        }
    }
]

showRulesModalBtn.addEventListener("click", (e) => modalEl.classList.add('show'))
closeModalBtn.addEventListener("click", (e) => modalEl.classList.remove('show'))
selectionChoices.forEach(choice => choice.addEventListener("click", (e) => startGame(e.target)))
playAgainBtn.addEventListener("click", () => location.reload())

function startGame(target) {
    let userSelectedIcon, houseSelectedIcon
    choices.forEach(choice => {
        if (target.closest(".choice").classList.contains(choice.name))
            userSelectedIcon = choice
    })

    selectionPartContainer.classList.add("hide")
    playingPartContainer.classList.add('show')

    userSelectionEl.classList.add(userSelectedIcon.name)
    userSelectionEl.querySelector('img').src = userSelectedIcon.imgUrl

    houseSelectedIcon = choices[getRandomInt(3)]

    setTimeout(() => {
        houseSelectionEl.querySelector("img").src = houseSelectedIcon.imgUrl
        houseSelectionEl.classList.add(houseSelectedIcon.name)
        houseSelectionEl.classList.remove('empty')
    }, 2000);

    setTimeout(() => {
        AnnounceWinner(userSelectedIcon, houseSelectedIcon)
    }, 2500);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function AnnounceWinner(user, house) {
    const result = user.res[house.name]
    gameResultEl.querySelector('#result').textContent = `You ${result}`
    gameResultEl.classList.add("show")

    if (result === 'win') {
        score++
        userSelectionEl.classList.add("winner")
    }
    else if (result === 'lose') {
        score--
        houseSelectionEl.classList.add("winner")
    }

    userScoreEl.textContent = score
    localStorage.setItem('score', JSON.stringify(score));
}
