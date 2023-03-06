let disableProgrammingTools = false;
let numberOfVisibleImages;
let finishedFlag = false;
let supportedImageFormats = ["jpg","jpeg", "png"];

async function waitForXMs(ms){
    return new Promise(resolve => {
        setTimeout(() => {
          resolve('4 seconds');
        }, ms);
      })}

async function initPage(imageName="") {
    await loadMainHTML();
    await insertImagesInGallery(imageName);

    //TODO: Try to avoid this but the workaround works
    while(true) {
        if(finishedFlag) {
            break;
        }
        await waitForXMs(100);
    }
    
    initEventListeners();
    document.getElementById('links').click();
    document.querySelector(".play-pause").click();
    document.querySelector("body").style.overflow = "overlay";

    let imageSize = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--slider-image-size')); 
    numberOfVisibleImages = Math.min(4, document.getElementById("links").childElementCount);
    document.getElementById("links").style.width = (numberOfVisibleImages * imageSize) + 'px';
}

async function insertImagesInGallery(imageName, i=1, format=supportedImageFormats[0]){
    let route = "resources\\" + imageName + "\\" + imageName + "%." + format;
    return fetch(route.replace('%', i))
        .then((response) => {
            if(response.status == 200){
                document.getElementById("links").appendChild(getHtmlForGalleryImg("title", route.replace('%', i)));
                i++;
                insertImagesInGallery(imageName, i);
                } else if(supportedImageFormats.indexOf(format) !== supportedImageFormats.length-1) {
                    insertImagesInGallery(imageName, i, format=supportedImageFormats[supportedImageFormats.indexOf(format)+1]);
                } else {
                    finishedFlag = true;
                }})
        .catch(() => console.log("Images inserted"));
}

async function loadMainHTML() {
    return fetch("main.html")
    .then((result) => result.text())
    .then(function(htmlCode) {
        let header = htmlCode.split("content")[0];
        let footer = htmlCode.split("content")[1];
        document.getElementById("inserted-by-fetch").innerHTML = header;
        document.getElementById("footer-inserted-by-fetch").innerHTML = footer;

        const script = document.createElement('script');
        script.src ='https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v16.0';
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous";
        script.nonce = "tzXfLSxR";
    
        script.onload = () => {
            console.log('Script loaded successfuly');
        };
    
        document.body.appendChild(script);
    })
   .catch((error) => console.log(error)); 
}

function initEventListeners() {    
    document.getElementById('links').onclick = function (event) {
        event = event || window.event
        var target = event.target || event.srcElement
        var link = target.src ? target.parentNode : target
        var options = { 
            index: link, 
            event: event,
            closeOnEscape: false,
            toggleControlsOnSlideClick: false}
        var links = this.getElementsByTagName('a')
        blueimp.Gallery(links, options)
        document.querySelector("body").style.overflow = "overlay";
    }

    blueimp.Gallery(document.getElementById('links').getElementsByTagName('a'), {
        container: '#blueimp-gallery-carousel',
        carousel: true
      }); 
    
    window.onscroll = (event) => doOnScroll(event);
    if(disableProgrammingTools) {
        disableDeveloperTools();
    }

    document.getElementById("links").addEventListener('click', () => {
        debugger;
        if(document.getElementById("blueimp-gallery").classList.contains("blueimp-gallery-playing")) {
            document.querySelector(".play-pause").click();
        }
        document.querySelectorAll(".slide").forEach(s => s.onclick = () => convertToWholewindowGallery());
    });

    setGalleryPosition();
}

function setGalleryPosition() {
    let distance = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--distance-headertop-gallery'));   
    document.getElementById("blueimp-gallery").style.marginTop = (distance) + "px";
    document.getElementById("blueimp-gallery").style.position = "relative";

    for(let i = 0; i < document.querySelectorAll(".slide").length; i++) {
        let galleryWidth = getComputedStyle(document.documentElement)
        .getPropertyValue('--gallery-width');
        document.querySelectorAll(".slide")[i].style.left = (-(parseInt(galleryWidth.split('vw')[0]))*(i)) + "vw";
       }
}

function doOnScroll(e){
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
            alert("Copyright " + new Date().getFullYear + ": Sandra Steinmann");
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

function shift(toLeft){
  let imageSize = parseInt(getComputedStyle(document.documentElement)
  .getPropertyValue('--slider-image-size')); 
  let imageLinkArray = Array.from(document.querySelectorAll("#links a"));
  let numberOfImgVisibleOrPassed;
  let numberOfImgNotYetPassed;

  if(toLeft) {
     numberOfImgVisibleOrPassed = Math.abs(getTranslateX(imageLinkArray[0]) / imageSize) + numberOfVisibleImages;
     numberOfImgNotYetPassed = imageLinkArray.length - numberOfImgVisibleOrPassed;
  } else {
     numberOfImgNotYetPassed = Math.abs(getTranslateX(imageLinkArray[0]) / imageSize);
     numberOfImgVisibleOrPassed = imageLinkArray.length - numberOfImgNotYetPassed;
  }

  let shiftAmount = Math.min(numberOfVisibleImages, numberOfImgNotYetPassed) * imageSize;
  shiftAmount = !toLeft ? (-1) * shiftAmount : shiftAmount;

  if(shiftAmount === 0) {
    shiftAmount = (numberOfImgVisibleOrPassed-numberOfVisibleImages) * imageSize;
    shiftAmount = toLeft ? (-1) * shiftAmount : shiftAmount;
  }

  for(let el of imageLinkArray) {
    el.style.transform = "translate3d(" + (getTranslateX(el)-shiftAmount) + "px, 0, 0)"   
  }
}

function getTranslateX(myElement) {
  var style = window.getComputedStyle(myElement);
  var matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m41;
}

function convertToWholewindowGallery() { 
    document.querySelector(".play-pause").click();
    document.querySelector(".play-pause").click();
    document.getElementById("close").style.display = "block";
    let gallery = document.getElementById("blueimp-gallery");
    gallery.style.height = "100vh";
    gallery.style.top = "0";
    gallery.style.marginTop = "0";
    gallery.style.zIndex = "999";
    gallery.style.position = "fixed"; 
    document.body.style.overflow = "hidden";
}

function convertToWideGallery() {
    document.getElementById("close").style.display = "none";
    document.body.style.overflow = "overlay";
    let gallery = document.getElementById("blueimp-gallery");
    gallery.style.zIndex = "0";
    gallery.style.height = "calc(var(--gallery-width)/4)"; 
    setGalleryPosition();
}