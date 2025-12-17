document.addEventListener("DOMContentLoaded", () => {

  /* ---------- SLIDER ---------- */
  const slides = document.querySelectorAll(".slide");
  const dotsBox = document.querySelector(".hero-dots");
  let index = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.onclick = () => move(i);
    dotsBox.appendChild(dot);
  });

  const dots = dotsBox.querySelectorAll("span");

  function move(i) {
    slides[index].classList.remove("active");
    dots[index].classList.remove("active");
    index = i;
    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  setInterval(() => move((index + 1) % slides.length), 4000);

  /* ---------- CART ---------- */
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  document.querySelectorAll(".product-card").forEach(card => {
    let size = null;

    card.querySelectorAll(".sizes button").forEach(btn => {
      btn.onclick = () => {
        card.querySelectorAll(".sizes button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        size = btn.dataset.size;
      };
    });

    card.querySelector(".add-to-cart").onclick = () => {
      if (!size) return alert("Select size");

      const item = {
        id: card.dataset.id,
        name: card.dataset.name,
        price: +card.dataset.price,
        size,
        qty: 1
      };

      const found = cart.find(p => p.id === item.id && p.size === size);
      found ? found.qty++ : cart.push(item);

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart");
    };
  });
});
