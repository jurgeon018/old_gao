new WOW().init();

$(document).ready(function() {










     // about__link
     if (window.location.href == 'file:///C:/Users/odmin/Desktop/GAO/about_page.html') {
        $('#about__link').addClass('about__link').removeClass('hvr-underline-from-center');
     }
     //blog__link 
     if (window.location.href == 'file:///C:/Users/odmin/Desktop/GAO/blog.html') {
        $('#blog__link').addClass('blog__link').removeClass('hvr-underline-from-center');
     }
     //contact__link  
     if (window.location.href == 'file:///C:/Users/odmin/Desktop/GAO/contact_page.html') {
        $('#contact__link').addClass('contact__link').removeClass('hvr-underline-from-center');
     }



    //paralax


    var scene = document.getElementById('scene');


    if (scene != null) {

        var parallaxInstance = new Parallax(scene);
    }




    if (window.location.href == 'file:///C:/Users/odmin/Desktop/GAO/index.html' && localStorage.team_swipe == 1) {

        localStorage.team_swipe = null;

        document.getElementById('main__title-team').scrollIntoView();

       
    }


    $('#team__link').on("click", function() {

        if (window.location.href == 'file:///C:/Users/odmin/Desktop/GAO/index.html') {

            document.getElementById('main__title-team').scrollIntoView();

        } else {
            localStorage.setItem('team_swipe', 1);
            window.location.href = "index.html";
        }




        // 

        // localStorage.getItem('test')
        // alert("перед")
        // window.location.href = 'index.html'
        // alert("післся")


        // }
    });
    
     $('.team__footer').on("click", function() {

        if (window.location.href == 'file:///C:/Users/odmin/Desktop/GAO/index.html') {

            document.getElementById('main__title-team').scrollIntoView();

        } else {
            localStorage.setItem('team_swipe', 1);
            window.location.href = "index.html";
        }

    });

    // practise


        if (window.location.href == 'file:///C:/Users/odmin/Desktop/GAO/index.html' && localStorage.practise_swipe == 1) {

            localStorage.practise_swipe = null;

            document.getElementById('main__title-practise').scrollIntoView();

           
        }


        $('#practise__link').on("click", function() {

            if (window.location.href == 'file:///C:/Users/odmin/Desktop/GAO/index.html') {

                document.getElementById('team-btn').scrollIntoView();

            } else {
                localStorage.setItem('practise_swipe', 1);
                window.location.href = "index.html";
            }

    });

         $('.practise__footer').on("click", function() {

            if (window.location.href == 'file:///C:/Users/odmin/Desktop/GAO/index.html') {

                document.getElementById('team-btn').scrollIntoView();

            } else {
                localStorage.setItem('practise_swipe', 1);
                window.location.href = "index.html";
            }

    });



    

    $('.link-fanc').fancybox({
        touch: false
    });




    // MENU
    var link = $('.menu-link');
    var link_active = $('.menu-link_active');
    var menu = $('.menu');


    $('.menu-link').on('click', function() {
        link.toggleClass('menu-link_active');
        menu.toggleClass('menu_active');
        // console.log($(this).hasClass('menu-link_active'));
        if (!$(this).hasClass('menu-link_active')) {
            $("html,body").css("overflow", "visible");
        } else {
            $("html,body").css("overflow", "hidden");
        }
        //  
        //  $('.menu-link_active').on('click', function() {
        // link.removeClass('menu-link_active');
        //  

        // });

    });




    // $('.menu-link_active').on('click', function() {
    //  link.removeClass('menu-link_active');
    //   $("html,body").css("overflow","visible");

    // });

    var punch_link = $('.punch_link');
    punch_link.on('click', function() {
        link.toggleClass('menu-link_active');
        menu.removeClass('menu_active');
        $("html,body").css("overflow", "visible");
    });
    // link-page

    function goToPage() {
        var url_link = document.getElementById('link-test');
        document.location.href = url_link.value;
    }

    // sub-menu

    // var sub_link = $('.sub_link');


    // var sub_menu_active = $('sub-menu_active');
    // var sub_menu = $('.sub-menu');
    // sub_link.on('click', function () {
    //  sub_menu.toggleClass('sub-menu_active');
    //  sub_link_2.removeClass('sub-menu_active-2');
    // });
    // sub_menu_active.on("click", function() {
    //  sub_link.removeClass('sub-menu_active');
    // });
    // // sub-menu-2
    // var sub_link_2 = $('.sub_link-2');
    // var sub_menu_active_2 = $('sub-menu_active-2');
    // var sub_menu_2 = $('.sub-menu-2');

    // sub_link_2.on('click', function () {
    //  sub_menu_2.toggleClass('sub-menu_active-2');
    //  sub_link.removeClass('sub-menu_active');
    // });
    // sub_menu_active_2.on("click",function() {
    //  sub_link_2.removeClass('sub-menu_active-2');
    // });
    // id
    // var id_link = $('.elips');
    // id_link.on("click", function () {
    //  // id_link.toggleClass('elips_active');
    //  $(this).addClass('elips_active').siblings().removeClass('elips_active');

    // });



    jQuery(function($) {
        $(document).mouseup(function(e) { // отслеживаем событие клика по веб-документу
            var block = $("sub-m-1"); // определяем элемент, к которому будем применять условия (можем указывать ID, класс либо любой другой идентификатор элемента)
            if (!block.is(e.target) // проверка условия если клик был не по нашему блоку
                &&
                block.has(e.target).length === 0) { // проверка условия если клик не по его дочерним элементам
                block.hide(); // если условия выполняются - скрываем наш элемент
            }
        });
    });


    //slider-logo
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

    // SLIDER
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



    // TAB


    $(".city-name").on("click", function(){
        ($(this)[0].dataset.tab);
      
        ($(".city-name").removeClass("city-name_active"));
         ($(this).addClass("city-name_active"));
        ($(".map-info-block").removeClass("map-info-block_active"));
            ($("#"+$(this)[0].dataset.tab).addClass("map-info-block_active"));
    });


    // //обработчик кликов по неактивным табам
    // $('.city-swap div').not('.city-name_active').click(function() {
    //     //номер таба
    //     var index = $(this).index();
    //     //соответствующая закладка
    //     var content = $('.tab-content li').eq(index);
    //     //таб сделать активным, остальные неактивными
    //     $(this).addClass('city-name_active').siblings().removeClass('city-name_active');
    //     //открыть нужную вкладку, закрыть остальные
    //     $('.tab-content .map-info-block').removeClass('map-info-block_active').eq(index).addClass('map-info-block_active');
    // })





    //mask 

    $("#phone").mask("+38 (099) 99 - 99 - 999");




    // scroll

    // window.addEventListener('scroll', function() {
    //   document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
    // });

//     function offset(el) {
//     var rect = el.getBoundingClientRect(),
//     scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
//     scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
// }


    // var block_1 = $('#main-header')[0].offsetHeight;
    // var block_2 = $('#about_us')[0].offsetHeight;
    // var block_3 = $('#work')[0].offsetHeight;
    // var block_4 = $('#client')[0].offsetHeight;
    // var block_5 = $('#team')[0].offsetHeight;
    // var block_6 = $('#practise')[0].offsetHeight;
    // var top_menu = $('#menu_id')[0].offsetHeight;

    
    // $('#about__link').on("click", function () {
    // 
    // });
    // $('#team__link').on("click", function () {
    //  window.scrollTo(0, block_1 + block_2 + block_3 + block_4 + top_menu);
    // });
    // $('#practise__link').on("click", function () {
    //  window.scrollTo(0, block_1 + block_2 + block_3 + block_4 + block_5 + top_menu);
    // });




});