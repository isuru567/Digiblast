let slider = document.querySelector(".slider-div2");
let items = document.querySelectorAll(".slider-div3");
let next = document.getElementById("next");
let prev = document.getElementById("prev");

let active = 0;
let totalItems = items.length;
let autoSlide;

function reloadSlider() {
    const slideWidth = items[0].clientWidth;
    slider.style.transform = `translateX(-${active * slideWidth}px)`;
    slider.style.transition = "transform 1s ease-in-out";

    clearInterval(autoSlide);
    autoSlide = setInterval(() => next.click(), 4000);
}

next.onclick = function () {
    active = (active + 1) % totalItems;
    reloadSlider();
};

prev.onclick = function () {
    active = (active - 1 + totalItems) % totalItems;
    reloadSlider();
};

window.onresize = reloadSlider;

window.onload = () => reloadSlider();




// email sending part 

function send(e) {
    if (e) e.preventDefault();

    var btn = document.getElementById("send_btn");

    btn.disabled = true;
    var originalText = btn.innerText;
    btn.innerText = "Sending... Please wait";
    btn.classList.add("disable");

    var f = new FormData();
    f.append("first-name", document.getElementById("first-name").value);
    f.append("last-name", document.getElementById("last-name").value);
    f.append("phone", document.getElementById("phone").value);
    f.append("email", document.getElementById("email").value);
    f.append("message", document.getElementById("message").value);

    // alert("Form Data: \n" + 
    //     "first-name: " + document.getElementById("first-name").value + "\n "+
    //     "last-name: " + document.getElementById("last-name").value + "\n "+
    //     "email: " + document.getElementById("email").value + "\n "+
    //     "phone: " + document.getElementById("phone").value + "\n "+
    //     "subject: " + document.getElementById("subject").value + "\n "+
    //     "message: " + document.getElementById("message").value );


    var r = new XMLHttpRequest();
    r.onreadystatechange = function () {
        if (r.readyState == 4) {

            btn.disabled = false;
            btn.innerText = originalText;
            btn.classList.remove("disable");


            if (r.responseText == "Message Sent Successfully") {
                document.getElementById("first-name").value = "";
                document.getElementById("last-name").value = "";
                document.getElementById("phone").value = "";
                document.getElementById("email").value = "";
                document.getElementById("message").value = "";
                swal("Message Sent", "We'll get Back to you Soon ", "success");
            } else {
                swal("Try Again", r.responseText, "error");
            }

            document.getElementById("send_btn").disabled = false;
            document.getElementById("send_btn").classList.remove("disable");
        }
    }
    r.open("POST", "../mail/sendEmailProcess.php", true);
    r.send(f);
    document.getElementById("send_btn").disabled = true;
    document.getElementById("send_btn").classList.add("disable");

}


