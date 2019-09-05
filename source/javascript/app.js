// window.addEventListener("resize", hunterMobile)
document.addEventListener("DOMContentLoaded", function(){
  var burguer = document.querySelector('.burguer');
  var lineEar = document.querySelector('.linesE');
  var body_velo = document.getElementById('header');

  function btnBurguer() {
    burguer.classList.toggle('transform');
    lineEar.classList.toggle('linesBurguer');
    body_velo.classList.toggle('velo');
    // $('velo').fadeToggle();
  }
  burguer.addEventListener('click', function(){
    btnBurguer();
  });
})
// var animacionboton = function(animacionboton){
//   if (burguer.classList.contains('transform')){
//     alert('tiene');
//   };
// }


