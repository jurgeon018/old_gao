

$('.set-wrap').on('click', function() {
    $.fancybox.open({
        src: '#modal-change_settings',
        touch: false
    }); 
});





$(".main_doc_link").on("click", function(){
    $(".main_doc_link").removeClass("main_doc_link_active");
     $(this).addClass("main_doc_link_active");

    $(".main_doc_content").removeClass("main_doc_content_active");
    $("#profile_"+$(this)[0].dataset.tab).addClass("main_doc_content_active");

});
