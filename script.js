
let result = document.getElementById("result");
let upbtn = document.querySelector(".scroll-up-btn");
let searchbar = document.querySelector(".search-container");

let filterurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
let searchurl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
let searchBtn = document.getElementById("modalBtn");

let originalSearchDisplay = searchbar.style.display;
let originalBtnDisplay = searchBtn.style.display;

async function getInfo() {
    let userInp = document.getElementById("user-inp").value;
  result.innerHTML = '';
  if (userInp.trim() === "") {
      result.innerHTML = `<h3 class="msg">You must search a valid ingredient</h3>`;
      return;
  }

    const response = await fetch(filterurl + userInp);
    const results = await response.json();

    console.log(results);

    let drinkContainer = document.getElementById("drinkContainer");
    drinkContainer.innerHTML = ''; // Clear previous content

    for (let j = 0; j < 15; j++) {
        const drink = results.drinks[j];

        const resp = await fetch(searchurl + drink.strDrink);
        const resu = await resp.json();

        let ingredientsHTML = '';
        for (let i = 1; i <= 15; i++) {
            let ingredient = resu.drinks[0][`strIngredient${i}`];
            let measure = resu.drinks[0][`strMeasure${i}`];

          if (measure == null || measure.trim().toLowerCase() === 'null') {
              measure = ' '; // Replace null measurement with a space
          }

          // Add ingredient with or without measure
          if (ingredient) {
              ingredientsHTML += `<li>${measure} ${ingredient}</li>`;
          }
        }

        // Create HTML for card
        const cardHTML = `
            <div class="card">
                <h3>${drink.strDrink}</h3>
                <div class="card-image">
                <img src=${results.drinks[j].strDrinkThumb} alt =${drink.strDrink} width = "40" height="60">
                </div>
                <ul>${ingredientsHTML}</ul>
            </div>
        `;

        // Append card to container
        drinkContainer.innerHTML += cardHTML;
    }
}

//When user clicks search button the nav bar shrinks to help accommodate more sapce for visibility
function srinkFunction() {
    document.getElementById("navbar").style.padding = "30px 10px";
    document.getElementById("logo").style.fontSize = "25px";
 
}

searchBtn.addEventListener("click", getInfo);
searchBtn.addEventListener("click", srinkFunction);
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("modalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  searchbar.style.display = originalSearchDisplay ;
  searchBtn.style.display = originalBtnDisplay;
  
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
        searchbar.style.display = originalSearchDisplay ;
    searchBtn.style.display = originalBtnDisplay;
  }
}

window.addEventListener("load", getInfo);
searchBtn.addEventListener("click", getInfo)
searchBtn.addEventListener("click", () => {
    
  searchbar.style.display = "none";
  searchBtn.style.display = "none";
  });
upbtn.addEventListener("click",() => {
  console.log("okay")
  modal.scrollTo({
    top:0,
    behaviour: "smooth",
    
  });
  });
