const countriesElem = document.querySelector(".countries");
const dropDown = document.querySelector(".header__region--filter-head");
const dropElem = document.querySelector(".header__region--drop");
const region = document.querySelectorAll(".region");
const search = document.querySelector(".header__searchInput");

console.log(countriesElem);
async function getCountry() {
  const url = await fetch("https://restcountries.com/v2/all");
  const res = await url.json();

  res.forEach((e) => {
    showCountry(e);
  });
}

getCountry();
function showCountry(data) {
  const country = document.createElement("figure");
  country.classList.add(
    "overflow-hidden",
    "rounded",
    "w-80",
    "country-wrapper",
    "cursor-pointer"
  );
  country.innerHTML = `
    <div class="card mb-20">
        <div class="h-52">
            <a href="">
                <img class="h-full w-full object-cover" src="${data.flag}">
            </a>     
        </div> 
        <div class="p-8 text-white">
            <h2 class="countryName">
                <strong>${data.name}</strong>
            </h2>
            <p>
                <strong>Population :</strong> ${data.population}
            </p>
            <p class="regionName">
                <strong>Region :</strong> ${data.region}
            </p>
            <p>
                <strong>Capital :</strong> ${data.capital}
            </p>
        </div>   
</div>   
    `;
  countriesElem.appendChild(country);
  country.addEventListener("click", (e) => {
    showCountryDetail(data);
    e.preventDefault();
  });
}


dropDown.addEventListener("click", () => {
  dropElem.classList.toggle("toggle");
});

const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");

region.forEach((element) => {
  element.addEventListener("click", () => {
    console.log(element);
    Array.from(regionName).forEach((elem) => {
      console.log(elem.innerText);
      if (
        elem.innerText.includes(element.innerText) ||
        element.innerText == "All"
      ) {
        elem.parentElement.parentElement.parentElement.style.display = "grid";
      } else {
        elem.parentElement.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

search.addEventListener("input", () => {
  Array.from(countryName).forEach((elem) => {
    if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      elem.parentElement.parentElement.parentElement.style.display = "grid";
    } else {
      elem.parentElement.parentElement.parentElement.style.display = "none";
    }
  });
});

function showCountryDetail(data) {
    const countryModal = document.querySelector(".countries-modal");

  countryModal.classList.toggle("show");

  countryModal.innerHTML = `
    <div class="countryModal fixed top-0 left-0 w-full h-full p-10">
    <button class="countryModal__back  top-12 left-10 px-4">Back</button>
    <div class="countryModal__modal flex justify-center w-full h-full items-center">
        <div class="countryModal__left-modal mr-40 w-96">
            <img src=" ${data.flag}" alt="">
        </div>
        <div class="countryModal__right-modal">
            <h1>  ${data.name}</h1>
            <div class="flex justify-between">
                <div class="countryModal__inner-left mr-40">
                    <p>
                        <strong>Native Name :</strong> ${data.nativeName}
                    </p>
                    <p>
                        <strong>Population :</strong> ${data.population}
                    </p>
                    <p>
                        <strong>Region :</strong> ${data.region}
                    </p>
                    <p>
                        <strong>Sub Region :</strong> ${data.subregion}
                    </p>
                    <p>
                        <strong>Capital :</strong> ${data.capital}
                    </p>
                </div>
                <div class="countryModal__inner-right">
                    <p>
                        <strong>Top Level Domain :</strong> ${data.topLevelDomain}
                    </p>
                    <p>
                        <strong>Currencies :</strong> ${data.currencies.map(elem => elem.name)}
                    </p>
                    <p>
                        <strong>Languages :</strong> ${data.languages.map(elem => elem.name)}
                    </p>
                </div>
            </div>    
        </div>
    </div>
</div>
    `;

  const back = countryModal.querySelector(".countryModal__back");

  back.addEventListener("click", () => {
    countryModal.classList.toggle("show");
  });

}