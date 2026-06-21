// ===== GIỎ HÀNG =====
function updateCartCount(){
let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cartCount").innerText = cart.length;
}

// ===== TÀI KHOẢN =====
function loadAccount(){
let user = localStorage.getItem("currentUser");
let accountArea = document.getElementById("accountArea");

if(user){
accountArea.innerHTML =
"Xin chào, " + user +
' <button onclick="logout()" style="margin-left:10px;">Đăng xuất</button>';
} else {
accountArea.innerHTML =
'<a href="login.html">Đăng nhập</a>';
}
}

// ===== ĐĂNG XUẤT =====
function logout(){
localStorage.removeItem("currentUser");
alert("Đã đăng xuất!");
location.reload();
}

// ===== ẨN ĐỀ XUẤT NẾU CHƯA ĐĂNG NHẬP =====
function checkSuggest(){
let user = localStorage.getItem("currentUser");
let suggest = document.getElementById("suggestBox");

if(!user){
suggest.style.display = "none";
}
}

// ===== CHAT BOT =====
function toggleChat(){
let box = document.getElementById("chatBox");
box.style.display = box.style.display === "flex" ? "none" : "flex";
}

function sendMessage(){
let input = document.getElementById("userMessage");
let message = input.value.trim();
if(message === "") return;

addMessage("Bạn", message);
input.value = "";

setTimeout(function(){
let reply = botReply(message.toLowerCase());
addMessage("Shop", reply);
}, 500);
}

function addMessage(sender, text){
let chatMessages = document.getElementById("chatMessages");
chatMessages.innerHTML += "<p><b>" + sender + ":</b> " + text + "</p>";
chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botReply(msg){

if(msg.includes("xin chào") || msg.includes("chào")){
return "Shop Bán Đèn xin chào! Bạn cần hỗ trợ gì?";
}

if(msg.includes("đèn ngủ")){
return "Bạn có thể xem đèn ngủ tại mục Đèn ngủ trên thanh menu nhé!";
}

if(msg.includes("đèn học")){
return "Đèn học chống cận hiện đang giảm giá 10%!";
}

if(msg.includes("giá")){
return "Giá sản phẩm từ 150.000đ đến 800.000đ tùy loại.";
}

if(msg.includes("giao hàng")){
return "Shop giao hàng toàn quốc, thời gian từ 2-5 ngày.";
}

if(msg.includes("cảm ơn")){
return "Rất vui được hỗ trợ bạn ❤️";
}

return "Xin lỗi, mình chưa hiểu câu hỏi. Bạn hỏi rõ hơn nhé!";
}

function formatPrice(value) {
	if (value === undefined || value === null || value === "") {
		return "Liên hệ";
	}

	const number = Number(value.toString().replace(/[^0-9.-]/g, ""));
	if (Number.isNaN(number)) {
		return value;
	}

	return number.toLocaleString("vi-VN") + "đ";
}

function loadProductsFromFirestore() {
	const productList = document.getElementById("productList");
	const loading = document.getElementById("productLoading");

	if (!productList) return;

	if (!window.firebase || !firebase.firestore) {
		if (loading) loading.remove();
		productList.innerHTML = '<div style="width:100%; text-align:center; color:#fff; padding:40px 0;">Firebase chưa được khởi tạo.</div>';
		return;
	}

	const db = firebase.firestore();
	db.collection("products")
	  .get()
	  .then((querySnapshot) => {
		  if (loading) loading.remove();

		  if (querySnapshot.empty) {
			  productList.innerHTML = '<div style="width:100%; text-align:center; color:#fff; padding:40px 0;">Chưa có sản phẩm nào.</div>';
			  return;
		  }

		  productList.innerHTML = "";

		  querySnapshot.forEach((doc) => {
			  const product = doc.data();
			  const card = document.createElement("div");
			  card.className = "product";
			  card.innerHTML = `
				  <img src="${product.image || 'https://via.placeholder.com/150'}" width="150">
				  <h3>${product.name || 'Sản phẩm'}</h3>
				  <p>${formatPrice(product.price)}</p>
				  <a href="${product.url || '#'}"><button>Xem sản phẩm</button></a>
			  `;
			  productList.appendChild(card);
		  });
	  })
	  .catch((error) => {
		  console.error("Lỗi khi tải sản phẩm:", error);
		  if (loading) loading.remove();
		  productList.innerHTML = '<div style="width:100%; text-align:center; color:#fff; padding:40px 0;">Không thể tải dữ liệu sản phẩm.</div>';
	  });
}

// LOAD TRANG
window.onload = function(){
updateCartCount();
loadAccount();
checkSuggest();
loadProductsFromFirestore();
}