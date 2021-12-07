const changeAmountIcons = document.querySelectorAll(".amount img")
const amountEl = document.getElementById("product-amount")
const thumbnails = document.querySelectorAll('.thumbnail')
const mainThumbnailsContainer = document.querySelector('.product-images.main')
const mainLargeImage = document.getElementById("main-large-img")
const lightBox = document.querySelector('.light-box')
const addToCartBtn = document.getElementById("add-to-cart-btn")
const cartIcon = document.querySelector(".cart-img")
const cartItemsContainer = document.querySelector(".cart-items")
const mobileMenuIcon = document.querySelector(".menu-icon")

let cartItems = []
function cartItem(name, price, amount, imgURl) {
    this.name = name
    this.price = price
    this.amount = amount
    this.imgUrl = imgURl
}

changeAmountIcons.forEach(icon => icon.addEventListener('click', changeAmount.bind(null, icon)))
thumbnails.forEach(thumbnail => thumbnail.addEventListener('click', switchImages.bind(null, thumbnail.closest(".product-images"), thumbnail)))
mainLargeImage.addEventListener("click", showLightBox)
addToCartBtn.addEventListener('click', addItemToCart)
cartIcon.addEventListener('click', showCart)
cartItemsContainer.addEventListener('click', (e) => triggerRemoveItems(e.target))
mobileMenuIcon.addEventListener("click", showMobileMenu)
window.addEventListener('load', removeLargeImageEventListener)
window.addEventListener('resize', removeLargeImageEventListener)

function removeLargeImageEventListener() {
    if (screen.width < 500) {
        mainLargeImage.removeEventListener('click', showLightBox)
        slider(mainThumbnailsContainer)
    }
    else
        mainLargeImage.addEventListener('click', showLightBox)
}

function changeAmount(icon) {
    let amount = amountEl.textContent

    if (icon.classList.contains("plus"))
        amount++
    else if (icon.classList.contains("minus"))
        amount--

    amount = amount < 0 ? 0 : amount
    amountEl.textContent = amount
}

function switchImages(container, activeThumbnail) {
    activateThumbnails(container, activeThumbnail)

    const containersThumbnails = container.querySelectorAll('.thumbnail')
    const imageNumber = Array.prototype.indexOf.call(containersThumbnails, activeThumbnail) + 1

    changeLargeImage(container, imageNumber)
}

function showLightBox() {
    lightBox.classList.add("show")
    lightBox.style.height = document.body.scrollHeight + 'px'
    lightBox.querySelector(".close-icon").addEventListener("click", () => lightBox.classList.remove("show"))

    matchLightBoxImages()
    slider(lightBox)
}

function matchLightBoxImages() {
    const mainThumbnails = mainThumbnailsContainer.querySelectorAll('.thumbnail')
    const activeThumbnail = mainThumbnailsContainer.querySelector('.thumbnail.active')
    const activeThumbnailNumber = Array.prototype.indexOf.call(mainThumbnails, activeThumbnail) + 1

    changeLargeImage(lightBox, activeThumbnailNumber)
    activateThumbnails(lightBox, lightBox.querySelectorAll(".thumbnail")[activeThumbnailNumber - 1])
}

function activateThumbnails(container, toBeActivated) {
    container.querySelectorAll(".thumbnail.active").forEach(item => item.classList.remove("active"))
    toBeActivated.classList.add('active')
}

function changeLargeImage(container, activeImageNumber) {
    const largeImage = container.querySelector(".product-img.large")
    largeImage.style.background = `url(./img/image-product-${activeImageNumber}.jpg) no-repeat center center/cover`
}

function slider(container) {
    const prevBtn = container.querySelectorAll(".prev")
    const nextBtn = container.querySelectorAll('.next')

    const thumbnails = container.querySelectorAll(".thumbnail")
    let activeIndex = Array.prototype.indexOf.call(thumbnails, container.querySelector(".thumbnail.active"))

    prevBtn.forEach(btn => btn.addEventListener('click', () => {
        activeIndex--
        activeIndex = activeIndex < 0 ? (thumbnails.length - 1) : activeIndex
        activateThumbnails(container, thumbnails[activeIndex])
        changeLargeImage(container, activeIndex + 1)
    }))
    nextBtn.forEach(btn => btn.addEventListener('click', () => {
        activeIndex++
        activeIndex = activeIndex > (thumbnails.length - 1) ? 0 : activeIndex
        activateThumbnails(container, thumbnails[activeIndex])
        changeLargeImage(container, activeIndex + 1)
    }))
}

function addItemToCart() {
    const amount = +document.getElementById("product-amount").textContent
    if (amount > 0) {
        const name = document.getElementById("product-name").textContent
        const priceFinal = document.querySelector(".price-discount h2").textContent.replace('$', '')
        const img = document.querySelector(".product-images.main .thumbnail:first-of-type")
        const imgUrl = window.getComputedStyle(img, false).backgroundImage.slice(4, -1).replace(/"/g, "")
        const item = new cartItem(name, priceFinal, amount, imgUrl);

        addToItemsArray(item)
        updateCartNumber()
        updateCartUI()
    }
}

function updateCartNumber() {
    const cartNumber = document.querySelector(".cart-img .number")
    if (cartItems.length > 0) {
        cartNumber.style.display = 'block'
        let amount = cartItems.reduce(function (acc, curr) {
            return acc + curr.amount;
        }, 0)
        cartNumber.textContent = amount
    } else
        cartNumber.style.display = 'none'
}

function addToItemsArray(newItem) {
    let notInList = true
    if (cartItems.length > 0) {
        cartItems.forEach(item => {
            if (item.name === newItem.name) {
                item.amount += newItem.amount
                notInList = false
            }
        })
        if (notInList)
            cartItems.push(newItem)
    } else
        cartItems.push(newItem)
}

function showCart() {
    const cart = document.getElementById("cart")
    cart.classList.toggle("show")
    updateCartUI()
}

function updateCartUI() {
    const checkoutBtn = document.querySelector(".checkout-btn")

    if (cartItems.length > 0) {
        checkoutBtn.classList.remove('hide')
        cartItemsContainer.innerHTML = ''

        cartItems.forEach(item => {
            const itemEl = document.createElement('div')
            itemEl.classList.add('item')
            itemEl.innerHTML =
                `
                    <img
                        src="${item.imgUrl}"
                        alt=""
                        class="item-img"
                    />
                    <div class="info">
                        <p class="item-title">${item.name}</p>
                        <p class="item-cost">
                            <span class="price">$${item.price}</span> x
                            <span class="amount">${item.amount}</span>
                            <span class="total-price">$${(item.amount * item.price).toFixed(2)}</span>
                        </p>
                    </div>
                    <img
                        src="./img/icon-delete.svg"
                        alt=""
                        class="item-delete-icon"
                    />
                `
            cartItemsContainer.appendChild(itemEl)
        })

    } else {
        checkoutBtn.classList.add('hide')
        cartItemsContainer.innerHTML = `<p class="cart-empty">Your cart is empty.</p>`
    }
}

function triggerRemoveItems(target) {
    if (target.classList.contains("item-delete-icon")) {
        const itemEl = target.closest(".item")
        const name = itemEl.querySelector(".item-title").textContent
        cartItems = cartItems.filter(function (item, index, arr) {
            return item.name !== name
        })
        cartItemsContainer.removeChild(itemEl)
        updateCartUI()
        updateCartNumber()
    }
}

function showMobileMenu() {
    const menu = document.querySelector('header .menu')
    menu.classList.add("show")
    menu.style.height = document.body.scrollHeight + 'px'
    menu.querySelector(".close-icon").addEventListener("click", (e) => menu.classList.remove("show"))
}
