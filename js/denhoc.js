// ================== 1. FIREBASE CONFIG & INIT ==================
const firebaseConfig = {
    apiKey: "AIzaSyBW5pIwGuxrNu13fyGMM4whmQ24evO0CyM",
    authDomain: "lllllll-3452e.firebaseapp.com",
    projectId: "lllllll-3452e",
    storageBucket: "lllllll-3452e.firebasestorage.app",
    messagingSenderId: "550371574338",
    appId: "1:550371574338:web:e609197341f4696689e3db",
    measurementId: "G-FGB3ZB0DS4"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Khởi tạo biến giỏ hàng
let cart = [];


// ================== 2. LOAD SẢN PHẨM TỪ SUBCOLLECTION ==================

/**
 * Hàm lấy sản phẩm từ thư mục con và render ra giao diện
 * @param {string} subName - Tên subcollection trên Firebase (vd: "denhoc", "denngu")
 * @param {string} containerId - ID của thẻ div HTML chứa sản phẩm
 */
function loadProductsFromSubcollection(subName, containerId) {
    const container = document.getElementById(containerId);
    
    // Nếu không tìm thấy thẻ HTML, dừng hàm để tránh lỗi
    if (!container) {
        console.error(`Không tìm thấy thẻ div có ID là: #${containerId}`);
        return;
    }

    // Hiển thị trạng thái đang tải
    container.innerHTML = "<p>Đang tải dữ liệu...</p>";

    // Truy cập theo cấu trúc: Collection("light") -> Document("light") -> Subcollection(subName)
    db.collection("light")
      .doc("light")
      .collection(subName)
      .get()
      .then((querySnapshot) => {
          container.innerHTML = ""; // Xóa dòng "Đang tải dữ liệu..."

          // Kiểm tra xem thư mục có dữ liệu hay không
          if (querySnapshot.empty) {
              container.innerHTML = `<p>Chưa có sản phẩm nào trong mục này.</p>`;
              return;
          }

          // Duyệt qua từng sản phẩm lấy được từ Firebase
          querySnapshot.forEach((doc) => {
              const p = doc.data();

              // Chuẩn hóa dữ liệu (Nếu thiếu dữ liệu sẽ lấy giá trị mặc định)
              const productName = p.name || doc.id; // Lấy tên document (vd: denhoc1) nếu không có field name
              const oldPrice = Number(p.oldPrice) || 0;
              const price = Number(p.price) || 0;
              const imageUrl = p.image || 'https://via.placeholder.com/250'; // Ảnh mặc định nếu thiếu

              // Tạo thẻ div bọc sản phẩm
              const productDiv = document.createElement("div");
              productDiv.className = "product";

              // Đổ mã HTML vào thẻ
              productDiv.innerHTML = `
                  <img src="${imageUrl}" alt="${productName}">
                  <h3>${productName}</h3>

                  <p class="Old price">${oldPrice.toLocaleString()}đ</p>
                  <p class="price">${price.toLocaleString()}đ</p>

                  <button class="detail-btn">Xem chi tiết</button>
                  <button class="add-btn">Thêm vào giỏ</button>
              `;

              // ================== BẮT SỰ KIỆN NÚT BẤM ==================
              
              // 1. Nút Thêm vào giỏ hàng
              productDiv.querySelector(".add-btn").addEventListener("click", () => {
                  addToCart(productName, price);
              });

              // 2. Nút Xem chi tiết
              // Gửi kèm cả thư mục (sub) và mã sản phẩm (id) lên URL để trang detail biết đường tìm
              productDiv.querySelector(".detail-btn").addEventListener("click", () => {
                  window.location.href = `detail.html?sub=${subName}&id=${doc.id}`;
              });

              // Nhét thẻ sản phẩm vào trong container HTML
              container.appendChild(productDiv);
          });
      })
      .catch((error) => {
          console.error(`Lỗi khi tải dữ liệu từ ${subName}:`, error);
          container.innerHTML = "<p>Lỗi kết nối đến máy chủ. Vui lòng thử lại sau.</p>";
      });
}


// ================== 3. CHỨC NĂNG GIỎ HÀNG ==================

function addToCart(name, price) {
    // Lấy giỏ hàng từ LocalStorage (nếu có), không có thì tạo mảng rỗng
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Thêm sản phẩm mới vào mảng
    cart.push({ name, price });
    
    // Lưu ngược lại mảng lên LocalStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Cập nhật số lượng trên icon giỏ hàng
    updateCartCount();
    
    alert(`Đã thêm "${name}" vào giỏ hàng!`);
}

function updateCartCount() {
    const countEl = document.getElementById("cartCount");
    if (!countEl) return;
    
    // Đếm số lượng phần tử trong mảng cart
    countEl.textContent = cart.length;
}


// ================== 4. KHỞI CHẠY KHI TRANG TẢI XONG ==================

window.addEventListener("DOMContentLoaded", () => {
    // 1. Khôi phục giỏ hàng khi người dùng tải lại trang
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();

    // 2. Gọi hàm tải sản phẩm Đèn Học
    // "denhoc" là tên subcollection trên Firebase
    // "denHocContainer" là ID thẻ <div> trên HTML
    loadProductsFromSubcollection("denhoc", "denHocContainer"); 

    // 3. Gọi hàm tải sản phẩm Đèn Ngủ
    // "denngu" là tên subcollection trên Firebase
    // "denNguContainer" là ID thẻ <div> trên HTML
    loadProductsFromSubcollection("denngu", "denNguContainer"); 
});