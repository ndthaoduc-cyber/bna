// ================= FIREBASE =================
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

// ================= LOAD PRODUCTS =================
function loadProducts() {

    const container = document.getElementById("productContainer");

    if (!container) {
        console.error("Không tìm thấy productContainer");
        return;
    }

    db.collection("light3")
        .get()
        .then((querySnapshot) => {

            container.innerHTML = "";

            if (querySnapshot.empty) {
                container.innerHTML = "<h2>Không có sản phẩm nào</h2>";
                return;
            }

            querySnapshot.forEach((doc) => {

                const p = doc.data();

                const productName =
                    p.dentrangthi001 ||
                    p.dentrangthi002 ||
                    p.dentrangthi003 ||
                    "Sản phẩm";

                const oldPrice = Number(
                    String(p["Old Price"] || "0")
                        .replace(/[^\d]/g, "")
                );

                const newPrice = Number(
                    String(p["New Price"] || "0")
                        .replace(/[^\d]/g, "")
                );

                const productHTML = `
                    <div class="product">

                        <img src="${p.image || ''}" 
                             alt="${productName}">

                        <h3>${productName}</h3>

                        <p class="old-price">
                            ${oldPrice.toLocaleString()}đ
                        </p>

                        <p class="price">
                            ${newPrice.toLocaleString()}đ
                        </p>

                        <button class="detail-btn"
                            onclick="viewDetail('${doc.id}')">
                            Xem chi tiết
                        </button>

                        <button class="add-btn"
                            onclick="addToCart(
                                '${productName}',
                                ${newPrice}
                            )">
                            Thêm vào giỏ
                        </button>

                    </div>
                `;

                container.innerHTML += productHTML;
            });

            console.log("Tải sản phẩm thành công!");
        })
        .catch((error) => {

            console.error("Firestore Error:", error);

            container.innerHTML = `
                <h2 style="color:red">
                    Không thể tải dữ liệu Firestore
                </h2>
            `;
        });
}

// ================= CHI TIẾT =================
function viewDetail(id) {
    window.location.href = `detail.html?id=${id}`;
}

// ================= GIỎ HÀNG =================
function addToCart(name, price) {

    cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    cart.push({
        name,
        price
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert("Đã thêm vào giỏ hàng!");
}

// ================= ĐẾM GIỎ =================
function updateCartCount() {

    const countEl =
        document.getElementById("cartCount");

    if (!countEl) return;

    cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    countEl.textContent = cart.length;
}

// ================= KHỞI ĐỘNG =================
window.addEventListener(
    "DOMContentLoaded",
    () => {

        cart = JSON.parse(
            localStorage.getItem("cart")
        ) || [];

        updateCartCount();

        loadProducts();
    }
);