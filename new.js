const api = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
const ProductsContainer = document.querySelector(".products-container");
console.log(ProductsContainer);
ProductsContainer.innerHTML = '';

// Event listener for clicking on product name

// Event listener for clicking on purchase button
ProductsContainer.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('purchase-btn')) {
        alert(`You clicked on purchase for ${target.previousElementSibling.textContent}`);
    }
});

// Event listener for clicking on add to cart button    

//cool spinning loading functionality


//we use asynch function to 
async function fetchData() {
    try {

        const response = await fetch(api);
        const data = await response.json();
        //display data
        console.log(data);
        displayData(data);
    } catch (error) {
        console.log("pls debug your code this is the error", error);
    }
}
fetchData();

function displayData(data) {
    data.forEach(product => {
        //this is our display functionality
        const content = `~
        <div id="loading"></div>
        <div class="product">
        <div class="product-image">
           <img src=${product.image_link} alt="" srcset="">
        </div>
        <h1 class="product-name">${product.name}</h1>  
         <div class="product-price">
           <p><strong>Price:</strong>${product.price}</p>
       </div> 
       <div class="category">
       <p><strong>Category:</strong>${product.category} </p>
   </div>
   <div class="type">
       <p><strong>Product type:</strong>${product.product_type}</p>
   </div>
   <button class="purchase-btn">purchase</button>
   <button class="add-to-cart">Add to cart</button>
   
        
        `;
        //add the details before the end of the container
        ProductsContainer.insertAdjacentHTML('beforeend', content);
    });
}
