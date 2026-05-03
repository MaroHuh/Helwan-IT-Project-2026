
document.addEventListener("DOMContentLoaded", () => {
    renderWishlist();
    setupEventListeners();
});

function renderWishlist() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const wishlistGrid = document.getElementById("Wishlist-grid");
    const emptyState = document.getElementById("Empty-state");
    const authView = document.getElementById("Auth-guest-view");
    const countElement = document.getElementById("Wishlist-count");

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
        authView.classList.remove("Hidden");
        wishlistGrid.classList.add("Hidden");
        emptyState.classList.add("Hidden");
        return;
    }

    if (wishlist.length === 0) {
        emptyState.classList.remove("Hidden");
        wishlistGrid.classList.add("Hidden");
        authView.classList.add("Hidden");
        countElement.innerText = "0 Items";
    } 

    else {
        emptyState.classList.add("Hidden");
        authView.classList.add("Hidden");
        wishlistGrid.classList.remove("Hidden");
        
        countElement.innerText = `${wishlist.length} Items`;
     
        wishlistGrid.innerHTML = wishlist.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>${product.price} EGP</p>
                <button class="btn-remove" onclick="removeFromWishlist(${product.id})">Remove</button>
            </div>
        `).join("");
    }
}


function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    renderWishlist(); 
}


function setupEventListeners() {
    const clearBtn = document.getElementById("clear-wishlist");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to clear your wishlist?")) {
                localStorage.setItem("wishlist", JSON.stringify([]));
                renderWishlist();
            }
        });
    }
}
