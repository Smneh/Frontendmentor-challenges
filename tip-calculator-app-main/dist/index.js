const tipSelections = document.querySelectorAll(".tips-selection .tip")
const customTip = document.querySelector(".tips-selection .custom input")
const inputs = document.querySelectorAll("input[type='number']")

tipSelections.forEach(tipSelection => tipSelection.addEventListener('click', (event) => {
    tipSelections.forEach(tipSelection => tipSelection.classList.remove("focus"))//deselect other tips
    event.target.classList.add('focus')
    calculate()
}))

customTip.addEventListener('click', () => {
    tipSelections.forEach(tipSelection => tipSelection.classList.remove("focus"))//deselect other tips
    calculate()
})

inputs.forEach(input => input.addEventListener('keyup', calculate))

function calculate() {
    let hasEmptyInput = false;

    const userInputs = document.querySelectorAll(".user-input input")
    userInputs.forEach(userInput => {
        if (userInput.value.trim() == '' || userInput.value === '0') {
            userInput.nextElementSibling.style.visibility = 'visible'
            userInput.classList.add('invalid')
            hasEmptyInput = true
        } else {
            userInput.nextElementSibling.style.visibility = 'hidden'
            userInput.classList.remove('invalid')
        }
    })


    let selectedTipAmount = document.querySelector(".tips-selection .tip.focus")
    if (selectedTipAmount == null) {
        selectedTipAmount = document.querySelector('.tips-selection .custom input').value
        if (selectedTipAmount.trim() == '')
            hasEmptyInput = true

    } else {
        selectedTipAmount = +selectedTipAmount.textContent.replace('%', '')
    }

    if (hasEmptyInput) {
        clearResult()
        return
    }

    peopleAmount = +document.getElementById("people").value
    billAmount = +document.getElementById("bill").value

    const totalTip = ((billAmount * selectedTipAmount) / 100)
    const tipPerPerson = (totalTip / peopleAmount).toFixed(2)
    const totalBillPerPerson = ((totalTip + billAmount) / peopleAmount).toFixed(2)

    document.getElementById("tip-amount").textContent = tipPerPerson
    document.getElementById('total-amount').textContent = totalBillPerPerson

    const resetBtn = document.getElementById("reset-btn")
    resetBtn.disabled = false
    resetBtn.addEventListener('click', () => location.reload())
}

function clearResult() {
    document.getElementById("tip-amount").textContent = '0.00'
    document.getElementById('total-amount').textContent = '0.00'
}