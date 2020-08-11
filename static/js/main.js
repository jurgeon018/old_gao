new WOW().init();

$(document).ready(function() {


  // tabs==========
  $(".main_tab__link").on("click", function(){
      ($(this)[0].dataset.tab);
      var className = ($(this)[0].dataset.tab);
      console.log(className);
      ($(".main_tab__link").removeClass("main_tab__link_active"));
       ($(this).addClass("main_tab__link_active"));
      ($(".tab-auto-content-prof").removeClass("tab-auto-content-prof_active"));
          ($("#"+$(this)[0].dataset.tab).addClass("tab-auto-content-prof_active"));

  });
  $(".mini-tab__link").on("click", function(){
      ($(this)[0].dataset.tab);
      var className = ($(this)[0].dataset.tab);
      console.log(className);
      ($(".mini-tab__link").removeClass("mini-tab__link_active"));
       ($(this).addClass("mini-tab__link_active"));
      ($(".mini-tab-content-prof").removeClass("mini-tab-content-prof_active"));
          ($("#"+$(this)[0].dataset.tab).addClass("mini-tab-content-prof_active"));

  });





    $("#team__link").on('click', function () {
        if (window.location.pathname.split('/')[1] !== "") {
                              localStorage.team_swipe = 1;
                           window.location.pathname = "/";
                           console.log('hello');
        } else {
            var elementClick = $(this).attr("href");
            console.log(elementClick);
            var destination = $(elementClick).offset().top;
            $('html, body').animate({ scrollTop: destination }, 600);
            return false;
        }
        
    });

    $(".team__footer").on('click', function () {
        if (window.location.pathname.split('/')[1] !== "") {
                              localStorage.team_swipe = 1;
                           window.location.pathname = "/";
                           console.log('hello');
        } else {
            var elementClick = $(this).attr("href");
            console.log(elementClick);
            var destination = $(elementClick).offset().top;
            $('html, body').animate({ scrollTop: destination }, 600);
            return false;
        }
        
    });



     if (window.location.pathname.split('/')[1] == '' && localStorage.team_swipe == 1) {

          function linkTime() {
                     
                     var destination = $('#main__title-team').offset().top;
                     $('html, body').animate({ scrollTop: destination });
                     return false;
                 }
                 setTimeout(linkTime, 500);
                 localStorage.team_swipe = 0;
           
        }


        $("#practise__link").on('click', function () {
            if (window.location.pathname.split('/')[1] !== "") {
                                  localStorage.team_swipe = 2;
                               window.location.pathname = "/";
                               console.log('hello');
            } else {
                var elementClick = $(this).attr("href");
                console.log(elementClick);
                var destination = $(elementClick).offset().top;
                $('html, body').animate({ scrollTop: destination }, 600);
                return false;
            }
            
        });

        $(".practise__footer").on('click', function () {
            if (window.location.pathname.split('/')[1] !== "") {
                                  localStorage.team_swipe = 2;
                               window.location.pathname = "/";
                               console.log('hello');
            } else {
                var elementClick = $(this).attr("href");
                console.log(elementClick);
                var destination = $(elementClick).offset().top;
                $('html, body').animate({ scrollTop: destination }, 600);
                return false;
            }
            
        });



         if (window.location.pathname.split('/')[1] == '' && localStorage.team_swipe == 2) {

              function linkTime() {
                         
                         var destination = $('#main__title-practise').offset().top;
                         $('html, body').animate({ scrollTop: destination });
                         return false;
                     }
                     setTimeout(linkTime, 500);
                     localStorage.team_swipe = 0;
               
            }
     
localStorage.team_swipe = 0;





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




$('#team__link').on("click", function() {

});




        


    // $('.btn-communicate').on("click", function() {
    //     gtag('event', 'send', { 'event_category': 'contact_us', 'event_action': 'click', });
    //     console.log("123");
    // });

    // $('.tel-link-1').on("click", function() {
    //     gtag('event', 'send', { 'event_category': 'phone_1', 'event_action': 'click', });
    //     console.log("123");
    // });

    // $('.tel-link-2').on("click", function() {
    //     gtag('event', 'send', { 'event_category': 'phone_2', 'event_action': 'click', });
    //     console.log("123");
    // });
    // $('.mail_class').on("click", function() {
    //     gtag('event', 'send', { 'event_category': 'email', 'event_action': 'click', });
    //     console.log("123");
    // });















  
   
   




   
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
       
        swipe: false,
        autoplay: false,
        speed: 1000,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: document.querySelector('#my-arrow-next'),
        prevArrow: document.querySelector('#my-arrow-prev'),
        cssEase: 'ease-in-out',
        touchThreshold: 100,
        draggable: true,
        autoplay: true,
        autoplaySpeed: 7000,
        arrows: false,
        dots: true,
        fade: true,

    });

  
    // $('.sliderS').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        
    //     let active_slide = Number($('.slide-left').find('.slick-current').attr('data-counter'));
    //     console.log('active_slide: ', active_slide);
    //     let all_length = $('.slide-left').find('.slide-prof').length;

    //     let slider_id = Number(currentSlide) + 1;
    //     let sliders = $('.slide-left').find('.slide-prof');


    //     $.each(sliders, function(index, value) {
    //         if ($(value).attr('data-counter') == active_slide) {
    //             console.log('$(value): ', $(value));
    //         }
    //     });
        
    // });


    $('.my-1').on('click', function() {
        mainSlick.slick('slickPrev');

    });
    $('.my-2').on('click', function() {
        mainSlick.slick('slickNext');

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