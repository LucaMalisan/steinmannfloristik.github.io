function initTrauerfloristikEventListeners() {
    document.getElementById('links').onclick = function (event) {
      debugger;
     // if(event.target.classList.contains("clickable")) {
        event = event || window.event
        var target = event.target || event.srcElement
        var link = target.src ? target.parentNode : target
        var options = { index: link, event: event }
        var links = this.getElementsByTagName('a')
        blueimp.Gallery(links, options)
    //  }
    }

      blueimp.Gallery(document.getElementById('links').getElementsByTagName('a'), {
        container: '#blueimp-gallery-carousel',
        carousel: true
      }); 

    let imageList = document.getElementById("links").style.width = (4 * 179) + 'px';
}

// TODO make image length (179px) generic

function shiftToLeft() {
  debugger;
  let imageLinkArray = Array.from(document.querySelectorAll("#links a"));
  for(let el of imageLinkArray) {
    el.style.transform = "translate3d(" + (Math.max(getTranslateX(el)-(4*179), (-179*(imageLinkArray.length-2)))) + "px, 0, 0)"   
  }
}

function getTranslateX(myElement) {
  var style = window.getComputedStyle(myElement);
  var matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m41;
}

