let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart = cart.map(p => ({ ...p, quantity: p.quantity || 1 }));

const items = document.getElementById("items");

function updateTotals() {
    let subtotal = 0;
    cart.forEach(p => {
        subtotal += p.price * p.quantity;
    });
    const shipping = 20;
    document.querySelector(".subtotal_checkout").textContent = "$" + subtotal;
    document.querySelector(".total_checkout").textContent = "$" + (subtotal + shipping);
}

function renderCart() {
    items.querySelectorAll(".item-cart").forEach(el => el.remove());

    cart.forEach((p, i) => {
        const itemCart = document.createElement("div");
        itemCart.className = "item-cart";
        itemCart.innerHTML = `
            <div class="image_name">
                <img src="${p.img}" width="80"/>
                <div class="content">
                    <h4>${p.id}</h4>
                    <p class="price_cart">$${p.price}</p>
                    <div class="quantity_control">
                        <button class="decrease_quantity" data-index="${i}">-</button>
                        <span class="quantity">${p.quantity}</span>
                        <button class="increase_quantity" data-index="${i}">+</button>
                    </div>
                </div>
            </div>
            <button class="delete_item" data-index="${i}">delete</button>
        `;
        items.insertBefore(itemCart, items.querySelector(".bottom_summary"));
    });

    updateTotals();
}

items.addEventListener("click", function(e) {
    const i = e.target.dataset.index;

    if (e.target.classList.contains("increase_quantity")) {
        cart[i].quantity += 1;
    }

    if (e.target.classList.contains("decrease_quantity")) {
        if (cart[i].quantity > 1) {
            cart[i].quantity -= 1;
        } else {
            cart.splice(i, 1);
        }
    }

    if (e.target.classList.contains("delete_item")) {
        cart.splice(i, 1);
    }

  
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
});

renderCart();

document.querySelector(".myform").addEventListener("submit", function(e) {
  e.preventDefault();
  let inputs = document.querySelectorAll(".input_info input");
  let formStatus = document.getElementById("form-status");
  let isValid = true;

  inputs.forEach((input) => {
    let warning = input.nextElementSibling; 

    if (input.value.trim() === "") {
      warning.classList.remove("hidden");
      warning.style.color = "red";
      input.style.border = "2px solid red";
      isValid = false;
    } else {
      warning.classList.add("hidden");
      input.style.border = "1px solid #ccc";
    }
  });

  if (isValid) {
    if(cart.length === 0){
        formStatus.classList.remove("hidden");
        formStatus.innerHTML = `Cart is empty`;
        formStatus.style.color = "red";
    }
    else{
    formStatus.classList.remove("hidden");
    formStatus.innerHTML = `Success!`;
    formStatus.style.color = "green";
    cart = [];
    document.querySelector(".myform").reset();
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    }
  }

});