let disableProgrammingTools = false;

async function initPage(imageName, slider=false) {
    const response1 = await insertImagesInGallery(imageName);
    const response2 = await loadMainHTML();
    initEventListeners(slider);
    if(!slider) {
        document.getElementById('links').click();
        document.querySelector(".play-pause").click();
    }
    document.querySelector("body").style.overflow = "overlay";

    for(let el of document.querySelector(".slides").childNodes){
        el.firstElementChild.style.objectFit = "cover";
    }
}

async function insertImagesInGallery(imageName, i=1){
    let route = "resources\\" + imageName + "\\" + imageName + "%.jpg"
    return fetch(route.replace('%', i))
        .then((response) => {
            if(response.status == 200){
                document.getElementById("links").appendChild(getHtmlForGalleryImg("title", route.replace('%', i)));
                i++;
                insertImagesInGallery(imageName, i);
                }})
        .catch(() => console.log("Images inserted"));
        }

async function loadMainHTML() {
    return fetch("main.html")
    .then((result) => result.text())
    .then(function(htmlCode) {
        document.querySelector("#inserted-by-fetch").innerHTML = htmlCode;
    })
   .catch((error) => console.log(error)); 
}

function initEventListeners(slider) {    
    document.getElementById('links').onclick = function (event) {
        event = event || window.event
        var target = event.target || event.srcElement
        var link = target.src ? target.parentNode : target
        var options = { 
            index: link, 
            event: event,
            closeOnEscape: false}
        var links = this.getElementsByTagName('a')
        blueimp.Gallery(links, options)
    }

    blueimp.Gallery(document.getElementById('links').getElementsByTagName('a'), {
        container: '#blueimp-gallery-carousel',
        carousel: true
      }); 
    
    window.onscroll = (event) => doOnScroll(event);
    if(disableProgrammingTools) {
        disableDeveloperTools();
    }
    setGalleryPosition(slider);
}

function setGalleryPosition(slider) {
    let pos = document.querySelector("header").getBoundingClientRect().top;
    let distanceProp = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--distance-headertop-gallery'));   
    debugger;
    let distance = slider ? distanceProp/2 : distanceProp;
    document.getElementById("blueimp-gallery").style.marginTop = (pos + distance) + "px";
    document.getElementById("blueimp-gallery").style.position = "sticky";

    for(let i = 0; i < document.querySelectorAll(".slide").length; i++) {
        let galleryWidth = getComputedStyle(document.documentElement)
        .getPropertyValue('--gallery-width');
        document.querySelectorAll(".slide")[i].style.left = (-(parseInt(galleryWidth.split('vw')[0]))*(i)) + "vw";
       }
}

function doOnScroll(e){
    if(document.querySelector("nav") !== null) {
        let pos = document.querySelector("header").getBoundingClientRect().top;
        let distance = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--distance-headertop-gallery'));  
        document.getElementById("blueimp-gallery").style.top = (pos + distance) + "px";
    }
   if (document.querySelector("#logo-and-contact").getBoundingClientRect().bottom <= 0) {
       document.querySelector("nav").style.position = "fixed";
       document.querySelector("nav").style.width = "100%";
   } else {
       document.querySelector("nav").style.position = "unset";
   }
   e.stopPropagation();
}

function disableDeveloperTools() {
    document.addEventListener('keydown', (e) => {
        if(e.key === 'F12') {
            e.preventDefault();
        } 
    });

    document.addEventListener('mousedown', (e) => {
         if(e.button == '2') {
            alert("Copyright 2023: Sandra Steinmann");
            e.preventDefault();
        } 
    });
}

function getHtmlForGalleryImg(title, src){
    let div = document.createElement("div");
    div.innerHTML = 
    "<a href=\""+src+"\" title=\""+title+"\">"
  + "<img src=\""+src+"\" alt=\""+title+"\" />"
  + "</a>";
  return div.firstElementChild;
}
