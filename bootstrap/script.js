let users = {};
let cart = [];
let products = [
  { id: 1, name: "T-Shirt", price: 299, img: "https://via.placeholder.com/150" },
  { id: 2, name: "Shoes", price: 999, img: "https://via.placeholder.com/150" },
  { id: 3, name: "Watch", price: 499, img: "https://via.placeholder.com/150" }
];

function show(id) {
  document.querySelectorAll("section").forEach(s => s.classList.add("d-none"));
  document.getElementById(id).classList.remove("d-none");
  if (id === "catalog") loadProducts();
}

function register() {
  let u = newUser.value, p = newPass.value;
  if (u && p) {
    users[u] = p;
    alert("Registered! Now login.");
    show("login");
  } else alert("Enter details");
}

function login() {
  let u = user.value, p = pass.value;
  if (users[u] === p) {
    alert("Welcome " + u);
    show("catalog");
  } else alert("Invalid login");
}

function loadProducts() {
  let list = document.getElementById("products");
  list.innerHTML = "";
  products.forEach(p => {
    list.innerHTML += `
      <div class="col-md-4">
        <div class="card shadow-sm">
          <img src="${p.img}" class="card-img-top">
          <div class="card-body text-center">
            <h5>${p.name}</h5>
            <p>₹${p.price}</p>
            <button class="btn btn-sm btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
          </div>
        </div>
      </div>`;
  });
}

function addToCart(id) {
  cart.push(products.find(p => p.id === id));
  document.getElementById("count").textContent = cart.length;
}

function showCart() {
  show("cart");
  let total = 0, out = "";
  cart.forEach(p => {
    out += `<div class="list-group-item d-flex justify-content-between">${p.name}<span>₹${p.price}</span></div>`;
    total += p.price;
  });
  items.innerHTML = out || "<div class='text-center'>Cart is empty</div>";
  totalEl(total);
}

function totalEl(t) {
  total.textContent = "Total: ₹" + t;
}
