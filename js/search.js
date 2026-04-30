const searchBar = document.getElementById("search-bar");


searchBar.addEventListener("input", function () {
  const q = this.value.toLowerCase().trim();
  filteredData = PRODUCTS.filter(
    //change filteredData to only include products matching the search
    (p) =>
      p.id.toLowerCase().includes(q)
  );
  currentPage = 1;
  render(); //calling the render function to update the changes to the cards
});