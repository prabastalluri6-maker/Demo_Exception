let cart = JSON.parse(localStorage.getItem("cart")) || [];

const itemsBox = document.getElementById("cart-items");
const totalBox = document.getElementById("cart-total");
const payBtn = document.getElementById("pay-now");

function renderCart() {
  itemsBox.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    itemsBox.innerHTML = "<p>Your cart is empty.</p>";
    totalBox.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="https://via.placeholder.com/70" alt="">
      <div class="cart-info">
        <h4>${item.name}</h4>
        <p>Size: ${item.size}</p>
        <p>₹${item.price} × ${item.qty}</p>
      </div>
      <button onclick="removeItem(${index})">✕</button>
    `;

    itemsBox.appendChild(div);
  });

  totalBox.textContent = total;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

payBtn.addEventListener("click", () => {
  if (!cart.length) {
    alert("Cart is empty");
    return;
  }
  window.location.href = "checkout.html";
});

renderCart();
