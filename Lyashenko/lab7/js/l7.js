$(document).ready(function(){

  var menuElem = document.getElementById('colors');
      var titleElem = menuElem.querySelector('.title');

      titleElem.onclick = function() {
        menuElem.classList.toggle('open');
      };

    $('#red').click(function(){
      $('#figure').css('border-color','red');
    });
    $('#black').click(function(){
      $('#figure').css('border-color','black');
    });
    $('#green').click(function(){
      $('#figure').css('border-color','green');
    });
    $('#blue').click(function(){
      $('#figure').css('border-color','blue');
    });

    $('#move').click(function(){
      if($('#up').prop('checked')){
        $('#figure').css('top','-=10');
      }
      if($('#down').prop('checked')){

        $('#figure').css('top','+=10');
      }
      if($('#right').prop('checked')){
        $('#figure').css('left','+=10');
      }
      if($('#left').prop('checked')){
        $('#figure').css('left','-=10');
      }
    });
});
