function initTrauerfloristikEventListeners() {
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

    let imageList = document.getElementById("links").style.width = (4 * 179) + 'px';
}

 // TODO make image length (179px) generic
// TODO make number of visible images generic

function shift(toLeft){
  let imageLinkArray = Array.from(document.querySelectorAll("#links a"));
  let numberOfImgVisibleOrPassed;
  let numberOfImgNotYetPassed;

  if(toLeft) {
     numberOfImgVisibleOrPassed = Math.abs(getTranslateX(imageLinkArray[0]) / 179) + 4;
     numberOfImgNotYetPassed = imageLinkArray.length - numberOfImgVisibleOrPassed;
  } else {
     numberOfImgNotYetPassed = Math.abs(getTranslateX(imageLinkArray[0]) / 179);
     numberOfImgVisibleOrPassed = imageLinkArray.length - numberOfImgNotYetPassed;
  }

  let shiftAmount = Math.min(4, numberOfImgNotYetPassed) * 179;
  shiftAmount = !toLeft ? (-1) * shiftAmount : shiftAmount;

  if(shiftAmount === 0) {
    shiftAmount = (numberOfImgVisibleOrPassed-4) * 179;
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

