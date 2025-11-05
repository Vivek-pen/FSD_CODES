let users = {};
let cart = [];
let products = [
  {id:1, name:'T-Shirt', price:299},
  {id:2, name:'Shoes', price:999}
];

// ---------- Page Switching ----------
function show(id){
  document.querySelectorAll('section').forEach(s=>s.classList.add('hide'));
  document.getElementById(id).classList.remove('hide');
  if(id==='catalog') loadProducts();
}

// ---------- Registration Validation ----------
function register(){
  let u=newUser.value.trim(), p=newPass.value.trim();
  let msg=document.getElementById("regMsg");
  msg.textContent="";

  if(u==="" || p===""){
    msg.textContent="All fields are required!";
    return;
  }
  if(p.length < 4){
    msg.textContent="Password must be at least 4 characters.";
    return;
  }
  if(users[u]){
    msg.textContent="Username already exists!";
    return;
  }

  users[u]=p;
  alert("Registered! Now login.");
  newUser.value=""; newPass.value="";
  show("login");
}

// ---------- Login Validation ----------
function login(){
  let u=user.value.trim(), p=pass.value.trim();
  let msg=document.getElementById("logMsg");
  msg.textContent="";

  if(u==="" || p===""){
    msg.textContent="Please enter username and password!";
    return;
  }
  if(users[u]!==p){
    msg.textContent="Invalid credentials!";
    return;
  }

  alert("Welcome "+u);
  user.value=""; pass.value="";
  show("catalog");
}

// ---------- Catalog ----------
function loadProducts(){
  let area = document.getElementById('products');
  area.innerHTML='';
  products.forEach(p=>{
    area.innerHTML += `<div class='item'><h3>${p.name}</h3><p>₹${p.price}</p>
      <button onclick='addToCart(${p.id})'>Add</button></div>`;
  });
}

// ---------- Add to Cart with Basic Validation ----------
function addToCart(id){
  if(cart.length >= 5){
    alert("You can add only up to 5 items!");
    return;
  }
  cart.push(products.find(p=>p.id===id));
  document.getElementById('count').textContent = cart.length;
}

// ---------- Show Cart ----------
function showCart(){
  show('cart');
  let area = document.getElementById('items');
  let total = 0;
  area.innerHTML = '';
  cart.forEach(p=>{
    area.innerHTML += `<div class='cart-row'><span>${p.name}</span><span>₹${p.price}</span></div>`;
    total += p.price;
  });
  document.getElementById('total').textContent = cart.length ? 'Total: ₹'+total : 'Cart is empty';
}
