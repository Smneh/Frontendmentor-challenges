const rangeInputEl = document.getElementById("range-input")
const pageViewEL = document.getElementById("page-view")
const priceAmountEL = document.getElementById("price-amount")
const billingToggleEl = document.getElementById("billing-toggle")

const data = [
    { input: 0, price: 8.00, pageView: '10K' },
    { input: 20, price: 12.00, pageView: '50K' },
    { input: 40, price: 16.00, pageView: '100K' },
    { input: 60, price: 24.00, pageView: '500K' },
    { input: 80, price: 36.00, pageView: '1M' }
]

rangeInputEl.addEventListener('input', (e) => {
    const value = (e.target.value - e.target.min) / (e.target.max - e.target.min) * 100
    e.target.style.background = `linear-gradient(to right, hsl(174, 77%, 80%) 0%, hsl(174, 77%, 80%) ${value}% , hsl(224, 65%, 95%) ${value}%,hsl(224, 65%, 95%)  100%)`

    changePriceAndPageView()

    if (billingToggleEl.checked) {
        applyDiscount()
    }
})

billingToggleEl.addEventListener('click', () => {
    if (billingToggleEl.checked) {
        applyDiscount()
    } else {
        changePriceAndPageView()
    }
})

function changePriceAndPageView() {
    const input = +rangeInputEl.value
    data.forEach(item => {
        if (item.input === input) {
            priceAmountEL.textContent = item.price.toFixed(2)
            pageViewEL.textContent = item.pageView
        }
    })
}

function applyDiscount() {
    const discountAmount = (priceAmountEL.textContent * 25) / 100
    priceAmountEL.textContent = (priceAmountEL.textContent - discountAmount).toFixed(2)
}