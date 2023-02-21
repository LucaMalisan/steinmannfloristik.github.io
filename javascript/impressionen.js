let numberOfVisibleImages = 4;

function initImpressionenEventListeners() {
  let imageSize = parseInt(getComputedStyle(document.documentElement)
  .getPropertyValue('--slider-image-size')); 
    document.getElementById('links').onclick = function (event) {
        event = event || window.event
        var target = event.target || event.srcElement
        var link = target.src ? target.parentNode : target
        var options = { index: link, event: event }
        var links = this.getElementsByTagName('a')
        blueimp.Gallery(links, options)
    }

      blueimp.Gallery(document.getElementById('links').getElementsByTagName('a'), {
        container: '#blueimp-gallery-carousel',
        carousel: true
      }); 

    let imageList = document.getElementById("links").style.width = (numberOfVisibleImages * imageSize) + 'px';
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

