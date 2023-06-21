

//setCookie("a",10, 1000)
function setCookie(nume, val, timpExpirare){//timpExpirare in milisecunde
    d=new Date();
    d.setTime(d.getTime()+timpExpirare)
    document.cookie=`${nume}=${val}; expires=${d.toUTCString()}`;
}

function getCookie(nume){
    vectorParametri=document.cookie.split(";") // ["a=10","b=ceva"]
    for(let param of vectorParametri){
        if (param.trim().startsWith(nume+"="))//scapa de caracterele blank
            return param.split("=")[1]//ne intereseaza valoarea
    }
    return null;
}
var lastPage = getCookie("last_page");

function deleteCookie(nume){
    console.log(`${nume}; expires=${(new Date()).toUTCString()}`)
    document.cookie=`${nume}=0; expires=${(new Date()).toUTCString()}`;
}

function deleteAllCookies() {
    vectorParametri = document.cookie.split(";")
    for (let param of vectorParametri) {
        deleteCookie(param.split("=")[0])
    }
}
////banner setare cookie last_page
function setLastPageCookie() {
    var currentPage = window.location.href;
    setCookie("last_page", currentPage, 86400000); // Cookie expiră după 24 de ore
  }
  
  function getLastPageCookie() {
    return getCookie("last_page");
  }
  setLastPageCookie();

window.addEventListener("DOMContentLoaded", function(){
    if (getCookie("acceptat_banner")){
        document.getElementById("banner").style.display="none";
    }

    this.document.getElementById("ok_cookies").onclick=function(){
        setCookie("acceptat_banner",true,12*60*60000);///dupa jum de zi
        document.getElementById("banner").style.display="none"
    }
})

if (lastPage) {
    console.log("Ultima pagină accesată:", lastPage);
  }
