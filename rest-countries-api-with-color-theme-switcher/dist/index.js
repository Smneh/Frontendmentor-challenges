const ApiUrl = ' https://restcountries.com/v2/'
const countriesContainerEl = document.body.querySelector(".countries-container")
const userInputCountryFrom = document.body.querySelector('.user-input')
const filtersContainer = document.body.querySelector(".filter ul")
const filters = filtersContainer.querySelectorAll("li")
const filterBtn = document.getElementById('filter-btn')
const darkModeToggleBtn = document.body.querySelector(".toggle-theme")
const maniContextContainer = document.body.querySelector(".main-context")
const detailPartContainer = document.body.querySelector(".details-part")
const backToMainBtn = document.body.querySelector(".back-main-btn")

document.addEventListener('DOMContentLoaded', (e) => getCountries('all'))
userInputCountryFrom.addEventListener("submit", searchForCountry)
darkModeToggleBtn.addEventListener("click", () => document.body.classList.toggle('dark'))
backToMainBtn.addEventListener("click", backToMain)
filterBtn.addEventListener("click", (e) => filtersContainer.classList.toggle("show"))

filters.forEach(filter => {
  filter.addEventListener("click", (e) => {
    getCountries(`region/${filter.textContent}`)
    filtersContainer.classList.remove("show")
  })
})

async function getCountries(filter) {
  try {
    const response = await fetch(ApiUrl + filter)
    const countriesList = await response.json()

    countriesContainerEl.innerHTML = ''
    if (countriesList.length > 0)
      countriesList.forEach(country => addCountryToDom(country));

  } catch (error) {
    alert(error.message);
  }
}

function addCountryToDom(country) {
  const countryEl = document.createElement('div')
  countryEl.classList.add('country')
  countryEl.id = country.alpha3Code;

  countryEl.innerHTML =
    `
    <div class='flag' style="background-image: url(${country.flags.svg})"></div>
      <div class="info">
        <h3 class="name">${country.name}</h3>
        <p>Population: <span>${numberWithCommas(country.population)}</span></p>
        <p>Region: <span>${country.region}</span></p>
        <p>Capital: <span>${country.capital}</span></p>
      </div>
    `

  countriesContainerEl.appendChild(countryEl)
  countryEl.addEventListener('click', (e) => showCountryDetails(e.target))
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function searchForCountry(e) {
  e.preventDefault()
  const userInput = userInputCountryFrom.querySelector("input").value
  if (userInput.trim() === '')
    getCountries('all')
  else
    getCountries(`name/${userInput}`)
}

async function getCountryDetails(code) {
  try {
    const response = await fetch(ApiUrl + `alpha/${code}`)
    const countryData = await response.json()
    return countryData
  } catch (error) {
    alert(error.message);
  }
}

async function showCountryDetails(target) {
  const id = target.closest(".country") ? target.closest(".country").id : target.id
  const country = await getCountryDetails(id)

  maniContextContainer.style.display = 'none'
  detailPartContainer.style.display = 'block'

  const lastCountryEl = detailPartContainer.querySelector(".country-wrapper")
  if (lastCountryEl)
    detailPartContainer.removeChild(lastCountryEl)

  addCountryDetailToDom(country)
}

function addCountryDetailToDom(country) {
  const countryEl = document.createElement("div")
  countryEl.classList.add('country-wrapper')
  countryEl.innerHTML =
    `
      <div class="flag" style="background-image: url(${country.flags.svg})"></div>
    `
  const countryDetailEl = document.createElement('div')
  countryDetailEl.classList.add("detail")
  countryDetailEl.innerHTML =
    `
      <h1>${country.name}</h1>
      <div class="info">
        <div class="info-main">
          <p>Native Name: <span>${country.nativeName}</span></p>
          <p>Population: <span>${numberWithCommas(country.population)}</span></p>
          <p>Region: <span>${country.region}</span></p>
          <p>Sub Region: <span>${country.subregion}</span></p>
          <p>Capital: <span>${country.capital}</span></p>
        </div>
        <div class="info-aside">
          <p>Top Level Domain: <span>${country.topLevelDomain}</span></p>
          <p>Currencies: <span>${countryInfo(country.currencies)}</span></p>
          <p>Languages: <span>${countryInfo(country.languages)}</span></p>
        </div>
      </div>
      `
  if (country.borders)
    addBorders(country.borders, countryDetailEl)
  countryEl.appendChild(countryDetailEl)
  detailPartContainer.appendChild(countryEl)
}

async function addBorders(borders, host) {
  const bordersContainer = document.createElement("div")
  bordersContainer.classList.add('borders')
  bordersContainer.innerHTML = '<p>Border Countries:</p>'
  host.appendChild(bordersContainer)

  for (const border of borders) {
    const borderEl = document.createElement("div")
    borderEl.classList.add('border')
    borderEl.id = border
    const borderDetail = await getCountryDetails(border)
    borderEl.textContent = borderDetail.name
    borderEl.addEventListener('click', (e) => showCountryDetails(e.target))
    bordersContainer.appendChild(borderEl)
  }
}

function countryInfo(array) {
  let res = ''
  array.forEach(lang => res += lang.name + ',')
  return res.replace(/,$/, "")
}

function backToMain() {
  maniContextContainer.style.display = 'block'
  detailPartContainer.style.display = 'none'
}
