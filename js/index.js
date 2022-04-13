const countriesElem = document.querySelector(".countries");
const dropDown = document.querySelector(".header__region--filter-head");
const dropElem = document.querySelector(".header__region--drop");
const region = document.querySelectorAll(".region");
const search = document.querySelector(".header__searchInput");


console.log(countriesElem);
async function getCountry() {
    const url = await fetch("https://restcountries.com/v2/all");
    const res = await url.json();
    

    res.forEach(e => {
        showCountry(e)
    });
}

getCountry()
function showCountry(data) {
    const country = document.createElement("figure");
    country.classList.add("overflow-hidden", "rounded", "w-80", "country-wrapper");
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
}

dropDown.addEventListener('click', () => {
    dropElem.classList.toggle("toggle")
    console.log("hello");
});

const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");

region.forEach(element => {
    element.addEventListener('click', ()=>{
        console.log(element);
        Array.from(regionName).forEach(elem => {
            console.log(elem.innerText);
           if (elem.innerText.includes(element.innerText) || element.innerText=="All" ) {
                elem.parentElement.parentElement.parentElement.style.display="grid"
           } else {
               elem.parentElement.parentElement.parentElement.style.display="none"
           }
        });
    })
});

search.addEventListener('input', () => {
    Array.from(countryName).forEach(elem => {
       if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
            elem.parentElement.parentElement.parentElement.style.display="grid"
       } else {
           elem.parentElement.parentElement.parentElement.style.display="none"
       }
    });
})