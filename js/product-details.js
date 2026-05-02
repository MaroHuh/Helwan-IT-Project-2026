const urlParams = new URLSearchParams(window.location.search);
const productIdFromURL = urlParams.get('id'); 

const product = PRODUCTS.find(p => p.id === productIdFromURL);

if (product) {
    document.getElementById('product-id').innerText = product.id;
    document.getElementById('product-img').src = product.img;
    document.getElementById('product-img').alt = product.id;
    document.getElementById('product-cat').innerText = product.cat;
    document.getElementById('product-price').innerText = `$${product.price}`;
} else {
    document.body.innerHTML = "<h1>Product Not Found</h1><a href='shop.html'>Back to Shop</a>";
}