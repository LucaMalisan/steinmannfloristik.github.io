let pageId = "872459973854848";
let numberOfPosts = 0;

async function loadMainHTML() {
    return fetch("main.html")
    .then((result) => result.text())
    .then(function(htmlCode) {
        let header = htmlCode.split("content")[0];
        let footer = htmlCode.split("content")[1];
        document.getElementById("inserted-by-fetch").innerHTML = header;
        document.getElementById("footer-inserted-by-fetch").innerHTML = footer;

        const script = document.createElement('script');
        script.src ="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2";
        script.async = true;
        script.defer = true;
    
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

async function initPage() {
    let postIds = [];
    let accessToken = 'EAAHiYiM8ZAHcBAAiOjfn8kUdfaDTom1qbB3bf3pK929n6OKi1zgDCUH1Q0Hwzn6XealZCBAa6BsR6uma3JetWl3YHe9sONlZAA36UPZA9N6Hhs724az3IfXjiZBZBsUfayaxOZCLknKxfi03UwpBaXlowllyEmrI3CzbTJObMWex2NduZBOb3HCZAWeP8xhpiwIuKK4J0qZA9CNVVADJgee6Ui'
 
    await fetch('https://graph.facebook.com/' + pageId + '/posts', {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        },
      })
      .then(result => result.json())
      .then((json) => {
        numberOfPosts = json["data"].length;
        for(let el of json["data"]) {
            postIds.push(el["id"].split("_")[1]);
        }
        console.log(postIds);
      });

    await loadMainHTML();
    
    const script = document.createElement('script');
    script.src ='https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0';
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.nonce = "tzXfLSxR";

    script.onload = () => {
        console.log('Script loaded successfuly');
        for(let id of postIds) {
            document.getElementById('hidden-facebook-posts').appendChild(getIframeOfPostId(id));
        }
    };

    document.body.appendChild(script);
    await filterPosts();
}

function getIframeOfPostId(id) {
    let div = document.createElement("div");
    let htmlCode = 
    "<div class=\"fb-post\" data-href=\"https://www.facebook.com/" + pageId + "/posts/" + id + "/\" data-width=\"500\"></div>"
    div.classList.add("post-container");
    div.innerHTML = htmlCode

    return div.firstElementChild; 
}

async function filterPosts() {
    while(true) {
        await waitForXMs(100);
        debugger;
        if(document.querySelectorAll(querySelectorClassName("fb-post", "fb_iframe_widget")).length === numberOfPosts) {
            debugger
            for(let el of document.getElementById('hidden-facebook-posts').childNodes) {
                let className = querySelectorClassName.apply(null, el.className.split(" "))
                let iframe = document.querySelector(className + " > span > iframe");
                document.getElementById("facebook-post-container").appendChild(iframe);
            }
         break;
        }
    }
}

async function waitForXMs(ms){
    return new Promise(resolve => {
        setTimeout(() => {
          resolve('4 seconds');
        }, ms);
      })}

function querySelectorClassName(...classNames) {
    debugger
let result = "";

for(let name of classNames) {
    result = result + "." + name;
}
return result;
}