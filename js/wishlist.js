
document.addEventListener("DOMContentLoaded", () => {
    renderWishlist();
    setupEventListeners();
    displayRecommendations(); 

    
function renderWishlist() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const wishlistGrid = document.getElementById("Wishlist-grid");
    const emptyState = document.getElementById("Empty-state");
    const authView = document.getElementById("Auth-guest-view");
    const countElement = document.getElementById("Wishlist-count");

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
        if (authView) authView.classList.remove("Hidden");
        if (wishlistGrid) wishlistGrid.classList.add("Hidden");
        if (emptyState) emptyState.classList.add("Hidden");
        return;
    }

    
    if (wishlist.length === 0) {
        if (emptyState) emptyState.classList.remove("Hidden");
        if (wishlistGrid) wishlistGrid.classList.add("Hidden");
        if (authView) authView.classList.add("Hidden");
        if (countElement) countElement.innerText = "0 Items";
    } 
    else {
        if (emptyState) emptyState.classList.add("Hidden");
        if (authView) authView.classList.add("Hidden");
        if (wishlistGrid) {
            wishlistGrid.classList.remove("Hidden");
            countElement.innerText = `${wishlist.length} Items`;
            
            wishlistGrid.innerHTML = wishlist.map(product => `
                <div class="product-card">
                    <img src="${product.img}" alt="${product.id}">
                    <h4>Item ${product.id}</h4>
                    <p>${product.price} EGP</p>
                    <button class="btn-remove" onclick="removeFromWishlist(${product.id})">Remove</button>
                </div>
            `).join("");   
        }
    }
}


function displayRecommendations() {
    const recGrid = document.getElementById("Recommendations-grid");
    
    if (typeof products !== 'undefined' && products.length > 0) {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);

        recGrid.innerHTML = selected.map(item => `
            <div class="product-card">
                <div class="product-img">
                    <img src="${item.img}" alt="${item.id}">
                </div>
                <div class="product-info">
                    <h4>Item ${item.id}</h4>
                    <p class="price">${item.price} EGP</p>
                    <button class="Btn-primary" onclick="addToWishlistFromRec(${item.id})">Add to Wishlist</button>
                </div>
            </div>
        `).join("");
    } else {
        if (recGrid) recGrid.innerHTML = "<p>Discover our latest products in the shop</p>";
    }
}

function addToWishlistFromRec(id) {
    if (typeof products === 'undefined') return;
    const itemToAdd = products.find(p => p.id === id);
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    
    if (!wishlist.find(p => p.id === id)) {
        wishlist.push(itemToAdd);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        renderWishlist(); 
        updateWishlistBadge(); 
        alert("Added to your wishlist");
    } else {
        alert("Item already in wishlist");
    }
}

 
function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    renderWishlist(); 
    if (typeof updateWishlistBadge === 'function') updateWishlistBadge();
}


function setupEventListeners() {
    const clearBtn = document.getElementById("clear-wishlist");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to clear your wishlist?")) {
                localStorage.setItem("wishlist", JSON.stringify([]));
                renderWishlist();
                if (typeof updateWishlistBadge === 'function') updateWishlistBadge();
            }
        });
    }
}
