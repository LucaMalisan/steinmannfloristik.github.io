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

        window.onscroll = () => {
            if (document.querySelector("#logo-and-contact").getBoundingClientRect().bottom <= 0) {
                document.querySelector("nav").style.position = "fixed";
                document.querySelector("nav").style.width = "100%";
            } else {
                document.querySelector("nav").style.position = "unset";
            }
        }
    })
   .catch((error) => console.log(error)); 
}