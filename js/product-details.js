const urlParams = new URLSearchParams(window.location.search);
const productIdFromURL = urlParams.get('id'); 

const product = products.find(p => p.id === productIdFromURL);

if (product) {
    document.getElementById('product-id').innerText = product.id;
    document.getElementById('product-img').src = product.img;
    document.getElementById('product-img').alt = product.id;
    document.getElementById('product-cat').innerText = product.cat;
    document.getElementById('product-price').innerText = `$${product.price}`;
} else {
    document.body.innerHTML = "<h1>Product Not Found</h1><a href='shop.html'>Back to Shop</a>";
}

const cartBtn = document.querySelector('.add-to-cart-btn');

cartBtn.onclick = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const messageArea = document.getElementById('message-area');
    
    if (product) {
        const isExist = cart.some(item => item.id === product.id);
        
        if (!isExist) {
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            messageArea.innerText = "Product added to cart successfully!";
        } else {
            messageArea.innerText = "Product is already in your cart.";
        }
    }
};