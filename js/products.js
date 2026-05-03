const grid = document.getElementById("products-grid");
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");
const pageIndicator = document.getElementById("page-indicator");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const noResults = document.getElementById("no-results");

const PRODUCTS = [
  { id: "SmartWatch", cat: "Watches", price: 200, img: "../images/products/watch.png" },
  { id: "Phone Stand", cat: "Phone Accessories", price: 22, img: "../images/products/phone-stand.png" },
  
  { id: "iPhone 15", cat: "Phones", price: 999, img: "../images/products/iphone15.png" },
  { id: "Samsung Galaxy S24", cat: "Phones", price: 899, img: "../images/products/galaxy.png" },
  { id: "Phone Case", cat: "Phone Accessories", price: 15, img: "../images/products/phone-case.png" },
  { id: "Charging Cable", cat: "Phone Accessories", price: 12, img: "../images/products/charging-cable.png" },

  { id: "MacBook Pro", cat: "Laptops", price: 1999, img: "../images/products/macbook-pro.png" },
  { id: "Dell Laptop", cat: "Laptops", price: 1499, img: "../images/products/dell.png" },
  { id: "Laptop Stand", cat: "Laptops", price: 45, img: "../images/products/laptop-stand.png" },

  { id: "PS5 Controller", cat: "Controllers", price: 70, img: "../images/products/ps5-controller.png" },
  { id: "Xbox Controller", cat: "Controllers", price: 65, img: "../images/products/xbox-controller.png" },

  { id: "AirPods Pro", cat: "Earbuds", price: 249, img: "../images/products/airpods-pro.png" },

  { id: "GoPro", cat: "Cameras", price: 400, img: "../images/products/gopro.png" },
  { id: "Webcam", cat: "Cameras", price: 95, img: "../images/products/webcam.png" },

  { id: "Mechanical Keyboard", cat: "Computer Accessories", price: 130, img: "../images/products/keyboard.png" },
  { id: "Gaming Mouse", cat: "Computer Accessories", price: 60, img: "../images/products/mouse.png" },
  { id: "USB-C Hub", cat: "Computer Accessories", price: 55, img: "../images/products/usb-hub.png" },
  { id: "Curved Monitor", cat: "Computer Accessories", price: 350, img: "../images/products/monitor.png" },
];

const productsPerPage = 6;
let currentPage = 1;
if (gridBtn) gridBtn.disabled = 1;
let filteredData = [...PRODUCTS]; //filtered data variable to not manipulate the original list
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
window.PRODUCTS = PRODUCTS;
window.filteredData = filteredData;
window.render = render;
window.currentPage = currentPage;

function render() {
  filteredData = window.filteredData;
  currentPage = window.currentPage;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / productsPerPage), //making the total number of pages always fit the entire products list even if it changes
  );
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * productsPerPage; // start at the correct array index for the page
  const slice = filteredData.slice(start, start + productsPerPage); // store from the correct array index to the correct last array index for the page

  grid.innerHTML = ""; // removing any already rendered cards
  noResults.classList.toggle("hidden", filteredData.length > 0); // if filtered data is bigger than 0, hide the no results message

  slice.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = `${i * 100}ms`; // using the index * 100 so they dont all fade in at once
    card.innerHTML = `
      <div class="card-info">
        <div class="card-cat" class="addToWishlist">${p.cat}</div>
        <div class="card-img" class="addToWishlist"><img src="${p.img}"></div>
        <div class="card-name" class="addToWishlist">${p.id}</div>
        <div class="card-price" class="addToWishlist">$${p.price}</div>
        <button class="add-to-cart-btn" data-id="${p.id}">Add to Cart</button>
        <button class="wishlist-btn" class="addToWishlist" data-id="${p.id}">🤍</button>
      </div>`;
    const image = card.querySelector('.card-img');
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    const wishlistBtn = card.querySelector('.wishlist-btn');
    addToCartBtn.onclick = () =>{ // this should update the cart in the localstorage and add this product to it
      if (cart.some(item => item.id == p.id)){
        addToCartBtn.innerHTML = "Add to Cart";
        cart = cart.filter(item => item.id != p.id);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      else{
      cart.push(p);
      localStorage.setItem("cart", JSON.stringify(cart)); // save the new item in cart in the local storage
      addToCartBtn.innerHTML = `Remove from Cart`
      }
    };
    wishlistBtn.onclick = () =>{ // this updates the wishlist in the localstorage and add this product to it
      if (wishlist.some(item => item.id === p.id)) {
        wishlistBtn.innerHTML = `🤍`;
        wishlist = wishlist.filter(item => item.id !== p.id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
    else{
      wishlist.push(p);
      localStorage.setItem("wishlist", JSON.stringify(wishlist)); //save the new item in wishlist in the local storage
      wishlistBtn.innerHTML = `❤️`;
    }
    };

    if (cart.some(item => item.id === p.id)) {
      addToCartBtn.innerHTML = `Remove from Cart`;
      addToCartBtn.disabled = 0;
    }
    if (wishlist.some(item => item.id === p.id)) {
      wishlistBtn.innerHTML = `❤️`;
      wishlistBtn.disabled = 0;
    }
    image.onclick = () => {                                          
      window.location.href = `product-details.html?id=${p.id}`;
    };
    grid.appendChild(card); //add each card as a child to the grid
  });

  
  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1; //disable previous button if at page 1
  nextBtn.disabled = currentPage === totalPages; //disable next button if at the last page
}


function changePage(dir) {
  const totalPages = Math.ceil(filteredData.length / productsPerPage);
  window.currentPage = Math.min(Math.max(1, window.currentPage + dir), totalPages); // if dir = -1, go back a page, if dir = 1, go forwards a page
  render(); // calling the render function to update the changes to the cards and animate them
}


function toggleView(){
  if(event.target.id === "grid-btn"){
    grid.classList.add("view-grid");
    grid.classList.remove("view-list");
    gridBtn.disabled = 1;
    listBtn.disabled = 0;
    render();
  }
  else{
    grid.classList.add("view-list")
    grid.classList.remove("view-grid");
    listBtn.disabled = 1;
    gridBtn.disabled = 0;
    render();
  }
}
if (grid && gridBtn && listBtn && pageIndicator && prevBtn && nextBtn && noResults) {
  render();
}
