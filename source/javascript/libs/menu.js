/********* Menu Responsive ***********/
var menuGeneral = function(){
  var nav = "";
  var holdMobile = document.getElementById("hold-mobile");
  var header = document.getElementById("header");
  this.menuVertical = function(btnBurguer, idLienzo){
    btnBurguer.addEventListener("click",function(){
      var altoBody = document.querySelector('body').scrollHeight;
      nav = document.getElementById('nav')
      this.firstElementChild.classList.toggle("animate");
      if (idLienzo.style.transform === "") {
        idLienzo.style.overflow = "inherit";
        idLienzo.style.transform = "translateX(-" +nav.clientWidth+ "px)";  
        nav.style.height = altoBody + "px";
        header.style.transform = "translateX(-" +nav.clientWidth+ "px)";
        holdMobile.style.visibility = "visible";
        holdMobile.style.opacity = 1;
      }else{
        idLienzo.style.overflow = null;
        idLienzo.style.transform = null;
        holdMobile.style.visibility = null;
        holdMobile.style.opacity = null;
        header.style.transform = null;  
        setTimeout(function(){
          nav.style.height = null;
        }, 500);
      }
    });
    holdMobile.addEventListener("click",function(){
      btnBurguer.click();
    });
    // Event Touch
    var elHammer = new Hammer(holdMobile); 
    if(btnBurguer.offsetLeft > 0){
      elHammer.on("swiperight", function(ev) {
        btnBurguer.click();
      });
    }
    //Resize
    window.onresize = function() {
      setTimeout(function(){
        w = window.innerWidth;
        if (w >= 768 && idLienzo.style.right !== "") {
          idLienzo.style.right = null;
          holdMobile.style = null;
          btnBurguer.firstElementChild.classList.remove("animate");
          nav.style = null;
        }
      }, 10);
    };
  }
  
  // PAra Menu horizontal
  this.menuHorizontal = function(btnBurguer){
    btnBurguer.addEventListener("click",function(){
     this.firstElementChild.classList.toggle("animate");
     nav = this.nextElementSibling;
     var altoNav = nav.firstElementChild.scrollHeight + 10;
     if (nav.style.height === "") {
       nav.style.height = altoNav + "px";
       holdMobile.style.display = "block";
     }else{
       nav.style = null;
     }
    });
    holdMobile.addEventListener("click",function(){
      btnBurguer.click();
    });
    //Resize
    window.onresize = function() {
      setTimeout(function(){
        w = window.innerWidth;
        if (w >= 768 && nav.style !== "") {
            holdMobile.style.display = null;
            btnBurguer.firstElementChild.classList.remove("animate");
            nav.style = null;
          }
      }, 10);
    };
  }
}

module.exports = menuGeneral;
