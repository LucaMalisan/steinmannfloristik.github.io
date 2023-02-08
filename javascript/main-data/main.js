function loadMainHTML() {
   fetch("main.html")
    .then((result) => result.text())
    .then(function(htmlCode) {
        document.querySelector("#inserted-by-fetch").innerHTML = htmlCode;
        initEventListeners();
    })
   .catch((error) => console.log(error)); 
}

function initEventListeners() {    
       window.onscroll = function(e){
            if(document.querySelector("nav") !== null) {
                let pos = document.querySelector("header").getBoundingClientRect().bottom;
                document.getElementById("blueimp-gallery").style.top = (pos + 150) + "px";
            }
           if (document.querySelector("#logo-and-contact").getBoundingClientRect().bottom <= 0) {
               document.querySelector("nav").style.position = "fixed";
               document.querySelector("nav").style.width = "100%";
           } else {
               document.querySelector("nav").style.position = "unset";
               document.querySelector("nav").style.width = "unset";
           }
           e.stopPropagation();
        }   

        document.addEventListener('keydown', (e) => {
            console.log(e.key);
           /* if(e.key === 'ESC') {
                e.stopPropagation();
            }
            if(e.key === 'F12') {
                e.preventDefault();
            } */
        });

        document.addEventListener('mousedown', (e) => {
            /* if(e.button == '2') {
                e.preventDefault
            } */
        })

        setGalleryPosition();
}

function setGalleryPosition() {
    let pos = document.querySelector("header").getBoundingClientRect().bottom;
    document.getElementById("blueimp-gallery").style.top = (pos + 150) + "px";
    document.querySelector("body").style.overflow = "unset";
    document.getElementById("blueimp-gallery").style.position = "sticky";
}