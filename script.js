function showAlert(message){ alert(message); }

let cart = [];

function addProduct(name, price){
  cart.push({item:name, qty:1, price:price});
  showAlert(name + " added to cart!");
  renderCart();
}

function renderCart(){
  let cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";
  let total = 0;
  cart.forEach((c,index)=>{
    cartDiv.innerHTML += `<p>${c.qty} x ${c.item} - R${c.qty*c.price}
    <button onclick="removeItem(${index})">Remove</button></p>`;
    total += c.qty * c.price;
  });
  let discount = 0;
  if(total>500){ discount = total*0.10; }
  let finalTotal = total - discount;
  cartDiv.innerHTML += `<hr><b>Subtotal: R${total}</b><br>`;
  if(discount>0){ cartDiv.innerHTML += `<b>Discount: -R${discount}</b><br>`; }
  cartDiv.innerHTML += `<b>Total to Pay: R${finalTotal}</b><br>`;
  cartDiv.innerHTML += `<button onclick="checkout()">Checkout</button> 
                        <button onclick="clearCart()">Clear Cart</button>`;
}

function removeItem(index){ cart.splice(index,1); renderCart(); }
function clearCart(){ cart=[]; renderCart(); showAlert("Cart cleared!"); }
function checkout(){ if(cart.length===0){ showAlert("Cart is empty!"); return; } showAlert("Thank you for shopping at Washington Hardware! Your order has been placed."); cart=[]; renderCart(); }

// Contact form validation
function validateContactForm(event){
  event.preventDefault();
  let name=document.getElementById("name").value;
  let email=document.getElementById("email").value;
  let message=document.getElementById("message").value;
  if(name===""||email===""||message===""){ showAlert("All fields are required."); return false; }
  showAlert("Message sent successfully!"); return true;
}

// Geolocation
function locateUser(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
      showAlert("Your location: "+pos.coords.latitude+", "+pos.coords.longitude);
    });
  } else { showAlert("Geolocation not supported."); }
}

// Store hours
function showTodayHours(){
  let hours="8am - 6pm (Mon-Fri), 8am - 2pm (Sat), Closed Sunday";
  showAlert("Today's hours: "+hours);
}