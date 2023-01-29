function initEventListeners() {
    document.addEventListener('click', function() {
        if(document.querySelector("aside").getAttribute("open")) {
            asideSlideAnimation();
        }
    }); 
    document.getElementById("mobile-hamburger").addEventListener('click', (event) => asideSlideAnimation(event));
}

function asideSlideAnimation(e) {
    let aside = document.querySelector("aside");
    let hamburger = document.getElementById("mobile-hamburger");
    let body = document.querySelector("body");
    let pageContent = document.getElementById("page-content");

    aside.style.transition = "transform 1000ms";

    if(aside.getAttribute("open")) {
    body.style.animation = "1000ms bgTransCloseAside";
    pageContent.style.animation = "1000ms brightnessTransCloseAside";

    aside.style.transform = "translate3d(-150px, 0, 0)";
    aside.removeAttribute("open");
    hamburger.style.opacity = 1;
    } else {
    body.style.animation = "1000ms bgTransOpenAside";
    body.style.animationFillMode = "forwards";
    pageContent.style.animation = "1000ms brightnessTransOpenAside";
    pageContent.style.animationFillMode = "forwards";

    aside.style.transform = "translate3d(0, 0, 0)";
    aside.setAttribute("open", "true");
    hamburger.style.opacity = 0;
    }
    e.stopPropagation();
}