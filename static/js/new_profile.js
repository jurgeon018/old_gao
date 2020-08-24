










if ($('.advocate_calender_container').length == 1) {
    

    $('.status_select').select2({
        minimumResultsForSearch: Infinity,
        selectOnClose: true,
        dropdownAutoWidth: true,
        width: 'resolve',
    });
    $('.communicate_select').select2({
        minimumResultsForSearch: Infinity,
        selectOnClose: true,
        dropdownAutoWidth: true,
        width: 'resolve',
    });
    
    $('.advocate_slick_date__block').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        // responsive: [
        //   {
        //     breakpoint: 1200,
        //     settings: {
        //       slidesToShow: 3,
        //       slidesToScroll: 3,
        //       infinite: true,
        //       dots: true
        //     }
        //   }
        // ]
      });
      $('.advocate_calender_arrow_1').click(function () {
        $(".advocate_slick_date__block").slick('slickPrev');
      });
      $('.advocate_calender_arrow_2').click(function () {
        $(".advocate_slick_date__block").slick('slickNext');
      });


      let test_json = [{
          transition: 1,
          clockwork: 9,
          name: 'test_client1',
          type_user: 'клієнт',
          branch: ['Судова галузь', 'Податкова галузь'],
          status: 'В очікуванні',
          date: 'Середа. 15.08.2020.',
          communication: 'Skype',
          price: '1000 грн',
          files: [{
              file_name: 'file1',
              file_url: '/media/test_url/file1.pdf'
          },
          {
              file_name: 'file2',
              file_url: '/media/test_url/file2.pdf'
          }]
      }, 
      {
          transition: 1,
          clockwork: 10,
          name: 'test_client2',
          type_user: 'адвокат',
          branch: ['Судова галузь', 'Податкова галузь'],
          status: 'Завершено',
          date: 'Середа. 15.08.2020.',
          communication: 'GoogleMeet',
          price: '1000 грн',
          files: [{
              file_name: 'file1',
              file_url: '/media/test_url/file1.pdf'
          },
          {
              file_name: 'file2',
              file_url: '/media/test_url/file2.pdf'
          }]
      },
      {
          transition: 2,
          clockwork: 11,
          name: 'test_client3',
          type_user: 'клієнт',
          branch: ['Судова галузь', 'Податкова галузь'],
          status: 'В очікуванні',
          date: 'Середа. 15.08.2020.',
          communication: 'Skype',
          price: '1000 грн',
          files: [{
              file_name: 'file1',
              file_url: '/media/test_url/file1.pdf'
          },
          {
              file_name: 'file2',
              file_url: '/media/test_url/file2.pdf'
          }]
      },
      {
          transition: 1,
          clockwork: 13,
          name: 'test_client4',
          type_user: 'клієнт',
          branch: ['Судова галузь', 'Податкова галузь'],
          status: 'В очікуванні',
          date: 'Середа. 15.08.2020.',
          communication: 'GoogleMeet',
          price: '1000 грн',
          files: [{
              file_name: 'file1',
              file_url: '/media/test_url/file1.pdf'
          },
          {
              file_name: 'file2',
              file_url: '/media/test_url/file2.pdf'
          }]
      },
      {
          transition: 3,
          clockwork: 14,
          name: 'test_client5',
          type_user: 'клієнт',
          branch: ['Судова галузь', 'Податкова галузь'],
          status: 'В очікуванні',
          date: 'Середа. 15.08.2020.',
          communication: 'Skype',
          price: '1000 грн',
          files: [{
              file_name: 'file1',
              file_url: '/media/test_url/file1.pdf'
          },
          {
              file_name: 'file2',
              file_url: '/media/test_url/file2.pdf'
          }]
      },
      {
          transition: 1,
          clockwork: 17,
          name: 'test_client6',
          type_user: 'клієнт',
          branch: ['Судова галузь', 'Податкова галузь'],
          status: 'В очікуванні',
          date: 'Середа. 15.08.2020.',
          communication: 'Paint',
          price: '1000 грн',
          files: [{
              file_name: 'file1',
              file_url: '/media/test_url/file1.pdf'
          },
          {
              file_name: 'file2',
              file_url: '/media/test_url/file2.pdf'
          }]
      },
      {
          transition: 2,
          clockwork: 18,
          name: 'test_client7',
          type_user: 'клієнт',
          branch: ['Судова галузь', 'Податкова галузь'],
          status: 'В очікуванні',
          date: 'Середа. 15.08.2020.',
          communication: 'Skype',
          price: '1000 грн',
          files: [{
              file_name: 'file1',
              file_url: '/media/test_url/file1.pdf'
          },
          {
              file_name: 'file2',
              file_url: '/media/test_url/file2.pdf'
          }]
      }];
      create_calender(test_json);

   function create_calender(array_current_transition) {
    $('.advocate_calender_item__block').children().remove();

    let left_position = 100 / 11;
    let all_clock_calender = $('.adv_cal_time');
    
    let grid_counter = Number(array_current_transition.length);


    let current_task_width = 0;
    for (let i = 0; i < grid_counter ; i++) {
        
        let current_margin;
        let item_left;
        $.each(array_current_transition, function(index, value) {
            if (index == i) {
                $.each(all_clock_calender, function(index, sub_value) {
                    if ($(sub_value).attr('data-clock') == value.clockwork) {
                        current_margin = $(sub_value).index();
                    }
                });
                item_left = (left_position * current_margin);
                current_task_width = value.transition;
            }
        });
        
        let test_json = {
            current_width: left_position,
            // current_transition: current_task_width,
            left: item_left,
            info: array_current_transition[i]
        }
        $('.advocate_calender_item__block')[0].appendChild(create_row_item(test_json));
    }

    function create_row_item(content) {
        let advocate_calender_item_prof = document.createElement('div');
        advocate_calender_item_prof.classList.add('advocate_calender_item_prof');
        advocate_calender_item_prof.setAttribute(`data-clockwork`, content.info.clockwork);
    
        let advocate_calender_task = document.createElement('div');
        $(advocate_calender_task).css('left', `${content.left}%`);
        $(advocate_calender_task).css('width', `${(content.current_width * content.info.transition) - 2}%`);
        advocate_calender_task.classList.add('advocate_calender_task');
    
        advocate_calender_item_prof.appendChild(advocate_calender_task);
    
        for (let i = 0; i < 11; i++) {
            let adv_cal_item = document.createElement('div');
            adv_cal_item.classList.add('adv_cal_item');
        
            let grid_inner = document.createElement('div');
            grid_inner.classList.add('grid_inner');
    
            advocate_calender_item_prof.appendChild(adv_cal_item);
            adv_cal_item.appendChild(grid_inner);
        }
    

        $(advocate_calender_task).on('click', function() {
            $('.advocate_calender_task').removeClass('advocate_calender_task_active');
            $(this).addClass('advocate_calender_task_active');


            let wrap = $(this).parents('.advocate_calender_item_prof');
            let table_task = $('.advocate_calender_info');
            let id = Number($(wrap).attr('data-clockwork'));
            $(table_task).css('left', '-100%');
            setTimeout(() => {
            $(table_task).css('left', '0');

                $.each(array_current_transition, function(index, value) {
                    if (value.clockwork == id) {
                        // зміна імені
                        $(table_task).find('.advocate_info_name').text(value.name);
    
                        // зміна типу юзера
                        $(table_task).find('.advocate_info_subname').text(value.type_user);
    
                        // зміна галузей
                        $('.branch__wrap').children().remove();
                        $.each(value.branch, function(index, sub_value) {
                            let branch_item = document.createElement('div');
                            branch_item.classList.add('advocate_type_work', 'standart_title', 'standart_title_4', 'color_black');
                            branch_item.textContent = sub_value;
                            $('.branch__wrap')[0].appendChild(branch_item);
                        });
    
                        // зміна статуса
                        $('.status_select').val(value.status);
                        $('.status_select').trigger('change');
    
                         // зміна дати
                         $(table_task).find('.advocate_data_user_title').text(value.date);
                         
                         // зміна дати
                         let current_clock;
                         let current_transition = (value.clockwork + value.transition) + '.00';
    
                         if (value.clockwork <= 9) {
                            current_clock = '0' + value.clockwork + '.00';
                         } else {
                            current_clock = value.clockwork + '.00';
                         }
                        
                         $(table_task).find('.user_date_span').text(`з ${current_clock} по ${current_transition}.`);
    
                        // зміна тривалості
                        $(table_task).find('.user_transition_span').text(`консультація -  ${value.transition} год.`);
    
                        // зміна комунікації
                        $('.communicate_select').val(value.communication);
                        $('.communicate_select').trigger('change');
    
                        // зміна тривалості
                        $(table_task).find('.advocate_price_span').text(value.price);
    
                         // зміна файлів
                         $('.info_consultation_file__block').children().remove();
                         $.each(value.files, function(index, sub_value) {
                            let consultation_file = document.createElement('a');
                            consultation_file.classList.add('consultation_file', 'standart_title', 'standart_title_4', 'color_black');
                            consultation_file.textContent = sub_value.file_name;
                            consultation_file.setAttribute(`href`, sub_value.file_url);
    
                            $('.info_consultation_file__block')[0].appendChild(consultation_file);
                        });
                    }
                });
            }, 200);
        })
    
        return advocate_calender_item_prof;
    }

    let new_prof = $('.advocate_calender_item__block').find('.advocate_calender_item_prof');

        $.each(new_prof, function(index, value) {
            setTimeout(() => {
                $(value).css('top', '0px');
                $(value).css('max-height', '1000px');
            }, 200);
        });
   }

    $('.advocate_slick_date_prof').on('click', function() {
        $('.advocate_slick_date_prof').removeClass('advocate_slick_date_prof_active');
        $(this).addClass('advocate_slick_date_prof_active');

        let old_prof = $('.advocate_calender_item__block').find('.advocate_calender_item_prof');

        $.each(old_prof, function(index, value) {
            setTimeout(() => {
                $(value).css('top', '-1000px');
                $(value).css('max-height', '0px');
            }, 200);
            setTimeout(() => {
                create_calender(test_json);
            }, 400);
        });

    });

}
 







$('.docs_title_btn').on('click', function() {
    let wrap = $(this).parents('.docs__wrap');

    $(wrap).toggleClass('docs__wrap_active');


});







    
var disabledDays = [0, 6];
var reserved_days = ["20-August-2020", "21-August-2020"];
var busy_days = ["25-August-2020", "27-August-2020"];
var months = ['january','feburary','March','April','May','June','July','August','September','November','December'];

var myDatepicker = $('#datapicker_user').datepicker({
    moveToOtherMonthsOnSelect: false,
    multipleDates: false,
    minDate: new Date(),
    onRenderCell: function(date, cellType) {
        var currentDate = date.getDate();
        var myDate = ((date.getDate()<10)?'0':'')+date.getDate()+'-'+months[date.getMonth()]+'-'+date.getFullYear();
   
         if (reserved_days.indexOf(myDate)>-1) {
           return {
            classes: 'disable_day',
            disabled: true
           }
         } else if (busy_days.indexOf(myDate)>-1) {
            return {
                classes: 'busy_day',
                disabled: false,
                html: currentDate + '<span class="dp-note"></span>'
            }
          } else if (cellType == 'day') {
                var day = date.getDay(),
                isDisabled = disabledDays.indexOf(day) != -1;

            return {
                disabled: isDisabled
            }
        } else {
           return {
            disabled: false
          }
        }
      },
    onSelect: function(formattedDate, date, inst) {
        let str_text = inst.selectedDates[0] + ' ';
        let current_day = str_text.slice(0, 3);
        let current_data;
        if (current_day == 'Mon') {
            current_data = `Понеділок. ${formattedDate}`;
        } else if (current_day == 'Tue') {
            current_data = `Вівторок. ${formattedDate}`;
        } else if (current_day == 'Wed') {
            current_data = `Середа. ${formattedDate}`;
        } else if (current_day == 'Thu') {
            current_data = `Четвер. ${formattedDate}`;
        } else if (current_day == 'Fri') {
            current_data = `П'ятниця. ${formattedDate}`;
        }
        $('.advocate_user_date').text(current_data);
        
    }
    
 });
 myDatepicker.show();
 

$('.data_step_select_btn').on('click', function() {
    if ($(this).hasClass('visible')) {
        myDatepicker.hide();
    } else {
        myDatepicker.show();
    }



    $(this).toggleClass('visible');
})






$('.set-wrap').on('click', function() {
    $.fancybox.open({
        src: '#modal-change_settings',
        touch: false
    }); 
});

$('.step_change_btn').on('click', function() {
    let wrap = $(this).parents('.step_select');
    $(wrap).find('.step_hidden_content').toggleClass('step_hidden_content_active');
});
$('.step_select_text').on('click', function() {
    let wrap = $(this).parents('.step_select');
    let data = $(this).attr('data-title');

    $(wrap).find('.step_select_text').removeClass('step_select_text_active');
    $(this).addClass('step_select_text_active');
    $(wrap).find('.step_active_content').text(data);
    $(wrap).addClass('step_select_active');
    $(wrap).find('.step_hidden_content').removeClass('step_hidden_content_active');
});

$(".main_doc_link").on("click", function(){
    let wrap = $(this).parents('.tab-auto-content-prof');
    $(wrap).find(".main_doc_link").removeClass("main_doc_link_active");
     $(this).addClass("main_doc_link_active");

    $(wrap).find(".main_doc_content").removeClass("main_doc_content_active");
    $("#profile_"+$(this)[0].dataset.tab).addClass("main_doc_content_active");

});


$('.advocate_download_close').on('click', delete_file);

function delete_file() {
    let wrap = $(this).parents('.advocate_download_prof');

    $(wrap).css('max-height', '0px');
    $(wrap).css('left', '-100%');

    setTimeout(() => {
        $(wrap).remove();
    }, 200);

}



$('.submit_wrapper').on('click', function() {
    console.log(1);
})




$('.step_date_prof').on('click', add_clockwork);

function add_clockwork() {
    if ($(this).hasClass('step_date_prof_passive')) {

    } else {
        $(this).toggleClass('step_date_prof_active');
        let current_clock = Number($(this).parents('.step_date__block').find('.step_date__wrap').find('.step_date_prof_active').length);
        $('.step_access').text(`${current_clock}.00`);
    }
}

$('.step_access_btn').on('click', function() {
    let current_clock = Number($(this).parents('.step_date__block').find('.step_date__wrap').find('.step_date_prof_active').length);
    $('.current_clock_num').text(`${current_clock}`);
    let current_cost = Number($('.all_price_consultation').attr('data-advocate-cost'));
    let sum = current_cost * current_clock;
    $('.all_price_consultation').attr('data-price', sum);
    counter_num('.all_price_consultation', 1000, sum);
})

// className - імя класа
// duration_animation - тривалість анімації (2000)
// number - до якої кількості прокручувати
function counter_num(className, duration_animation, number) {
    $({ Counter: 0 }).animate({
      Counter: number
    }, {
      duration: duration_animation,
      easing: 'swing',
      step: function() {
        $(className).text(Math.ceil(this.Counter) + " грн");
      }
    });
  }



if ($('.step_date__block').length == 1) {
    var knob = document.querySelector('.custom-scrollbar__knob')
    var bar = document.querySelector('.custom-scrollbar__bar')
    var container = document.querySelector('.custom-scrollbar__inner')

    // When the container is scrolled
    container.addEventListener('scroll', () => {
    // If we are dragging the knob, do nothing
    if (dragging) return
    
    // Otherwise, set the knob position based on the scroll position
    knob.style.top = container.scrollTop / (container.scrollHeight - container.offsetHeight) * 100 + '%'
    })

    var dragging = false
    knob.addEventListener('mousedown', (event) => {
    dragging = {
        x: event.clientX,
        y: event.clientY
    }
    })
    window.addEventListener('mousemove', (event) => {

    if (dragging) {
        // When dragging
        event.preventDefault()
        var diff = {
        x: event.clientX - dragging.x,
        y: event.clientY - dragging.y
        }
        
        // Clamp the position of the knob to be a maximum of 
        // the knobs container, and a minimum of 0
        var newTop = Math.max(0, Math.min(knob.offsetTop + diff.y, bar.offsetHeight))
        knob.style.top = newTop + 'px'
        
        // Base the scroll offset on the knobs position
        // in relation to the knobs container
        var scrollOffset = newTop / bar.offsetHeight * (container.scrollHeight - container.offsetHeight)
        container.scrollTop = scrollOffset
        
        dragging = {
        x: event.clientX,
        y: event.clientY
        }
    }
    })
    window.addEventListener('mouseup', () => {
    dragging = false
    })
}






$('.step_select_radio').on('click', function() {
    let text = $(this).attr('data-title');
    let wrap = $(this).parents('.step_select');


    if ($(this).hasClass('step_select_text_active')) {
        let current_practise = $(wrap).find('.step_active_content__block').find('.step_active_content');
        $.each(current_practise, function(index, value) {
            console.log('text: ', text);
                console.log('$(value).text: ', $(value).text());
            if ($(value).text() == text) {
                
                $(value).remove();
            }
        });
        $(this).removeClass('step_select_text_active');
    } else {
        $(this).addClass('step_select_text_active');
        let test_json = {
            textPractise: text,
        }
        $('.step_active_content__block')[0].appendChild(create_practise(test_json));
    }
   
});





let create_practise = (content) => {
    let step_active_content = document.createElement('div');
        step_active_content.classList.add('step_active_content', 'standart_title', 'standart_title_4', 'color_gold');
        step_active_content.textContent = content.textPractise;
        return step_active_content;
}

let current_clock = transform_clock(260);
console.log('current_clock: ', current_clock);
function transform_clock(date) {
    let current_clock = date;

    let hours = Math.trunc(current_clock / 60);
    let minunte = Math.round((current_clock / 60 - hours) * 60);

    current_clock = `${hours}.${minunte}`;

    return current_clock;
}