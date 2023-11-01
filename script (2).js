const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
//In these lines, the variables searchBtn, mealList, mealDetailsContent, and recipeCloseBtn 
//are defined and assigned to the respective DOM elements with the given IDs or class names.


searchBtn.addEventListener('click', getMealList);
//When the searchBtn is clicked, the getMealList function is called. 
//This function retrieves a list of meals based on a search query.
mealList.addEventListener('click', getMealRecipe);
//When a meal item is clicked in the mealList, the getMealRecipe function is called. 
//This function retrieves the recipe for the selected meal.
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
//When the recipeCloseBtn is clicked, the function inside the event listener is executed. 
//This function removes the 'showRecipe' class from the parent element of mealDetailsContent, 
//effectively hiding the recipe details.


function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    //This line of code gets the search input value from the HTML element with the id 'search-input' 
    // and removes any leading or trailing whitespace using the trim() method.
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    //This line of code sends a GET request to the themealdb.com API to fetch meal data based on the
    // search input.
    .then(response => response.json())
    //This line of code processes the response from the API and converts it into a JSON object.
    .then(data => {
        //This line of code defines a callback function that will be executed once the 
        //JSON object is received. Inside this function, the code processes the meal data and generates
        // HTML to display the list of meals.
        let html = "";
        //This line of code initializes an empty string to store the HTML code for the meal list.
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        //check if the meal exist or not
        // if yes Inside the forEach loop, the code constructs an HTML string for each meal in the 
        //list. This string includes the meal's name, an image of the meal, and a button to get the 
        //meal's recipe.
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
        //This line of code updates the HTML content of the mealList element with the generated 
        //HTML string.
    });
}



function getMealRecipe(e){
    e.preventDefault();
    //prevents the default behavior of the event 
    //(in this case, navigating to a new page or reloading the current page).
    if(e.target.classList.contains('recipe-btn')){
        //checks if the clicked element has the class recipe-btn. 
        //If it does, the code proceeds to the next step.
        let mealItem = e.target.parentElement.parentElement;
        //gets the parent element of the clicked element 
        //which is the mealItem element containing the meal's data.
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
        //uses the data and display the recipe
    }
}


function mealRecipeModal(meal){
    //The function takes an argument meal which is an array of meal objects.
    console.log(meal);
    // logs the array of meal objects to the console for debugging purposes.
    meal = meal[0];
    //meal = meal[0]; sets the variable meal to the first element in the array
    //which is the selected meal object.
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    //html` which will store the HTML code for the recipe details.
    //Inside the string, there are placeholders like ${meal.strMeal} 
    //that will be replaced with the actual values from the meal object.
    mealDetailsContent.innerHTML = html;
    //After defining the html string, it sets the innerHTML of the mealDetailsContent 
    //element to the html string. This will replace the content of the mealDetailsContent 
    //element with the recipe details.
    mealDetailsContent.parentElement.classList.add('showRecipe');
    //Finally, it adds the 'showRecipe' class to the parent element of the mealDetailsContent element.
    // This is used to style the modal when it is displayed.
}