function initIndexEventListeners() {
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

   document.getElementById('links').click();
   document.querySelector(".play-pause").click();
  
   for(let i = 0; i < document.querySelectorAll(".slide").length; i++) {
    let galleryWidth = getComputedStyle(document.documentElement)
    .getPropertyValue('--gallery-width');
    document.querySelectorAll(".slide")[i].style.left = (-(parseInt(galleryWidth.split('vw')[0]))*(i)) + "vw";
   }
}