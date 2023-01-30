function loadMainHTML() {
   fetch("main-data/main.html")
    .then((result) => result.text())
    .then(function(htmlCode) {
        document.querySelector("#inserted-by-fetch").innerHTML = htmlCode;
        initEventListeners();
    }).catch((error) => console.log(error)); 
}

function initEventListeners() {
    document.addEventListener('click', function() {
        if(document.querySelector("nav").getAttribute("open")) {
            navSlideAnimation();
        }
    }); 
    document.getElementById("mobile-hamburger").addEventListener('click', (event) => navSlideAnimation(event)); 
}


function navSlideAnimation(e) {
    let nav = document.querySelector("nav");
    let hamburger = document.getElementById("mobile-hamburger");
    let body = document.querySelector("body");
    let pageContent = document.getElementById("page-content");

    nav.style.transition = "transform 1000ms";

    if(nav.getAttribute("open")) {
    body.style.animation = "1000ms bgTransCloseNav";
    pageContent.style.animation = "1000ms brightnessTransCloseNav";

    nav.style.transform = "translate3d(-150px, 0, 0)";
    nav.removeAttribute("open");
    hamburger.style.opacity = 1;
    } else {
    body.style.animation = "1000ms bgTransOpenNav";
    body.style.animationFillMode = "forwards";
    pageContent.style.animation = "1000ms brightnessTransOpenNav";
    pageContent.style.animationFillMode = "forwards";

    nav.style.transform = "translate3d(0, 0, 0)";
    nav.setAttribute("open", "true");
    hamburger.style.opacity = 0;
    }
    e.stopPropagation();
}