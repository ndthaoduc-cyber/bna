// ================== 1. FIREBASE CONFIG & INIT ==================
// ================== 1. FIREBASE CONFIG ==================
const firebaseConfig = {
    apiKey: "AIzaSyBW5pIwGuxrNu13fyGMM4whmQ24evO0CyM",
    authDomain: "lllllll-3452e.firebaseapp.com",
    projectId: "lllllll-3452e",
    storageBucket: "lllllll-3452e.firebasestorage.app",
    messagingSenderId: "550371574338",
    appId: "1:550371574338:web:e609197341f4696689e3db",
    measurementId: "G-FGB3ZB0DS4"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let cart = [];

// ================== 2. HÀM LOAD SẢN PHẨM ==================
/**
 * @param {string} collectionName - Tên Collection trên Firebase (vd: "denhoc")
 * @param {string} containerId - ID của thẻ HTML hiển thị sản phẩm
 */
function loadProducts(collectionName, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "<p>Đang tải dữ liệu...</p>";

    // Truy vấn trực tiếp vào collection vì cấu trúc bạn không có subcollection
    db.collection(collectionName).get()
        .then((querySnapshot) => {
            container.innerHTML = ""; 

            if (querySnapshot.empty) {
                container.innerHTML = `<p>Chưa có sản phẩm nào trong mục này.</p>`;
                return;
            }

            querySnapshot.forEach((doc) => {
                const p = doc.data();
                const productName = p.name || doc.id;
                const oldPrice = Number(p.oldPrice) || 0;
                const price = Number(p.price) || 0;
                const imageUrl = p.image || 'https://via.placeholder.com/250';

                const productDiv = document.createElement("div");
                productDiv.className = "product";

                productDiv.innerHTML = `
                    <img src="${imageUrl}" alt="${productName}" style="width:100px;">
                    <h3>${productName}</h3>
                    <p class="old-price"><s>${oldPrice.toLocaleString()}đ</s></p>
                    <p class="price">${price.toLocaleString()}đ</p>
                    <button class="add-btn">Thêm vào giỏ</button>
                `;

                productDiv.querySelector(".add-btn").addEventListener("click", () => {
                    addToCart(productName, price);
                });

                container.appendChild(productDiv);
            });
        })
        .catch((error) => {
            console.error("Lỗi tải dữ liệu:", error);
            container.innerHTML = "<p>Lỗi kết nối database.</p>";
        });
}

// ================== 3. GIỎ HÀNG ==================
function addToCart(name, price) {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Đã thêm "${name}" vào giỏ hàng!`);
    updateCartCount();
}

function updateCartCount() {
    const countEl = document.getElementById("cartCount");
    if (countEl) countEl.textContent = JSON.parse(localStorage.getItem("cart") || "[]").length;
}

// ================== 4. KHỞI CHẠY ==================
window.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    
    // Gọi tải dữ liệu cho từng mục
    loadProducts("denhoc", "denHocContainer");
    loadProducts("dentrangtri", "denTrangTriContainer");
    loadProducts("denngu", "denNguContainer");
});