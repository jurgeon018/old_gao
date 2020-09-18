









if ($('.advocate_calender_container').length == 1) {
    
    $('.advocate_calender_time__block').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 11,
        slidesToScroll: 11,
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
      $('.advocate_time_arrow_1').click(function () {
        $(".advocate_calender_time__block").slick('slickPrev');
      });
      $('.advocate_time_arrow_2').click(function () {
        $(".advocate_calender_time__block").slick('slickNext');
      });

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
          clockwork: '9.00',
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
          clockwork: '10.00',
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
          clockwork: '11.00',
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
          clockwork: '13.00',
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
          clockwork: '14.00',
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
          clockwork: '17.00',
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
          clockwork: '18.00',
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
    let current_slides = $('.advocate_calender_time__block').find('.slick-active');
    let all_clock_calender = $('.adv_cal_time');
    
    let grid_counter = Number(array_current_transition.length);


    let current_task_width = 0;
    for (let i = 0; i < grid_counter ; i++) {
        let current_margin;
        let item_left;
        let check_active;
        let current_time = [];
        
        $.each(array_current_transition, function(index, value) {
            if (index == i) {
                $.each(current_slides, function(index, sub_value) {
                    if ($(sub_value).find('.adv_cal_time').attr('data-clock') == value.clockwork) {
                        current_time.push(value.clockwork);
                        current_margin = index;
                    } else {

                    }
                });
                item_left = (left_position * current_margin);
                current_task_width = value.transition;
            }
        });
        if (current_time.length == 0) {
            check_active = false;
        } else {
            check_active = true;
        }
        let test_json = {
            current_width: left_position,
            // current_transition: current_task_width,
            left: item_left,
            info: array_current_transition[i],
        }
        if (check_active == true) {
            $('.advocate_calender_item__block')[0].appendChild(create_row_item(test_json));
        }
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

    $('.advocate_time_arrow').on('click', function() {

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


let test_practise = [
    {
        name: 'договірна',
        id: 1
    },
    {
        name: 'приговірна',
        id: 2
    },
    {
        name: 'чарівна',
        id: 3
    },
    {
        name: 'логішна',
        id: 4
    },
    {
        name: 'антична',
        id: 5
    },
]

let test_advocate = [
    {
        name: 'advocate1',
        id: [2, 3, 4, 5]
    },
    {
        name: 'advocate2',
        id: [1, 3]
    },
    {
        name: 'advocate3',
        id: [1, 2, 3, 5]
    },
    {
        name: 'advocate4',
        id: [5]
    },
]

if ($('.practise_step_hidden_content').length >= 1) {
    create_all_doc_for_client('.practise_step_hidden_content', test_practise);
    create_all_doc_for_client('.client_select_step_hidden_content', test_advocate);
}

   
function create_all_doc_for_client(wrap, json) {
    console.log('json: ', json);
    $(wrap).children().remove();
    $.each(json, function(index, value) {
        $(wrap)[0].appendChild(create_doc(value));
    });
}

function create_doc(content) {
    let doc_item = document.createElement('div');
    doc_item.setAttribute(`data-title`, content.name);
    doc_item.setAttribute(`data-id`, content.id);
    doc_item.classList.add('step_select_text', 'standart_title', 'standart_title_2', 'color_black');
    doc_item.textContent = content.name;

    $(doc_item).on('click', click_select_item);
    return doc_item;
}


function click_select_item() {
    let wrap = $(this).parents('.step_select');
    let data = $(this).attr('data-title');

    $(wrap).find('.step_select_text').removeClass('step_select_text_active');
    $(this).addClass('step_select_text_active');
    $(wrap).find('.step_active_content').text(data);
    $(wrap).addClass('step_select_active');
    $(wrap).find('.step_hidden_content').removeClass('step_hidden_content_active');


    let checker = $(this).parents()[0];
    console.log('checker: ', checker);
    // практики
    if ($(checker).hasClass('practise_step_hidden_content')) {
        let test1 = [
            {
                name: 'advocate3',
                id: [1, 2, 3, 5]
            },
            {
                name: 'advocate4',
                id: [5]
            },
        ]
        create_all_doc_for_client('.client_select_step_hidden_content', test1);
    }
    // адвокати
    else if ($(checker).hasClass('client_select_step_hidden_content')) {
        let test2 = [
            {
                name: 'чарівна',
                id: 3
            },
            {
                name: 'логішна',
                id: 4
            },
            {
                name: 'антична',
                id: 5
            },
        ]
        create_all_doc_for_client('.practise_step_hidden_content', test2);

        $('.advocate_select_date').find('.step_select').removeClass('step_select_active');
        $('.advocate_select_time').find('.step_select').removeClass('step_select_active');

        var datepicker = $('#datapicker_user').datepicker().data('datepicker');
        datepicker.destroy();
        var weekenddDays = [0, 6];
        var reserve = ["20-August-2020", "21-August-2020"];
        var busy = ["25-August-2020", "27-August-2020"];
        var months_items = ['january','feburary','March','April','May','June','July','August','September','November','December'];
        create_client_calender(weekenddDays, reserve, busy, months_items);
    }


};



$('.docs_title_btn').on('click', function() {
    let wrap = $(this).parents('.docs__wrap');
    $(wrap).toggleClass('docs__wrap_active');
});

if ($('.advocate_user_input__block').length >= 1) {
    var datepicker = $('#datapicker_user').datepicker().data('datepicker');
        datepicker.destroy();
        var weekenddDays = [0, 6];
        var reserve = ["20-August-2020", "21-August-2020"];
        var busy = ["25-August-2020", "27-August-2020"];
        var months_items = ['january','feburary','March','April','May','June','July','August','September','November','December'];
        create_client_calender(weekenddDays, reserve, busy, months_items);
}

function create_clockwork_client(content) {
    let step_date_prof = document.createElement('div');

    if (content.reserve == false) {
        step_date_prof.classList.add('step_date_prof', 'button_transparent');
    } else {
        step_date_prof.classList.add('step_date_prof', 'button_transparent', 'step_date_prof_passive');
    }
    step_date_prof.setAttribute(`data-clock`, transform_clock(content.hours));
    step_date_prof.textContent = transform_clock(content.hours);

    $(step_date_prof).on('click', add_clockwork);

    return step_date_prof;
}


    

function create_client_calender(disabledDays, reserved_days, busy_days, months) {
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
            $('.step_access').text('');
            $('.current_clock_num').text(0);
            $('.all_price_consultation').text(0);
            $('.advocate_select_date').find('.step_select').addClass('step_select_active');
            $('.advocate_select_time').find('.step_select').removeClass('step_select_active');
    
            let test_json = [
                {
                    hours: 540,
                    reserve: false,
                },
                {
                    hours: 570,
                    reserve: true,
                },
                {
                    hours: 600,
                    reserve: false,
                },
                {
                    hours: 630,
                    reserve: false,
                },
                {
                    hours: 660,
                    reserve: false,
                },
                {
                    hours: 690,
                    reserve: false,
                },
                {
                    hours: 720,
                    reserve: false,
                },
                {
                    hours: 750,
                    reserve: false,
                },
            ]
    
            $('.step_date__wrap').children().remove();
    
            console.log('test_json: ', test_json);
            $.each(test_json, function(index, value) {
                console.log('value: ', value);
                $('.step_date__wrap')[0].appendChild(create_clockwork_client(value));
            });
            
        }
        
     });
}
 
 

$('.data_step_select_btn').on('click', function() {
    if ($(this).hasClass('visible')) {
        $('#datapicker_user').hide();
    } else {
        $('#datapicker_user').show();
    }
    

    $(this).toggleClass('visible');
})
// додавання файлів адвокатом
$('.advocate_doc_add_btn').on('change', function() {
    let file_create = $('#advocate_doc_add_btn')[0];
    let files = file_create.files;
    
    $.each(files, function(index, value ){
        $('.doc-block')[0].appendChild(create_advocate_files(value));
    });
});


let create_advocate_files = (content) => {
    let doc_profile = document.createElement('div');
        doc_profile.classList.add('doc-profile');

        let doc_top = document.createElement('div');
        doc_top.classList.add('doc-top');

        let doc_bot = document.createElement('div');
        doc_bot.classList.add('doc-bot');

    let doc_img_wrap = document.createElement('div');
    doc_img_wrap.classList.add('doc-img-wrap');

    let doc_img = document.createElement('img');
    doc_img.classList.add('doc-img');
    doc_img.setAttribute(`src`, '/static/img/doc.svg');


    let numbers = $('.doc-block').find('.doc-profile').length + 1;
    let doc_name = document.createElement('div');
    doc_name.classList.add('doc-name');
    doc_name.textContent = `Docum ${numbers}`;

    let doc__title = document.createElement('div');
    doc__title.classList.add('doc__title');
    doc__title.textContent = content.name;


    // let svg_span = document.createElement('span');
    // svg_span.classList.add('advocate_download_close');

    // svg_span.innerHTML = `
    //     <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
    //         <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">
    //         </path>
    //     </svg>
    // `;
    // $(svg_span).on('click', delete_file);


    doc_profile.appendChild(doc_top);
    doc_profile.appendChild(doc_bot);
    doc_top.appendChild(doc_img_wrap);
    doc_img_wrap.appendChild(doc_img);
    doc_img_wrap.appendChild(doc_name);
    doc_top.appendChild(doc__title);

    
        return doc_profile;
}







// додавання файлів клієнтом
$('.input_user_file').on('change', function() {
    let file_create = $('#input_user_file')[0];
    let files = file_create.files;
    if (files.length == 1) {
        $('.new_files_info').text(`${files.length} новий файл`);
    } else {
        $('.new_files_info').text(`${files.length} нових файлів`);
    }
    $('.new_files_users').children().remove();

    $.each(files, function(index, value ){
        $('.new_files_users')[0].appendChild(create_client_files(value));
    });
});


let create_client_files = (content) => {
    console.log('content: ', content);
    let advocate_download_prof = document.createElement('div');
        advocate_download_prof.classList.add('advocate_download_prof', 'new_advocate_download_prof');

    let advocate_download_name = document.createElement('div');
    advocate_download_name.classList.add('advocate_download_name', 'main_title', 'main_title_4', 'color_gold');
    advocate_download_name.textContent = content.name;
    

    // let svg_span = document.createElement('span');
    // svg_span.classList.add('advocate_download_close');

    // svg_span.innerHTML = `
    //     <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
    //         <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">
    //         </path>
    //     </svg>
    // `;
    // $(svg_span).on('click', delete_file);


    advocate_download_prof.appendChild(advocate_download_name);
    // advocate_download_prof.appendChild(svg_span);

    
        return advocate_download_prof;
}

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

$(".main_doc_link").on("click", function(){
    console.log(123);
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
    check_user_valid();
})

function check_user_valid() {
    let all_check_items = $('.step_select');
    let all_count = $('.step_select').length;
    let counter = 0;
    $.each(all_check_items, function(index, value) {
        if ($(value).hasClass('step_select_active')) {
            counter++;
        } else {
            let error_text = $(value).attr('data-error');
            $('.sumbit_content_error').text(error_text);
            return false;
        }
        if (counter == all_count) {
            console.log("все ок");
            $('.sumbit_content_error').text('');
            $('.submit_wrapper').removeClass('submit_wrapper_error');
        } else {
            $('.submit_wrapper').addClass('submit_wrapper_error');
        }
    });
}


$('.step_date_prof').on('click', add_clockwork);

function add_clockwork() {
    let all_clockwork = $('.step_date_prof');
    let current_index;
    let before_index;
    let after_index;
    let check_active;
    if ($(this).hasClass('step_date_prof_active')) {
        check_active = true;
    } else {
        check_active = false;
    }
    $(this).toggleClass('step_date_prof_active');
    let active_clockwork = $('.step_date_prof_active');

    if (active_clockwork.length == 1) {
        current_index = Number($(this).index());
        before_index = current_index - 1;
        after_index = current_index + 1;
    } else if (active_clockwork.length >= 2) {
        current_index = undefined;
        before_index = $(active_clockwork).first().index() - 1;
        after_index = $(active_clockwork).last().index() + 1;
    }
    if ($(this).index() != before_index && $(this).index() != after_index && check_active == true) {
        $('.step_date_prof').removeClass('step_date_prof_active');
    } else {

    }
    

    

    if ($(this).hasClass('step_date_prof_passive')) {

    } else {
       
        $.each(all_clockwork, function(index, value) {
            if ($(value).hasClass('step_date_prof_passive') || $(value).hasClass('step_date_prof_active')) {
                $(value).removeClass('step_date_prof_blocked');
            } else {
                $(value).addClass('step_date_prof_blocked');
            }
        });

        if ($('.step_date_prof').hasClass('step_date_prof_passive') || $('.step_date_prof').hasClass('step_date_prof_active')) {
            
        } else {
            $('.step_date_prof').addClass('step_date_prof_blocked');
        }

        if (all_clockwork[before_index] != undefined) {
            $(all_clockwork[before_index]).removeClass('step_date_prof_blocked');
        }
        if (all_clockwork[after_index] != undefined) {
            $(all_clockwork[after_index]).removeClass('step_date_prof_blocked');
        }
        if (all_clockwork[current_index] != undefined) {
            $(all_clockwork[current_index]).removeClass('step_date_prof_blocked');
        }
            

            
        

      
        

        let attr = Number($(this).parents('.step_date__wrap').attr('data-transition'));
        let current_clock = Number($(this).parents('.step_date__block').find('.step_date__wrap').find('.step_date_prof_active').length);
        $('.step_access').text(transform_clock(current_clock * attr));
    }

    if ($('.step_date_prof_active').length == 0) {
        $('.step_date_prof').removeClass('step_date_prof_blocked');
    }
}


$('.save_reserve_date_btn').on('click', function() {
    let date_value = $('.datapicker_user').val();
    console.log('date_value: ', date_value);
    let first_clock = $('.first_advocate_user_clock').attr('data-clock');
    let second_clock = $('.second_advocate_user_clock').attr('data-clock');

    if (date_value == '') {
        $('.error_reserve').text('Вкажіть дату');
    } else if (first_clock == '0' && second_clock == '0') {
        $('.error_reserve').text('Вкажіть час');
    } else {
        $('.error_reserve').text('');

            
    }
})
$('.step_access_btn').on('click', function() {
    if ($(this).hasClass('step_advocate_btn')) {
        
            let result_clock = find_order_clock();
            
            $('.first_advocate_user_clock').text(result_clock.first);
            $('.first_advocate_user_clock').attr('data-clock', result_clock.first);
            $('.second_advocate_user_clock').text(result_clock.second);
            $('.second_advocate_user_clock').attr('data-clock', result_clock.second);

        $('.advocate_step_hidden_content').removeClass('step_hidden_content_active');
    } else {
        let current_clock = transform_minute(Number($('.step_access').text()));
        if (current_clock == 0) {
            $('.step_access').css('border', '1px solid red');
            $('.advocate_select_time').find('.step_select').removeClass('step_select_active');
            check_user_valid();
            $('.all_price_consultation').text(0);
    
        } else {
            $('.step_access').css('border', '1px solid #D2A351');
    
            let current_cost = Number($('.all_price_consultation').attr('data-advocate-cost'));
            let duration = Number($('.all_price_consultation').attr('data-advocate_duration_cost'));
    
            let current_sum = current_cost / duration;
            let sum = current_sum * current_clock;
    
            $('.advocate_select_time').find('.step_select').addClass('step_select_active');
            $('.current_clock_num').text(transform_clock(current_clock));
            $('.all_price_consultation').attr('data-price', sum);
            
            let result_clock = find_order_clock();
            
            $('.clock_manager_first').text(result_clock.first);
            $('.clock_manager_second').text(result_clock.second);
            $('.all_price_consultation').text(sum);
            // counter_num('.all_price_consultation', 1000, sum);
            check_user_valid();
        }
    }
})


function find_order_clock() {
    let result = {
        first: 0,
        second: 0
    }
    let all_clock_user = $('.step_date_prof_active');
    let first_clock;
    let second_clock;
    let transition_clock = Number($('.step_date__wrap').attr('data-transition'));
    if (all_clock_user.length == 1) {
        let first_minute = transform_minute(Number($(all_clock_user).attr('data-clock')));
        first_clock = transform_clock(first_minute);
        second_clock = transform_clock(first_minute + transition_clock);
    } else {
        let first_active = Number($(all_clock_user).first().attr('data-clock'));
        let second_active = Number($(all_clock_user).last().attr('data-clock'));
        first_clock = transform_clock(transform_minute(first_active));
        second_clock = transform_clock(transform_minute(second_active) + transition_clock);
    }
    result.first = first_clock;
    result.second = second_clock;
    return result;  
}


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



$('.advocate_user_clock').on('click', function() {
    let wrap = $(this).parents('.advocate_user_clock__block');
    $(wrap).find('.advocate_step_hidden_content').toggleClass('step_hidden_content_active');
});

$('.reserve_btn').on('click', function() {
    $('.reserve_hidden_content').toggleClass('reserve_hidden_content_active');
});


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


function transform_clock(date) {
    let current_clock = date;

    let hours = Math.trunc(current_clock / 60);
    let minute = Math.round((current_clock / 60 - hours) * 60);
    let last;
    if (minute <= 9) {
        last = `0${minute}`;
    } else {
        last = minute;
    }
    current_clock = `${hours}.${last}`;

    return current_clock;
}

function transform_minute(date) {
    let current_clock = date;

    let hours = Math.trunc(current_clock) * 60;
    let minute = (current_clock - Math.trunc(current_clock)) * 100;
    
    current_clock = Math.round(hours + minute);

    return current_clock;
}