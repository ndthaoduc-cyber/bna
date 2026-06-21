// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBW5pIwGuxrNu13fyGMM4whmQ24evO0CyM",
    authDomain: "lllllll-3452e.firebaseapp.com",
    projectId: "lllllll-3452e",
    storageBucket: "lllllll-3452e.firebasestorage.app",
    messagingSenderId: "550371574338",
    appId: "1:550371574338:web:e609197341f4696689e3db"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// lấy id từ URL
const id = new URLSearchParams(window.location.search).get("id");

const detail = document.getElementById("detail");

if (!id) {
    detail.innerHTML = "<p>Không tìm thấy sản phẩm</p>";
} else {
    db.collection("light").doc(id).get()
    .then(doc => {

        if (!doc.exists) {
            detail.innerHTML = "<p>Sản phẩm không tồn tại</p>";
            return;
        }

        const p = doc.data();

        detail.className = "container";

        detail.innerHTML = `
            <div class="img-box">
                <img src="${p.image}" alt="">
            </div>

            <div class="info">
                <h2>${p.name || "Sản phẩm"}</h2>

                <p class="price">${Number(p.price).toLocaleString()}đ</p>
                <p class="old-price">${Number(p.oldPrice).toLocaleString()}đ</p>

                <p>${p.description || "Chưa có mô tả sản phẩm."}</p>

                <button class="buy">Mua ngay</button>
                <button class="cart">Thêm vào giỏ</button>
            </div>
        `;
    })
    .catch(err => {
        console.error(err);
        detail.innerHTML = "<p>Lỗi tải dữ liệu</p>";
    });
}

// thêm giỏ hàng
function addToCart(name, price){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({name, price});
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ!");
}