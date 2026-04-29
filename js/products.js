const grid = document.getElementById("products-grid");
const gridBtn = document.getElementById("grid-toggle");
const listBtn = document.getElementById("list-toggle");
const root = document.documentElement;
const searchBar = document.getElementById("search-bar");
const pageIndicator = document.getElementById("page-indicator");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const noResults = document.getElementById("no-results");

const PRODUCTS = [
  { id: "Blue Hoodie",      cat: "Clothing",       price: 100,  img: "../images/hoodie-blue.png" },
  { id: "Black T-Shirt",    cat: "Clothing",       price: 30,   img: "../images/tshirt-black.png" },
  { id: "Denim Jacket",     cat: "Clothing",       price: 150,  img: "../images/jacket-denim.png" },
  { id: "Cargo Shorts",     cat: "Clothing",       price: 50,   img: "../images/shorts-cargo.png" },

  { id: "Running Shoes",    cat: "Footwear",       price: 120,  img: "../images/shoes-running.png" },
  { id: "White Sneakers",   cat: "Footwear",       price: 90,   img: "../images/sneakers-white.png" },
  { id: "Black Boots",      cat: "Footwear",       price: 180,  img: "../images/boots-black.png" },
  { id: "Sandals",          cat: "Footwear",       price: 40,   img: "../images/sandals.png" },

  { id: "Baseball Cap",     cat: "Accessories",    price: 25,   img: "../images/cap-baseball.png" },
  { id: "Sunglasses",       cat: "Accessories",    price: 45,   img: "../images/sunglasses.png" },
  { id: "Black Backpack",  cat: "Accessories",    price: 75,   img: "../images/backpack-black.png" },
  { id: "Watch",            cat: "Accessories",    price: 200,  img: "../images/watch.png" },

  { id: "Wireless Earbuds", cat: "Electronics",    price: 80,   img: "../images/earbuds.png" },
  { id: "Phone Stand",      cat: "Electronics",    price: 22,   img: "../images/phone-stand.png" },
  { id: "Webcam",           cat: "Electronics",    price: 95,   img: "../images/webcam.png" },

  { id: "Notebook",         cat: "Stationery",     price: 8,    img: "../images/notebook.png" },
];

const productsPerPage = 6;
let currentPage = 1;
let filteredData = [...PRODUCTS]; //filtered data variable to not manipulate the original list

function render() {
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
        <div class="card-cat">${p.cat}</div>
        <div class="card-img"><img src="${p.img}"></div>
        <div class="card-name">${p.id}</div>
        <div class="card-price">$${p.price}</div>
      </div>`;
      grid.appendChild(card); //add each card as a child to the grid
  });

  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1; //disable previous button if at page 1
  nextBtn.disabled = currentPage === totalPages; //disable next button if at the last page
}

function changePage(dir) {
  const totalPages = Math.ceil(filteredData.length / productsPerPage);
  currentPage = Math.min(Math.max(1, currentPage + dir), totalPages); // if dir = -1, go back a page, if dir = 1, go forwards a page
  render(); // calling the render function to update the changes to the cards and animate them
}

searchBar.addEventListener("input", function () {
  const q = this.value.toLowerCase().trim();
  filteredData = PRODUCTS.filter(
    //change filteredData to only include products matching the search
    (p) =>
      p.id.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q),
  );
  currentPage = 1;
  render(); //calling the render function to update the changes to the cards
});

function gridToggle() {
  grid.classList.add("view-grid");
  grid.classList.remove("view-list");
  gridBtn.disabled = 1;
  listBtn.disabled = 0;
  render();
}
function listToggle() {
  grid.classList.add("view-list");
  grid.classList.remove("view-grid");
  listBtn.disabled = 1;
  gridBtn.disabled = 0;
  render();
}
render();