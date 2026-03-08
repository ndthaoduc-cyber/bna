/* ===== GIỎ HÀNG ===== */
function addToCart(name, price){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({name:name, price:price});
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
    updateCartCount();
}

function updateCartCount(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = document.getElementById("cartCount");
    if(count) count.innerText = cart.length;
}

document.addEventListener("DOMContentLoaded", updateCartCount);


/* ===== CHATBOT ===== */
function sendMessage(){
    let input = document.getElementById("chatInput").value;
    let box = document.getElementById("chatbox");

    let reply = "Xin lỗi tôi chưa hiểu.";

    if(input.toLowerCase().includes("đèn ngủ")){
        reply = "Chúng tôi có nhiều đèn ngủ từ 120.000đ.";
    }
    else if(input.toLowerCase().includes("đèn học")){
        reply = "Đèn học chống cận rất tốt cho mắt.";
    }
    else if(input.toLowerCase().includes("giá")){
        reply = "Giá sản phẩm từ 120.000đ đến 300.000đ.";
    }

    box.innerHTML += "<p><b>Bạn:</b> " + input + "</p>";
    box.innerHTML += "<p><b>Bot:</b> " + reply + "</p>";
}


/* ===== THỜI TIẾT API ===== */
function loadWeather(){
    if(!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(function(position){
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY&units=metric`)
        .then(res => res.json())
        .then(data => {
            let weather = document.getElementById("weather");
            if(weather){
                weather.innerText =
                "🌤 " + data.name + ": " + data.main.temp + "°C";
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", loadWeather);
