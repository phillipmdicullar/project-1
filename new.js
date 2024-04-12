// Define the API URL for fetching makeup products from the Maybelline brand
const api = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";

// Select the container where products will be displayed
const ProductsContainer = document.querySelector(".products-container");
ProductsContainer.innerHTML = '';

// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch(api);
        const data = await response.json();
        displayData(data); // Display the fetched data
    } catch (error) {
        console.log("Please debug your code, this is the error:", error);
    }
}
fetchData(); // Fetch data from the API when the page loads

// Function to display the fetched data
function displayData(data) {
    data.forEach(product => {
        const content = `
        <div class="product">
            <div class="product-image">
                <img src="${product.image_link}" alt="">
            </div>
            <h1 class="product-name">${product.name}</h1>  
            <div class="product-price">
                <p><strong>Price:</strong> ${product.price}</p>
            </div> 
            <div class="category">
                <p><strong>Category:</strong> ${product.category}</p>
            </div>
            <div class="type">
                <p><strong>Type:</strong> ${product.product_type}</p>
            </div>
            <form id="add-to-cart-form">
                <label for="quantity">Enter quantity:</label>
                <input type="number" id="quantity" name="quantity" min="1" max="10">
                <button class="purchase-btn" type="submit">Add to Cart</button>
            </form>
            <p>Remaining items in store: <span id="remaining-items">10</span></p>
        </div>`;
        ProductsContainer.insertAdjacentHTML('beforeend', content);
    });
}

// Event listener for clicking on product name
ProductsContainer.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('product-name')) {
        console.log(`Clicked on product name: ${target.textContent}`);
    }
});

// Event listener for hovering over product image
ProductsContainer.addEventListener('mouseover', function (event) {
    const target = event.target;
    if (target.classList.contains('product-image')) {
        console.log(`Mouseover product image: ${target.nextElementSibling.textContent}`);
    }
});

// Event listener for double-clicking on product category
ProductsContainer.addEventListener('dblclick', function (event) {
    const target = event.target;
    if (target.classList.contains('category')) {
        console.log(`Double clicked on product category: ${target.textContent}`);
    }
});

// Event listener for clicking on add to cart button    
ProductsContainer.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('add-to-cart')) {
        alert(`You clicked on purchase for ${target.previousElementSibling.textContent}`);
    }
});

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Event listener for toggling dark mode
document.addEventListener('DOMContentLoaded', function () {
    const darkModeButton = document.querySelector('#dark-mode-toggle');
    darkModeButton.addEventListener('click', toggleDarkMode);
});

// Function to increase text size
function increaseTextSize() {
    const currentSize = parseInt(window.getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = (currentSize + 2) + 'px';
}

// Function to decrease text size
function decreaseTextSize() {
    const currentSize = parseInt(window.getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = (currentSize - 2) + 'px';
}

// Event listener for increasing text size
document.addEventListener('DOMContentLoaded', function () {
    const increaseTextButton = document.querySelector('#increase-text');
    increaseTextButton.addEventListener('click', increaseTextSize);
});

// Event listener for decreasing text size
document.addEventListener('DOMContentLoaded', function () {
    const decreaseTextButton = document.querySelector('#decrease-text');
    decreaseTextButton.addEventListener('click', decreaseTextSize);
});

// Function to handle adding items to cart
ProductsContainer.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('add-to-cart')) {
        const product = {
            name: target.parentElement.querySelector('.product-name').textContent,
            price: parseFloat(target.parentElement.querySelector('.product-price p').textContent.replace('Price:', '').replace('$', '')),
        };
        cart.push(product); // Add product to cart
        updateCartUI(); // Update cart UI
    }
});

// Function to update the UI to display items in the cart and calculate total price
