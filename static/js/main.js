new WOW().init();

$(document).ready(function() {






    $(".scroll_all").on('click', function () {
        var elementClick = $(this).attr("href");
        console.log(elementClick);
        var destination = $(elementClick).offset().top;
        $('html, body').animate({ scrollTop: destination }, 600);
        return false;
    });
     






$.extend($.lazyLoadXT, {
  edgeY:  200,
  srcAttr: 'data-src'
});

 
 
    
    if (window.location.pathname == '/about/') {
         
        $('#about__link').addClass('about__link').removeClass('hvr-underline-from-center');
     }
   
     if (window.location.pathname == '/blog/') {
        $('#blog__link').addClass('blog__link').removeClass('hvr-underline-from-center');
     }
   
     if (window.location.pathname == '/contacts/') {
        $('#contact__link').addClass('contact__link').removeClass('hvr-underline-from-center');
     }






    var scene = document.getElementById('scene');


    if (scene != null) {

        var parallaxInstance = new Parallax(scene);
    }




  
    if (window.location.pathname.split('/')[1] == '' && localStorage.team_swipe == 1) {

      function linkTime() {
                 
                 var destination = $('#main__title-team').offset().top;
                 $('html, body').animate({ scrollTop: destination }, 600);
                 return false;
             }
             setTimeout(linkTime, 500);
             localStorage.team_swipe = 0;
       
    }

console.log(window.location.pathname);
    $('#team__link').on("click", function() {

      
       if (window.location.pathname.split('/')[1] == "") {
                 
              function linkTime_2() {
                  var destination = $('#main__title-team').offset().top;
                  $('html, body').animate({ scrollTop: destination }, 600);
                  return false;
              }
              setTimeout(linkTime_2, 500);

              } else {
                  localStorage.team_swipe = 1;
                  window.location.pathname = "/";


              }


    });
    
     $('.team__footer').on("click", function() {

       
       if (window.location.pathname.split('/')[1] == "") {
                       
                    function linkTime_2() {
                        var destination = $('#main__title-team').offset().top;
                        $('html, body').animate({ scrollTop: destination }, 600);
                        return false;
                    }
                    setTimeout(linkTime_2, 500);

                    } else {
                        localStorage.team_swipe = 1;
                        window.location.pathname = "/";


                    }

    });

   


    
        if (window.location.pathname == '/' && localStorage.practise_swipe == 1) {

           function linkTime() {
                          
                          var destination = $('#main__title-practise').offset().top;
                          $('html, body').animate({ scrollTop: destination }, 600);
                          return false;
                      }
                      setTimeout(linkTime, 500);
                      localStorage.team_swipe = 0;

           
        }


        $('#practise__link').on("click", function() {

          if (window.location.pathname.split('/')[1] == "") {
                    
                 function linkTime_2() {
                     var destination = $('#main__title-practise').offset().top;
                     $('html, body').animate({ scrollTop: destination }, 600);
                     return false;
                 }
                 linkTime_2();

                 } else {
                     localStorage.team_swipe = 1;
                     window.location.pathname = "/";


                 }

    });

         $('.practise__footer').on("click", function() {

           
           if (window.location.pathname.split('/')[1] == "") {
                              
                           function linkTime_2() {
                               var destination = $('#main__title-practise').offset().top;
                               $('html, body').animate({ scrollTop: destination }, 600);
                               return false;
                           }
                           linkTime_2();

                           } else {
                               localStorage.team_swipe = 1;
                               window.location.pathname = "/";


                           }

    });



    

  
   
   




   
    var link = $('.menu-link');
    var link_active = $('.menu-link_active');
    var menu = $('.menu');


    $('.menu-link').on('click', function() {
        link.toggleClass('menu-link_active');
        menu.toggleClass('menu_active');
       
        if (!$(this).hasClass('menu-link_active')) {
            $("html,body").css("overflow", "visible");
        } else {
            $("html,body").css("overflow", "hidden");
        }
    

    });



    var punch_link = $('.punch_link');
    punch_link.on('click', function() {
        link.toggleClass('menu-link_active');
        menu.removeClass('menu_active');
        $("html,body").css("overflow", "visible");
    });
   

    function goToPage() {
        var url_link = document.getElementById('link-test');
        document.location.href = url_link.value;
    }

   


    jQuery(function($) {
        $(document).mouseup(function(e) { 
            var block = $("sub-m-1"); 
            if (!block.is(e.target) 
                &&
                block.has(e.target).length === 0) { 
                block.hide(); 
            }
        });
    });


   
    var logoSlick = $('.sliderLogo').slick({
        nextArrow: document.querySelector('#my-arrow-next'),
        prevArrow: document.querySelector('#my-arrow-prev'),
        dots: false,
        swipe: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
    });

   
    var mainSlick = $('.sliderS').slick({
        nextArrow: document.querySelector('#my-arrow-next'),
        prevArrow: document.querySelector('#my-arrow-prev'),
        dots: false,
        swipe: false,
        fade: true,
        speed: 100


    });


    $('.my-1').on('click', function() {

        mainSlick.slick('slickNext');
    });
    $('.my-2').on('click', function() {

        mainSlick.slick('slickPrev');
    });



    


    $(".city-name").on("click", function(){
        ($(this)[0].dataset.tab);
      
        ($(".city-name").removeClass("city-name_active"));
         ($(this).addClass("city-name_active"));

        ($(".map-info-block").removeClass("map-info-block_active"));
            ($("#"+$(this)[0].dataset.tab).addClass("map-info-block_active"));

             ($(".map-footer").removeClass("map-footer_active"));
             ($("#m"+$(this)[0].dataset.tab).addClass("map-footer_active"));
   
            console.log(($("#m"+$(this)[0].dataset.tab).addClass("map-footer_active")));
    });





    $("#phone").mask("+38 (099) 99 - 99 - 999");






});