// Define the API URL to fetch Maybelline products
const api = "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";

// Select the container where products will be displayed
const ProductsContainer = document.querySelector(".products-container");

// Clear the content of ProductsContainer
ProductsContainer.innerHTML = '';

// Function to fetch data from the API
async function fetchData() {
    try {
        // Fetch data from the API
        const response = await fetch(api);
        // Parse response to JSON format
        const data = await response.json();
        // Display the fetched data
        displayData(data);
    } catch (error) {
        // Handle errors if any occur during fetching or displaying data
        console.log("Please debug your code, this is the error:", error);
    }
}
fetchData(); // Fetch data from the API when the page loads

// Function to display the fetched data
function displayData(data) {
    data.forEach(product => {
        const productColors = product.product_colors.map(color => `
            <div class="color" style="background-color: ${color.hex_value};"></div>
            <span>${color.colour_name}</span>
        `).join('');

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
            <div class="colors">
                ${productColors}
            </div>
            <form id="add-to-cart-form-${product.id}">
                <label for="quantity-${product.id}">Enter quantity:</label>
                <input type="number" id="quantity-${product.id}" name="quantity" min="1" max="10">
                <button class="purchase-btn" type="submit">Add to Cart</button>
            </form>
            <p id="remaining-items-${product.id}">Remaining items in store: ${product.product_colors.length}</p>
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

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Event listener for toggling dark mode
document.addEventListener('DOMContentLoaded', function () {
    const darkModeButton = document.querySelector('#dark-mode-toggle');
    darkModeButton.addEventListener('click', toggleDarkMode);
});
