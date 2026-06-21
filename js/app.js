// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBW5pIwGuxrNu13fyGMM4whmQ24evO0CyM",
    authDomain: "lllllll-3452e.firebaseapp.com",
    projectId: "lllllll-3452e",
    storageBucket: "lllllll-3452e.firebasestorage.app",
    messagingSenderId: "550371574338",
    appId: "1:550371574338:web:e609197341f4696689e3db",
    measurementId: "G-FGB3ZB0DS4"
};

// Khởi tạo
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Logic Đăng nhập/Đăng xuất
firebase.auth().onAuthStateChanged((user) => {
    const accountArea = document.getElementById("accountArea");
    if (!accountArea) return;

    if (user) {
        const username = user.email ? user.email.split("@")[0] : "Người dùng";
        accountArea.innerHTML = `
            <span style="color:white; margin-right: 10px;">Xin chào, <b>${username}</b></span>
            <button id="logoutBtn" style="cursor:pointer;">Đăng xuất</button>
        `;
        document.getElementById("logoutBtn").addEventListener("click", () => {
            firebase.auth().signOut().then(() => window.location.reload());
        });
    } else {
        accountArea.innerHTML = `<a href="login.html">Đăng nhập</a>`;
    }
});

// Logic Giỏ hàng
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCountElement = document.getElementById("cartCount");
if (cartCountElement) {
    cartCountElement.textContent = cart.length;
}