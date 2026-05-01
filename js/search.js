let currentSearchTerm = ""; 
let currentCategory = "all";


const searchInput = document.getElementById("search-bar");

function applyFilters() {
    window.filteredData = window.PRODUCTS.filter((product) => {
        
        const matchesSearch = product.id.toLowerCase().includes(currentSearchTerm.toLowerCase());
        const matchesCategory = currentCategory === "all" || product.cat.toLowerCase() === currentCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    });
    window.currentPage = 1;

    window.render();
}

if (searchInput) {
    searchInput.addEventListener("input", (event) => {
        currentSearchTerm = event.target.value;
        
        applyFilters();
    });
}
function changeCategory(categoryName){
  document.querySelectorAll("#category-list ul li").forEach(li => {
    li.classList.remove("active");
  });
  event.target.classList.add("active");

  currentCategory = categoryName;
  applyFilters();
};

window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryFromUrl = urlParams.get("search");

    if (queryFromUrl) {
        searchInput.value = queryFromUrl;
        currentSearchTerm = queryFromUrl;
        applyFilters();
    }
});