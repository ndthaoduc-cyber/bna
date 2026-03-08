// ===== MUA NGAY =====
function buyNow(msgId){
    let msg = document.getElementById(msgId);
    msg.style.display = "block";

    setTimeout(function(){
        msg.style.display = "none";
    }, 1500);
}


// ===== THÊM VÀO GIỎ =====
function addToCart(name, price){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let found = cart.find(item => item.name === name);

    if(found){
        found.quantity += 1;
    } 
    else{
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
}


// ===== CẬP NHẬT GIỎ =====
function updateCartCount(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach(item=>{
        total += item.quantity;
    });

    document.getElementById("cartCount").innerText = total;
}


// ===== LOAD TRANG =====
updateCartCount();