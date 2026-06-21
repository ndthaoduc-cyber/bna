// Firebase configuration and initialization are centralized in js/firebase.js
// Ensure index.html includes the namespaced SDK scripts and then js/firebase.js
// ===== 2. CHUYỂN ĐỔI FORM =====
function toggleForm(formType) {

    const loginBox = document.getElementById('loginBox');
    const registerBox = document.getElementById('registerBox');

    const loginMsg = document.getElementById('loginMsg');
    const registerMsg = document.getElementById('registerMsg');

    // Xóa thông báo cũ
    if (loginMsg) loginMsg.innerText = "";
    if (registerMsg) registerMsg.innerText = "";

    if (formType === 'register') {

        if (loginBox) loginBox.style.display = "none";
        if (registerBox) registerBox.style.display = "block";

    } else {

        if (loginBox) loginBox.style.display = "block";
        if (registerBox) registerBox.style.display = "none";

    }
}

function showLogin() {
    toggleForm('login');
}

function showRegister() {
    toggleForm('register');
}


// ===== 3. ĐĂNG KÝ =====
function register() {

    const email = document.getElementById("registerEmail")?.value;
    const password = document.getElementById("registerPassword")?.value;

    const msg = document.getElementById("registerMsg");

    if (msg) msg.innerText = "";

    // Kiểm tra dữ liệu
    if (!email || !password) {

        if (msg) {
            msg.innerText = "Vui lòng nhập đầy đủ thông tin!";
        }

        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)

    .then(() => {

        alert("Đăng ký thành công!");

        clearAll();

        // Quay về form đăng nhập
        toggleForm('login');

    })

    .catch((error) => {

        if (!msg) {
            alert(error.message);
            return;
        }

        // Dịch lỗi sang tiếng Việt
        if (error.code === "auth/email-already-in-use") {

            msg.innerText = "Email đã được sử dụng!";

        } else if (error.code === "auth/weak-password") {

            msg.innerText = "Mật khẩu phải từ 6 ký tự!";

        } else if (error.code === "auth/invalid-email") {

            msg.innerText = "Email không hợp lệ!";

        } else {

            msg.innerText = error.message;

        }

    });

}


// ===== 4. ĐĂNG NHẬP =====
function login() {

    const email = document.getElementById("loginEmail")?.value;
    const pass = document.getElementById("loginPassword")?.value;

    const msg = document.getElementById("loginMsg");

    if (msg) msg.innerText = "";

    // Kiểm tra dữ liệu
    if (!email || !pass) {

        if (msg) {
            msg.innerText = "Vui lòng nhập đầy đủ!";
        }

        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, pass)

    .then(() => {

        alert("Đăng nhập thành công!");

        clearAll();

        // Chuyển sang trang index
        window.location.href = "index.html";

    })

    .catch((error) => {

        if (!msg) {
            alert(error.message);
            return;
        }

        if (error.code === "auth/user-not-found") {

            msg.innerText = "Không tìm thấy tài khoản!";

        } else if (error.code === "auth/wrong-password") {

            msg.innerText = "Sai mật khẩu!";

        } else if (error.code === "auth/invalid-email") {

            msg.innerText = "Email không hợp lệ!";

        } else {

            msg.innerText = error.message;

        }

    });

}


// ===== 5. ĐĂNG XUẤT =====
function logout() {

    firebase.auth().signOut()

    .then(() => {

        alert("Đã đăng xuất!");

        // Quay về login
        window.location.href = "login.html";

    });

}


// ===== 6. THEO DÕI ĐĂNG NHẬP =====
firebase.auth().onAuthStateChanged((user) => {

    const statusBox = document.getElementById("userStatus");

    const loginBox = document.getElementById("loginBox");
    const registerBox = document.getElementById("registerBox");

    if (!statusBox) return;

    if (user) {

        statusBox.innerHTML = `
            <div style="
                background:white;
                padding:15px;
                border-radius:10px;
                display:inline-block;
                box-shadow:0 4px 12px rgba(0,0,0,0.1);
            ">
                <span style="color:#333;">
                    Xin chào:
                    <b>${user.email}</b>
                </span>

                <br>

                <button
                    onclick="logout()"
                    style="
                        background:#e74c3c;
                        color:white;
                        border:none;
                        padding:6px 12px;
                        border-radius:5px;
                        margin-top:10px;
                        cursor:pointer;
                    "
                >
                    Đăng xuất
                </button>
            </div>
        `;

        if (loginBox) loginBox.style.display = "none";
        if (registerBox) registerBox.style.display = "none";

    } else {

        statusBox.innerHTML = "";

        showLogin();

    }

});


// ===== 7. XÓA INPUT =====
function clearAll() {

    document.querySelectorAll("input").forEach(input => {

        input.value = "";

    });

}