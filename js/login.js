// ===== LOAD TRANG =====
window.onload = function(){
    clearAll();
};


// ===== XÓA INPUT + THÔNG BÁO =====
function clearAll(){

    document.querySelectorAll("input").forEach(i => i.value = "");

    loginMsg.innerText = "";
    registerMsg.innerText = "";

}


// ===== HIỂN THỊ FORM =====
function showRegister(){

    clearAll();

    loginBox.style.display = "none";
    registerBox.style.display = "block";

}

function showLogin(){

    clearAll();

    registerBox.style.display = "none";
    loginBox.style.display = "block";

}


// ===== ĐĂNG KÝ =====
function register(){

    var u = registerUsername.value.trim();
    var p = registerPassword.value.trim();

    if(u === "" || p === ""){

        registerMsg.className = "error";
        registerMsg.innerText = "Vui lòng nhập đầy đủ thông tin!";
        return;

    }

    if(localStorage.getItem("username") === u){

        registerMsg.className = "error";
        registerMsg.innerText = "Tài khoản đã tồn tại!";
        return;

    }

    localStorage.setItem("username", u);
    localStorage.setItem("password", p);

    registerMsg.className = "success";
    registerMsg.innerText = "Đăng ký thành công!";

    setTimeout(showLogin, 1000);

}


// ===== ĐĂNG NHẬP =====
function login(){

    var u = loginUsername.value.trim();
    var p = loginPassword.value.trim();

    var savedUser = localStorage.getItem("username");
    var savedPass = localStorage.getItem("password");

    if(u === "" || p === ""){

        loginMsg.className = "error";
        loginMsg.innerText = "Vui lòng nhập đầy đủ thông tin!";
        return;

    }

    if(u === savedUser && p === savedPass){

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", u);

        window.location.href = "index.html";

    }else{

        loginMsg.className = "error";
        loginMsg.innerText = "Sai tài khoản hoặc mật khẩu!";

    }

}