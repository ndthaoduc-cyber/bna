// 1. Khai báo các biến toàn cục (Global)
let slideIndex = 1;
const firebaseConfig = {
    apiKey: "AIzaSyBW5pIwGuxrNu13fyGMM4whmQ24evO0CyM",
    authDomain: "lllllll-3452e.firebaseapp.com",
    projectId: "lllllll-3452e",
    storageBucket: "lllllll-3452e.firebasestorage.app",
    messagingSenderId: "550371574338",
    appId: "1:550371574338:web:e609197341f4696689e3db"
};

// 2. Sử dụng DOMContentLoaded để đảm bảo HTML đã tải xong
document.addEventListener("DOMContentLoaded", () => {
    
    // Kiểm tra xem Firebase đã được load chưa
    if (typeof firebase === 'undefined') {
        console.error("Firebase SDK chưa được tải. Hãy kiểm tra lại thẻ script trong file HTML.");
        return;
    }

    // Khởi tạo Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const auth = firebase.auth();

    // ================= ACCOUNT UI =================
    const accountArea = document.getElementById('accountArea');

    auth.onAuthStateChanged((user) => {
        if (accountArea) { // Kiểm tra xem phần tử có tồn tại không
            if (user) {
                accountArea.innerHTML = `
                    <span>Xin chào, ${user.email}</span>
                    <button onclick="logout()">Đăng xuất</button>
                `;
            } else {
                accountArea.innerHTML = `<a href="login.html">Đăng nhập</a>`;
            }
        }
    });

    // ================= LOAD PRODUCTS =================
    function loadProducts(){
        const container = document.getElementById("productContainer");
        if (!container) return;

        db.collection("light").doc("light").collection("denhoc").get()
          .then((snapshot)=>{
            container.innerHTML = "";
            snapshot.forEach((doc)=>{
                const p = doc.data();
                container.innerHTML += `
                    <div class="card">
                        <img src="${p.image || ''}" alt="">
                        <h3>${p.name || 'Chưa có tên'}</h3>
                        <p>${Number(p.price || 0).toLocaleString('vi-VN')} VNĐ</p>
                        <button class="buy-btn">Thêm vào giỏ</button>
                    </div>
                `;
            });
          })
          .catch((error) => console.error("Lỗi tải sản phẩm:", error));
    }

    // ================= BANNER LOGIC =================
    function showSlides(n) {
        let slides = document.getElementsByClassName("banner-slide");
        if (slides.length === 0) return;
        
        if(n > slides.length) { slideIndex = 1; }
        if(n < 1) { slideIndex = slides.length; }
        
        for(let i=0; i<slides.length; i++){
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "flex";
    }

    // Gán hàm vào window để gọi từ onclick trong HTML
    window.plusSlides = (n) => {
        showSlides(slideIndex += n);
    };

    // Khởi chạy các hàm chính
    loadProducts();
    showSlides(slideIndex);
    setInterval(() => {
        window.plusSlides(1);
    }, 4000);
});

// Hàm đăng xuất để ngoài để tránh lỗi phạm vi khi gọi từ nút bấm
window.logout = () => {
    firebase.auth().signOut().then(() => {
        window.location.reload(); 
    }).catch((error) => {
        console.error("Lỗi đăng xuất: ", error);
    });
};