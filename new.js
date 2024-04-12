const api = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
const ProductsContainer = document.querySelector(".products-container");
ProductsContainer.innerHTML = '';

async function fetchData() {
    try {
        const response = await fetch(api);
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.log("Please debug your code, this is the error:", error);
    }
}
fetchData();

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
           
        </div>
       `;
        ProductsContainer.insertAdjacentHTML('beforeend', content);
    });
}
// Function to calculate and update the number of items in the cart

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
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Event listener for toggling dark mode
document.addEventListener('DOMContentLoaded', function() {
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
document.addEventListener('DOMContentLoaded', function() {
    const increaseTextButton = document.querySelector('#increase-text');
    increaseTextButton.addEventListener('click', increaseTextSize);
});

// Event listener for decreasing text size
document.addEventListener('DOMContentLoaded', function() {
    const decreaseTextButton = document.querySelector('#decrease-text');
    decreaseTextButton.addEventListener('click', decreaseTextSize);
});
ProductsContainer.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('add-to-cart')) {
        const product = {
            name: target.parentElement.querySelector('.product-name').textContent,
            price: parseFloat(target.parentElement.querySelector('.product-price p').textContent.replace('Price:', '').replace('$', '')),
        };
        cart.push(product);
        updateCartUI();
    }
});

// Function to update the UI to display items in the cart and calculate total price
function updateCartUI() {
    const cartContainer = document.querySelector('.products-container');
    cartContainer.innerHTML = ''; // Clear previous content
    
    let totalPrice = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name}</p>
            <p>$${item.price.toFixed(2)}</p>
        `;
        cartContainer.appendChild(itemElement);
        totalPrice += item.price;
    });

    // Display total price
    const totalPriceElement = document.createElement('div');
    totalPriceElement.classList.add('total-price');
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    cartContainer.appendChild(totalPriceElement);
}