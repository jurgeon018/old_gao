
    let page = 0;

    hide_step([1,2,4]);





    // 1 - крок з вибором адвоката
    // 2 - крок з вибором дати та часу
    // 3 - крок з вибором часу
    // 4 - крок для всього іншого що внизу
    

    function hide_step(steps) {
        $.each(steps, function(index, value) {
            let step = `.step_${value}`;
            console.log('step: ', step);
            $(step).addClass('step_passive');
        });
    }
    function show_step(steps) {
        $.each(steps, function(index, value) {
            let step = `.step_${value}`;
            $(step).removeClass('step_passive');
        });
    }






$('.delete_user_first_consultation').on('click', function() {
    let url = $(this).attr('data-href');

    fetch(url , {
    method: 'DELETE',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    }) 
    .then(data => {
        return data.json();
    })
    .then(data => {
        console.log('data: ', data);
    });
});


function check_type_cons(props) {
    let current_status;
    // поточні
    if (props == '#profile_4') {
        current_status = ["IN_PROGRESS","UNORDERED"]
    } 
    // архівні
    else if (props == '#profile_5') {
        current_status = ["FINISHED","DECLINED"]
    } 
    return current_status;
}

$('.consultation_link').on('click', function() {
    let type_item = $(this).attr('data-type');
    let wrapper_block = `#${$(this).attr('data-consultation')}`;
    let current_status = JSON.stringify(check_type_cons(wrapper_block));

    page = 0;
    if (type_item == 'client') {
        gen_consultation({
            wrapper: wrapper_block,
            navigate: 'next',
            click_link: true,
            advocat: false,
            status: current_status,
            type: type_item
        });
    } else {
        gen_consultation({
            wrapper: wrapper_block,
            navigate: 'next',
            click_link: true,
            advocat: true,
            status: current_status,
            type: type_item
        });
    }
})

$('.btn_cons_prev').on('click', function() {
    let type_item = $(this).attr('data-type');
    let wrapper_block = `#${$(this).attr('data-consultation')}`;
    let current_status = JSON.stringify(check_type_cons(wrapper_block));

    if (type_item == 'client') {
        gen_consultation({
            wrapper: wrapper_block,
            navigate: 'prev',
            click_link: false,
            advocat: false,
            status: current_status,
            type: type_item
        });
    } else {
        gen_consultation({
            wrapper: wrapper_block,
            navigate: 'prev',
            click_link: false,
            advocat: true,
            status: current_status,
            type: type_item
        });
    }
})
$('.btn_cons_next').on('click', function() {
    let type_item = $(this).attr('data-type');
    let wrapper_block = `#${$(this).attr('data-consultation')}`;
    let current_status = JSON.stringify(check_type_cons(wrapper_block));

    if (type_item == 'client') {
        gen_consultation({
            wrapper: wrapper_block,
            navigate: 'next',
            click_link: false,
            advocat: false,
            status: current_status,
            type: type_item
        });
    } else {
        gen_consultation({
            wrapper: wrapper_block,
            navigate: 'next',
            click_link: false,
            advocat: true,
            status: current_status,
            type: type_item
        });
    }
})

function create_consultation(props) {
    let consultation_item = "";
    $.each(props.results, function(index, value) {
        let current_src;
        if (value.image == null) {
            current_src = `/static/img/about-us/about-img.png`;
        } else {
            current_src = value.image;
        }

        // перевірка файлів адвоката
        let advocat_doc__block = ``;
        if (value.advocat_documents.length >= 1) {
            
            $.each(value.advocat_documents, function(index, doc) {
                advocat_doc__block += `
                <a href="${doc.file}" target='_blank' class="consultation_file standart_title standart_title_4 color_black">
                    document_${doc.file.split('/')[2]}
                </a>
                ` 
            });
        } else {
            advocat_doc__block = `
            <div class="none_files__block standart_title standart_title_4 color_black">
              немає додаткових файлів
            </div>
            ` 
        }
        console.log('advocat_doc__block: ', advocat_doc__block);

         // перевірка файлів клієнта
         let client_doc__block = ``;
         if (value.client_documents.length >= 1) {
             $.each(value.advocat_documents, function(index, doc) {
                 client_doc__block += `
                 <a href="${doc.file}" target='_blank' class="consultation_file standart_title standart_title_4 color_black">
                     document_${doc.file.split('/')[2]}
                 </a>
                 ` 
             });
         } else {
             client_doc__block = `
             <div class="none_files__block standart_title standart_title_4 color_black">
               немає додаткових файлів
             </div>
             ` 
         }

         console.log('client_doc__block: ', client_doc__block);

        let option__block = ``;
        if (props.advocat == true && props.wrap != '#profile_5') {
                option__block = `
                <div title="Відмінити консультацію" class="cancel_this_consultation">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ban" class="svg-inline--fa fa-ban fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"></path></svg>
                </div>
                <div title="Видалити консультацію" class="delete_this_consultation">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                </div>
                ` 
        } else if (props.advocat == true && props.wrap == '#profile_5') {
                option__block = `
                <div title="Видалити консультацію" class="delete_this_consultation">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                </div>
                ` 
        } 
        else if (props.advocat == false && props.wrap != '#profile_5') {
            option__block = `
                <div title="Відмінити консультацію" class="cancel_this_consultation">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ban" class="svg-inline--fa fa-ban fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"></path></svg>
                </div>
            ` 
        } else if (props.advocat == false && props.wrap == '#profile_5') {
            option__block = `` 
        }


        consultation_item += `
        <div data-id="${value.id}" class="consultation_prof">
      <div class="absolute_change__block">
            ${option__block}
      </div>
      <div class="consultation_section consultation_left">
        <div class="advocate_photo">
            <img src="${current_src}" alt="">
        </div>
        <div class="advocate_name main_title main_title_4 color_gold">
            ${value.client_name}
        </div>
        <div class="advocate_subname standart_title standart_title_4 color_black">
            Клієнт
        </div>
        <div class="advocate_type__block">
            <div class="advocate_type_title__block">
                <img src="/static/img/profile/2.svg" alt="">
                <div class="advocate_type_title main_title main_title_4 color_gold">
                    Галузь
                </div>
            </div>
            <div class="advocate_type_work standart_title standart_title_4 color_black">
                ${value.faculty_name}
            </div>
        </div>
        <div class="advocate_name main_title main_title_4 color_gold">
            Статус консультації:
        </div>
        <div class="status_advocate_subname advocate_subname standart_title standart_title_4 color_black">
              ${value.status}
        </div>
      </div>
      <div class="consultation_section consultation_center">
        <div class="consultation_title main_title main_title_4 color_green">
            Інформація по консультації ${value.id}:
        </div>
        <div class="advocate_user_item__block">
            <div class="advocate_user_img">
                <img src="/static/img/profile/2.svg" alt="">
            </div>
            <div class="advocate_user_title standart_title standart_title_4 color_black">
                ${value.date}
            </div>
        </div>
        <div class="advocate_user_item__block">
            <div class="advocate_user_img">
                <img src="/static/img/profile/5.svg" alt="">
            </div>
            <div class="advocate_user_title standart_title standart_title_4 color_black">
                <span>з ${value.start} по ${value.end}.</span>
                <span>
                    консультація -  
                    ${value.full_time.hours} год
                    ${value.full_time.minutes} хв
                </span>
            </div>
        </div>
        <div class="advocate_user_item__block">
            <div class="advocate_user_img">
                <img src="/static/img/profile/7.svg" alt="">
            </div>
            <div class="advocate_user_title main_title main_title_4 color_gold">
                ${value.format}
            </div>
        </div>
        <div class="advocate_user_item__block">
            <div class="advocate_user_img">
                <img src="/static/img/profile/8.svg" alt="">
            </div>
            <div class="advocate_user_title standart_title standart_title_4 color_black">
                <span>Вартість консультації:</span>
                <span class="color_gold">${value.price} грн</span>
            </div>
        </div>
      </div>
      <div class="consultation_section consultation_right">
        <div class="consultation_title main_title main_title_4 color_green">
            Файли адвоката
        </div>
        <div class="consultation_place_scroll">
            <div class="consultation_file__block consultation_place">
                ${advocat_doc__block}
            </div>
        </div>
        <div class="consultation_title main_title main_title_4 color_green">
            Файли клієнта
        </div>
        <div class="info_consultation_scroll">
            <div class="consultation_file__block">
               ${client_doc__block}
            </div>
        </div>
      </div>
    </div>
          
        `;
      });
        
    $(props.container)[0].innerHTML = consultation_item;
    let current_height_block = find_current_height(props.container);
    $('.cancel_this_consultation').on('click', function() {
        let wrap = $(this).parents('.consultation_prof');
        let id = $(wrap).attr('data-id');
        let data_json = {
            status: 'DECLINED'
        }
            fetch(`/api/consultations/${id}/`, {
            method: 'PATCH',
            body: JSON.stringify(data_json),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            })
            .then(data => {
                return data.json();
            })
            .then(data => {
                $(wrap).find('.status_advocate_subname').text(data_json.status);
                generete_modal_text('Консультацію успішно відмінено');
            })       
    });
    $('.delete_this_consultation').on('click', user_delete);
}

function start_animation_consultation(wrap) {
    let consultations = $(wrap).find('.consultation_prof');
         $(consultations).css('left', '0px');
}
function end_animation_consultation(wrap) {
    let consultations = $(wrap).find('.consultation_prof');
        $(consultations).css('left', '-100vw');
}
function find_current_height(props) {
    let first_item = $(props).find('.consultation_prof').first();
    let last_item = $(props).find('.consultation_prof').last();
    let position_first_item = $(first_item).offset().top;
    let position_last_item = $(last_item).offset().top;
    let optional_item_height = $(last_item).height();
    let result = (position_last_item - position_first_item) + optional_item_height + 50;
    console.log('result: ', result);
    return result;
}

function gen_consultation(props) {
    let wrap = $(props.wrapper);
    let container = $(wrap).find('.consultation__block');
    
    
    let next_btn = $(wrap).find('.btn_cons_next');
    let prev_btn = $(wrap).find('.btn_cons_prev');
    if (props.navigate == 'next') {
        page++;
    } else if (props.navigate == 'prev') {
        page--;
    }
    fetch(`/api/consultations/?page_number=${page}&page_size=5&statuses=${props.status}
    `, {
        method: "GET",
      })
      .then((data) => {
        return data.json();
      })
      .then((body) => {
          console.log('body: ', body);
          if (body.next == null) {
              $(next_btn).addClass('btn_cons_passive');
          } else {
            $(next_btn).removeClass('btn_cons_passive');
          }
          if (body.previous == null) {
            $(prev_btn).addClass('btn_cons_passive');
          } else {
            $(prev_btn).removeClass('btn_cons_passive');
          }
          if (body.next == null && body.previous == null) {
              $('.consultation_pagination__block').css('display', 'none');
          } else {
            $('.consultation_pagination__block').css('display', 'flex');
          }
          if (body.results.length == 0) {
            $('.consultation__block').text('консультацій ще немає');
          } else {

            let option_create = {
                'container': container,
                'results': body.results,
                'advocat': props.advocat,
                'type': props.type,
                'wrap': props.wrapper
            }
            if (props.click_link == true) {
                create_consultation(option_create);
                start_animation_consultation(props.wrapper);
            } else {
                end_animation_consultation(props.wrapper);
                setTimeout(() => {
                    create_consultation(option_create);
                    start_animation_consultation(props.wrapper);
                }, 1000);
            }
          }
      });
}


if ($('.advocate_calender_container').length == 1) {
    
  
    $('.status_select').select2({
        minimumResultsForSearch: Infinity,
        selectOnClose: true,
        dropdownAutoWidth: true,
        width: 'resolve',
    });

    $('.status_select').on('select2:select', function (e) {
        $('.load_spin').addClass('load_spin_active');
        // імя - e.params.data.text.replace(/\s/g, '') 
        var data = {
            status: e.params.data.id,
        };
        fetch(`/api/consultations/${$('.advocate_calender_info').attr('data-id')}/`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        })
        .then(data => {
            return data.json();
        })
        .then(data => {
            $('.load_spin').removeClass('load_spin_active');
            generete_modal_text(data.messages[0].text);
           

            if (data.messages[0].status == 'bad') {
                var data = {
                    status: "UNORDERED",
                };
                fetch(`/api/consultations/${$('.advocate_calender_info').attr('data-id')}/`, {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                })
                .then(data => {
                    return data.json();
                })
                .then(data => {
                    console.log('data: ', data);
                    $('.status_select').val('UNORDERED');
                    $('.status_select').trigger('change');
                });
            }
            
        })
    });

    
    $('.communicate_select').select2({
        minimumResultsForSearch: Infinity,
        selectOnClose: true,
        dropdownAutoWidth: true,
        width: 'resolve',
    });

    $('.communicate_select').on('select2:select', function (e) {
        var data = {
            format: e.params.data.id
        };

        fetch(`/api/consultations/${$('.advocate_calender_info').attr('data-id')}/`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        })
        .then(data => {
            return data.json();
        })
        .then(data => {
        
        })
    });


    
    $('.advocate_slick_date__block').slick({
        dots: false,
        infinite: false,
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


     
// якась робота з датами, просто не лізь сюди
function generate_interval(start, end) {
    let dates_start = start.split(':');
    let dates_end = end.split(':');
    let date_start = new Date(2020, 09, 22, dates_start[0], dates_start[1], 05);
    let date_end = new Date(2020, 09, 22, dates_end[0], dates_end[1], 05);
    let diff = date_end.getTime() - date_start.getTime();
    let curent_min = diff / (1000 * 60);
    let interval = Number($('.all_calender__wrapper').attr('data-interval'));
    let result = curent_min / interval
    return result;
}

    create_all_calender(true);

       
           

   function create_calender(consultation) {
    let width_item = consultation.working_hours.length;
    
    $('.advocate_calender_item__block').children().remove();

    let left_position = 100 / width_item;
    // let current_slides = $('.advocate_calender_time__block').find('.slick-active');
    let all_clock_calender = $('.adv_cal_time');
    
    let grid_counter = Number(consultation.hours.length);

    let current_task_width = 0;
    for (let i = 0; i < grid_counter ; i++) {
        let current_margin;
        let item_left;
        let check_active;
        let current_time = [];
        
        $.each(consultation.hours, function(index, value) {
            let current_clockworks = value.start.replace(':', '.');
            
            if (index == i) {
                $.each(all_clock_calender, function(index, sub_value) {
                    if ($(sub_value).attr('data-clock') == current_clockworks) {
                        current_time.push(current_clockworks);
                        current_margin = index;
                    } else {

                    }
                });
                item_left = (left_position * current_margin);

                
                current_task_width = generate_interval(value.start, value.end);
            }
        });
        if (current_time.length == 0) {
            check_active = false;
        } else {
            check_active = true;
        }
        let test_json = {
            current_width: left_position,
            current_transition: current_task_width,
            left: item_left,
            info: consultation.hours[i],
            quantity: width_item,
        }
        if (check_active == true) {
            $('.advocate_calender_item__block')[0].appendChild(create_row_item(test_json));
        }
    }

    function create_row_item(content) {
        
        let advocate_calender_item_prof = document.createElement('div');
        advocate_calender_item_prof.classList.add('advocate_calender_item_prof');
        advocate_calender_item_prof.setAttribute(`data-clockwork`, content.info.start.replace(':', '.'));
    
        let advocate_calender_task = document.createElement('div');
        $(advocate_calender_task).css('left', `${content.left}%`);
        $(advocate_calender_task).css('width', `${(content.current_width * content.current_transition) - 2}%`);
        advocate_calender_task.classList.add('advocate_calender_task');
        advocate_calender_task.setAttribute(`data-id`, content.info.consultation_id);

        advocate_calender_item_prof.appendChild(advocate_calender_task);
    
        for (let i = 0; i < content.quantity; i++) {
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
            $('.advocate_calender_info').addClass('advocate_calender_info_active');


            let wrap = $(this).parents('.advocate_calender_item_prof');
            let table_task = $('.advocate_calender_info');
            let id = Number($(wrap).attr('data-clockwork'));
            let fetch_id = $(this).attr('data-id');
            $(table_task).css('left', '-100%');
            setTimeout(() => {
            $(table_task).css('left', '0');


            fetch(`/api/consultations/${fetch_id}/`, {
                method: "GET",
              })
              .then((data) => {
                return data.json();
              })
              .then((body) => {
                  
                    // зміна айді консультації
                    $('.advocate_calender_info').attr('data-id', fetch_id);
                    // зміна імені
                    $(table_task).find('.advocate_info_name').text(body.client_name);
                        
                    // зміна типу юзера
                    // $(table_task).find('.advocate_info_subname').text(body.type_user);

                    // зміна галузей
                    $('.branch__wrap').children().remove();
                    $.each(body.faculties, function(index, sub_value) {
                        let branch_item = document.createElement('div');
                        branch_item.classList.add('advocate_type_work', 'standart_title', 'standart_title_4', 'color_black');
                        branch_item.textContent = sub_value;
                        $('.branch__wrap')[0].appendChild(branch_item);
                    });

                    // зміна статуса
                            $('.status_select').val(body.status);
                            $('.status_select').trigger('change');
                   

                    // зміна дати
                    $(table_task).find('.advocate_data_user_title').text(body.date);
                    
                    // зміна часу
                    $(table_task).find('.user_date_span').text(`з ${body.start} по ${body.end}.`);
                    
                    // зміна тривалості
                    $(table_task).find('.user_transition_span').text(`консультація -  ${generate_interval(body.start, body.end)} год.`);

                    // зміна комунікації
                    $('.communicate_select').val(body.format);
                    $('.communicate_select').trigger('change');

                    // зміна ціни
                    $(table_task).find('.advocate_price_span').text(`${body.price} грн`);

                    // зміна файлів (клієнт)
                    $('.calender_consultation_file__block').children().remove();
                    $.each(body.client_documents, function(index, sub_value) {
                        let json_file = {
                            file_name: sub_value.file.split('/')[2],
                            file_href: sub_value.file
                        }
                        $('.calender_consultation_file__block')[0].appendChild(create_simple_files(json_file));
                    });
                    // зміна файлів (адвокат)
                    $('.calender_consultation_place').children().remove();
                    $.each(body.advocat_documents, function(index, sub_value) {
                        let json_file = {
                            file_name: sub_value.file.split('/')[2],
                            file_href: sub_value.file
                        }
                        $('.calender_consultation_place')[0].appendChild(create_simple_files(json_file));
                    });
                    // додавання коменту
                    if (body.comment != '') {
                        $('.consultation_comment__block').text(`Коментар: ${body.comment}`);
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
                $(value).css('grid-template-columns', `repeat(${width_item}, 1fr)`);

            }, 200);
        });
   }


   
   
   function create_all_calender(check_calender) {

    let date_advocat = $('.advocate_slick_date_prof_active').attr('data-date');
    let id_advocat = $('.advocat_info_id').attr('data-advocat');

      fetch(`/api/get_hours_info/?date=${date_advocat}&advocat=${id_advocat}`, {
        method: "GET",
      })
      .then((data) => {
        return data.json();
      })
      .then((body) => {
         
          if (body.hours.length == 0) {
              $('.advocate_calender_message_for_advocate').addClass('advocate_calender_message_for_advocate_active');
          } else {
              $('.advocate_calender_message_for_advocate').removeClass('advocate_calender_message_for_advocate_active');
            if (check_calender == true) {
                $('.all_calender__wrapper').css('opacity', '0');
    
                setTimeout(() => {
                    $('.advocate_calender_time__block').children().remove();
    
                      create_time_item(body.working_hours);
                }, 200);
              }
          }

          setTimeout(() => {
            $('.all_calender__wrapper').css('opacity', '1');
          
            
              create_calender(body);
              
          }, 420);
      });  
    

    function create_time_item(content) {
        $('.advocate_calender_time__block').css('grid-template-columns', `repeat(${content.length}, 1fr)`);
        $('.all_calender__wrapper').css('width', `${content.length * 50}px`);
        $('.advocate_calender_item__block').css('width', `${content.length * 50}px`);

        let product_item = "";
        $.each(content, function(index, value) {
            let new_clock = value.hour.replace(':', '.');
            product_item += `
            <div data-clock='${new_clock}' class="adv_cal_time">
                <div class="grid_inner">
                    <div class="grid_content">
                        ${new_clock}
                    </div>
                </div>
            </div>
              
            `;
          });
            
        $(".advocate_calender_time__block")[0].innerHTML = product_item;
    }

    // let new_prof = $('.adv_cal_time');

        // $.each(new_prof, function(index, value) {
        //     setTimeout(() => {
        //         $(value).css('top', '0px');
        //         $(value).css('max-height', '1000px');
        //     }, 200);
        // });
      
    
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
           
        });
        setTimeout(() => {
            
            create_all_calender(true);
        }, 400);

    });

    $('.advocate_time_arrow').on('click', function() {

        let old_prof = $('.advocate_calender_item__block').find('.advocate_calender_item_prof');

        $.each(old_prof, function(index, value) {
            setTimeout(() => {
                $(value).css('top', '-1000px');
                $(value).css('max-height', '0px');
            }, 200);
            setTimeout(() => {
                create_all_calender(false);
            }, 400);
        });

    });



    

}
// блочок який лиш для адвокатів закінчується




$('.save_data_practise_btn').on('click', function() {
    
});

function get_fetch_for_active_practise() {
    let wrap = $('.advocate_practise_content__block');
    let id_advocat = $('.advocat_info_id').attr('data-advocat');
    let active_practise = $(wrap).find('.advocate_download_prof');
    let array_practise = [];

    $.each(active_practise, function(index, value) {
        let id = $(value).find('.advocate_download_name').attr('data-id');
       array_practise.push(id);
    });

    let json = {
        advocat_id: id_advocat,
        faculty_ids: array_practise
    }

     fetch('/api/set_advocate_faculties/', {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    })
    .then(data => {
        return data.json();
    })
    .then(data => {
       
    })
}


$('.file_photo').on('change', function() {
    let info = return_info_users();
    let Formdata = new FormData();
    let fileData = this.files[0];
    
    
    Formdata.append(`image`, fileData);
   
        fetch(`/api/users/${info.result_client}/`, {
        method: 'PATCH',
        body: Formdata,
        })
        .then(data => {
            return data.json();
        })
        .then(data => {
          $('.photo_advocate').attr('src', data.image)
        })
});


$('.check_star_btn').on('click', function() {
    let wrap = $(this).parents('.consultation_prof');
    let consultation_id = $(wrap).attr('data-id');
    let star_value = Number($(this).attr('data-value'));
    let data_json = {
        mark: star_value
    }
    
        fetch(`/api/consultations/${consultation_id}/`, {
        method: 'PATCH',
        body: JSON.stringify(data_json),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        })
        .then(data => {
            return data.json();
        })
        .then(data => {
        
        })
});

$('.delete_this_consultation').on('click', user_delete);
   
function user_delete() {
    $.fancybox.open({
        src: '#modal_delete_consultation',
        touch: false,
    }); 

    let id = $(this).parents('.consultation_prof').attr('data-id');
    $('#modal_delete_consultation').attr('data-id', id);
}

$('.user_cancel').on('click', function() {
    $.fancybox.close({
        src: '#modal_delete_consultation',
    }); 
});
$('.user_acceses').on('click', function() {
    let wrap = $('#tab_33');
    let click_id = $(this).parents('#modal_delete_consultation').attr('data-id');
    fetch(`/api/consultations/${click_id}/`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        });
       
        let all_users = $(wrap).find('.consultation_prof');
    
        $.each(all_users,function(index,value){
            
              if ($(value).attr('data-id') == click_id) {
                
                $(value).remove();
                
            }
          });
        $.fancybox.close({
            src: '#modal_delete_user',
        }); 
        generete_modal_text('Консультацію успішно видалено');
});



function generete_modal_text(text) {
    $.fancybox.open({
        src: '#change_status_in_consultation',
        touch: false,
    }); 
    setTimeout(() => {
        $.fancybox.close({
            src: '#change_status_in_consultation',
        }); 
    }, 2000);
    $('.change_status_in_consultation_text').text(text);
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

function remove_active_block(wrap) {
    let parents = $(wrap);
    $(parents).removeClass('step_select_active');
    $(parents).find('.step_active_content').text('');      
}
function generate_practise(id) {
    
    let url;
    if (id == undefined) {
        url = '/api/faculties/'
    } else {
        url = `/api/faculties/?advocat_id=${id}`
    }
    fetch(url, {
        method: "GET",
      })
      .then((data) => {
        return data.json();
      })
      .then((body) => {
          create_all_doc_for_client('.practise_step_hidden_content', body);
      });    
      
        remove_active_block('.pract_step_select');
}
function generate_advocate(id) {
    let url;
    if (id == undefined) {
        // url = '/api/users/?role=advocat';

        $('.hidden_message').text('');
    } else {
        $('.hidden_message').text('');
        url = `/api/users/?faculty_ids=[${id}]`;

        fetch(url, {
            method: "GET",
          })
          .then((data) => {
            return data.json();
          })
          .then((body) => {
                hide_step([1,2,3,4]);
                show_step([1]);
              if (body.length == 0) {
                hide_step([1]);
                $('.hidden_message').text('По данній галузі адвокатів не знайдено');
              }
              let new_body = [];
              $.each(body, function(index, value) {
                new_body.push({
                    id: value.id,
                    name: value.username,
                    image: value.image
                })
              });
              create_all_doc_for_client('.client_select_step_hidden_content', new_body);
              
              remove_active_block('.advoc_step_select');
          });     
    }
    
}
if ($('.practise_step_hidden_content').length >= 1) {
    generate_practise();
    generate_advocate();
}

   
function create_all_doc_for_client(wrap, json) {
    $(wrap).children().remove();
    $.each(json, function(index, value) {
        $(wrap)[0].appendChild(create_doc(value));
    });
}

function create_doc(content) {
    let current_src;
    if (content.image == null) {
        current_src = `/static/img/about-us/about-img.png`;
    } else {
        current_src = content.image;
    }
    let doc_item = document.createElement('div');
    doc_item.setAttribute(`data-title`, content.name);
    doc_item.setAttribute(`data-id`, content.id);
    doc_item.setAttribute(`data-image`, current_src);
    doc_item.classList.add('step_select_text', 'standart_title', 'standart_title_2', 'color_black');
    doc_item.textContent = content.name;

    $(doc_item).on('click', click_select_item);
    return doc_item;
}


function click_select_item() {
    let wrap = $(this).parents('.step_select');
    let data = $(this).attr('data-title');
    let image_url = $(this).attr('data-image');
    let data_id = $(this).attr('data-id');
    $(wrap).find('.step_select_text').removeClass('step_select_text_active');
    $(this).addClass('step_select_text_active');
    $(wrap).find('.step_active_content').text(data);
    $(wrap).addClass('step_select_active');
    $(wrap).find('.step_hidden_content').removeClass('step_hidden_content_active');
    $(wrap).removeClass('step_select_open');

    let checker = $(this).parents()[0];
    
    // практики
    if ($(checker).hasClass('practise_step_hidden_content')) {
        $('.pract_step_select').find('.step_active_content').attr('data-id', $(this).attr('data-id'));
        generate_advocate(data_id);
        $('.user_advocate_type_work').text(data);
        $('.user_advocate_name').text('Оберіть адвоката');

        // create_all_doc_for_client('.client_select_step_hidden_content', test1);
        var datepicker = $('#datapicker_user').datepicker().data('datepicker');
        datepicker.destroy();
        $('.advocate_select_date').find('.step_select').removeClass('step_select_active');
        $('.advocate_select_time').find('.step_select').removeClass('step_select_active');
        
    }
    // адвокати
    else if ($(checker).hasClass('client_select_step_hidden_content')) {
        $('.user_advocate_name').text(data);
        $('.advoc_step_select').find('.step_active_content').attr('data-id', $(this).attr('data-id'));
        let date_js = new Date();
        let date_month = date_js.getMonth() + 1;
        let date_year = date_js.getFullYear();
        let date_client = $('.client_info_id').attr('data-client');
        let date_advocat = data_id;
        
        let advocat_days_json = {
            year: date_year,
            month: date_month,
            advocat: date_advocat,
            client: date_client,
        }
        fetch_get_data_user_calender(advocat_days_json);

        // generate_practise(data_id);
        // create_all_doc_for_client('.practise_step_hidden_content', test2);

        $('.advocate_select_date').find('.step_select').removeClass('step_select_active');
        $('.advocate_select_time').find('.step_select').removeClass('step_select_active');
        $('.advocate_photo').find('img').attr('src', image_url);

        show_step([2]);
    }


};

function fetch_get_data_user_calender(content) {
    if ($('.advocate_select_date').length >= 1) {
        $('.advocate_select_date').css('opacity', '0.3');
        $('.load_message__block').text('Календар загружається...');
    }
    let url = `/api/get_days_info/?year=${content.year}&month=${content.month}&advocat=${content.advocat}&client=${content.client}`;
      fetch(url, {
        method: "GET",
      })
      .then((data) => {
        return data.json();
      })
      .then((body) => {
          
        let datepicker = $('#datapicker_user').datepicker().data('datepicker');
        let months_items = ['january','feburary','March','April','May','June','July','August','September', 'October', 'November','December'];
        let weekenddDays = [0, 6];
        // reserve - повністю зайнятий
        let reserve = [];
        
        // busy - напів зайнятий
        let busy = [];
        
        // статуси 
        // blocked - зайнятий 
        // rest - зайнятий
        // partly_busy - напів зайнятий
        // free - вільний
        // unknows - вільний

        $.each(body.days, function(index, value) {
            if (value.status == 'blocked' || value.status == 'rest') {
                reserve.push(find_month(value.day));
            } else 
            if (value.status == 'partly_busy') {
                busy.push(find_month(value.day));
            }
        });
       
        datepicker.destroy();
        create_client_calender(weekenddDays, reserve, busy, months_items);

        if ($('.advocate_select_date').length >= 1) {
            $('.advocate_select_date').css('opacity', '1');
            $('.load_message__block').text('');
        }
      }); 
}

function find_month(value) {
    const dates = value.split('-');
    let current_date;
    let current_year = dates[0];
    let current_month;
    let current_day = dates[2];
    if (dates[1] == '01') {
        current_month = 'january';
    } else if (dates[1] == '02') {
        current_month = 'feburary';
    } else if (dates[1] == '03') {
        current_month = 'March';
    } else if (dates[1] == '04') {
        current_month = 'April';
    } else if (dates[1] == '05') {
        current_month = 'May';
    } else if (dates[1] == '06') {
        current_month = 'June';
    } else if (dates[1] == '07') {
        current_month = 'July';
    } else if (dates[1] == '08') {
        current_month = 'August';
    } else if (dates[1] == '09') {
        current_month = 'September';
    } else if (dates[1] == '10') {
        current_month = 'October';
    } else if (dates[1] == '11') {
        current_month = 'November';
    } else if (dates[1] == '12') {
        current_month = 'December';
    }     
    current_date = `${current_day}-${current_month}-${current_year}`;
    return current_date;               
}

$('.docs_title_btn').on('click', function() {
    let wrap = $(this).parents('.docs__wrap');
    $(wrap).toggleClass('docs__wrap_active');
});

if ($('.advocate_user_input__block').length >= 1) {
        // var datepicker = $('#datapicker_user').datepicker().data('datepicker');
        // datepicker.destroy();
        // var weekenddDays = [0, 6];
        // var reserve = ["20-August-2020", "21-August-2020"];
        // var busy = ["25-August-2020", "27-August-2020"];
        // var months_items = ['january','feburary','March','April','May','June','July','August','September','October','November','December'];
        // create_client_calender(weekenddDays, reserve, busy, months_items);


        let date_js = new Date();
        let date_month = date_js.getMonth() + 1;
        let date_year = date_js.getFullYear();
        let date_client = $('.advocat_info_id').attr('data-advocat');
        let date_advocat = date_client;
        
        let advocat_days_json = {
            year: date_year,
            month: date_month,
            advocat: date_advocat,
            client: date_client,
        }
        fetch_get_data_user_calender(advocat_days_json);
       
}

function create_load_item() {
    let load_div = document.createElement('div');
    load_div.classList.add('load_calender');

    let load_img = document.createElement('img');
    load_img.setAttribute(`src`, `/static/img/712.svg`);

    load_div.appendChild(load_img);

    return load_div;
}

function create_clockwork_client(content) {
    let step_date_prof = document.createElement('div');
    step_date_prof.setAttribute(`data-index`, content.is_index);

    if (content.is_free == true) {
        step_date_prof.classList.add('step_date_prof', 'button_transparent');
    } else {
        step_date_prof.classList.add('step_date_prof', 'button_transparent', 'step_date_prof_passive');
    }
    step_date_prof.setAttribute(`data-clock`, transform_clock(content.hours));
    step_date_prof.textContent = transform_clock(content.hours);

    $(step_date_prof).on('click', add_clockwork);
    $(step_date_prof).on('mouseover', hover_clock);
    return step_date_prof;
}


function return_current_date(date) {
    let current_month = date.getMonth() + 1;
    let date_year = date.getFullYear();
    let date_month = ((current_month<10)?'0':'')+current_month;
    let date_day = ((date.getDate()<10)?'0':'')+date.getDate();
    let result = `${date_year}-${date_month}-${date_day}`;
    return result;
}
function update_datepicker(disabledDays, reserved_days, busy_days, months) {
    var datepicker = $('#datapicker_user').datepicker().data('datepicker');
    // datepicker.update({
    $('#datapicker_user').datepicker({
        onRenderCell: function(date, cellType) {
            var currentDate = date.getDate();
            var myDate = return_current_date(date);
           
            if (reserved_days.indexOf(myDate) != -1){
                return {
                    classes: 'disable_day',
                    disabled: true
                }
            }
            if (busy_days.indexOf(myDate) != -1){
                return {
                    classes: 'busy_day',
                    disabled: false,
                    html: currentDate + '<span class="dp-note"></span>'
                }
            }
        },
    })
    
        $('.load_calender').removeClass('load_calender_active');
}
    

function create_client_calender(disabledDays, reserved_days, busy_days, months) {
    var myDatepicker = $('#datapicker_user').datepicker({
        moveToOtherMonthsOnSelect: false,
        multipleDates: false,
        showOtherMonths: false,
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
            }
            //    else if (cellType == 'day') {
            //         var day = date.getDay(),
            //         isDisabled = disabledDays.indexOf(day) != -1;
    
            //     return {
            //         disabled: isDisabled
            //     }
            // } 
            else {
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
            $('.advocate_user_date').attr('data-date', formattedDate);
            $('.step_access').text('0');
            $('.current_clock_num').text(0);
            $('.all_price_consultation').text(0);
            $('.advocate_select_date').find('.step_select').addClass('step_select_active');
            $('.advocate_select_time').find('.step_select').removeClass('step_select_active');
    


            
            create_clockwork_items();
            

         
            
        },
        onChangeMonth: function(date_month, date_year) {
            $('.load_calender').addClass('load_calender_active');

                let date_client = $('.client_info_id').attr('data-client');
                let date_advocat = $('.advoc_step_select').find('.step_active_content').attr('data-id');
                let info = return_info_users();
                
                let url = `/api/get_days_info/?year=${date_year}&month=${date_month + 1}&advocat=${info.result_advocate}&client=${info.result_client}`;
                fetch(url, {
                  method: "GET",
                })
                .then((data) => {
                  return data.json();
                })
                .then((body) => {
                  let datepicker = $('#datapicker_user').datepicker().data('datepicker');
                  let months_items = ['january','feburary','March','April','May','June','July','August','September', 'October', 'November','December'];
                  let weekenddDays = [0, 6];
                  // reserve - повністю зайнятий
                  let reserve = [];
                  
                  
                  // busy - напів зайнятий
                  let busy = [];
                  
                  
                  // статуси 
                  // blocked - зайнятий 
                  // rest - зайнятий
                  // partly_busy - напів зайнятий
                  // free - вільний
                  // unknows - вільний
          
                  $.each(body.days, function(index, value) {
                      if (value.status == 'blocked' || value.status == 'rest') {
                          reserve.push(value.day);
                          
                      } else 
                      if (value.status == 'partly_busy') {
                          busy.push(value.day);
                      }
                  });
    
                  update_datepicker(weekenddDays, reserve, busy, months_items);
                });
        },
     });

     setTimeout(() => {
        $('.datepicker')[0].appendChild(create_load_item());
    }, 1000);
}

function return_info_users() {
    let client;
    let advocate;
    let current_date;
    
    if ($('.reserve_hidden_content').length >= 1) {
        current_date = $('.datapicker_user').val();
        client = $('.advocat_info_id').attr('data-advocat');
        advocate = $('.advocat_info_id').attr('data-advocat');
    } else {
        current_date = replasor_text();
        client = $('.client_info_id').attr('data-client');
        advocate = $('.advoc_step_select').find('.step_active_content').attr('data-id');
    }
    let result = {
        result_client: client,
        result_advocate: advocate,
        result_current_date: current_date,
    }
    return result;
}
function create_clockwork_items() {
    let info = return_info_users();
    fetch(`/api/get_hours_info/?date=${info.result_current_date}&advocat=${info.result_advocate}&client=${info.result_client}`, {
        method: "GET",
      })
      .then((data) => {
        return data.json();
      })
      .then((body) => {
          if ($('.step_3').length >= 1) {
            show_step([3]);
          }
          $('.step_date__wrap').children().remove();

          $.each(body.working_hours, function(index, value) {
              let delete_space = value.hour.replace(/\s+/g, '');
              let words = delete_space.split(':');
              let date = new Date(0, 0, 0, words[0], words[1], 0);
              let current_clock_json = {
                 hours: date.getHours() * 60 + date.getMinutes(),
                 is_free: value.is_free,
                 is_index: index,
              }
            //   if (current_clock_json.hours <= 360) {
            //     //   в цей час потрібно спати, а не працювати
            //   } else {
                $('.step_date__wrap')[0].appendChild(create_clockwork_client(current_clock_json));
            //   }
                
          });
      });   
    }
 
function replasor_text() {
    let client_date = $('.advocate_user_date').text();
    let delete_space = client_date.replace(/\s+/g, '');
    let words_date = delete_space.split('.');
    let current_date = `${words_date[1]}.${words_date[2]}.${words_date[3]}`;
    return current_date;
}

$('.data_step_select_btn').on('click', function() {
    if ($(this).hasClass('visible')) {
        $('#datapicker_user').hide();
    } else {
        $('#datapicker_user').show();
    }
    

    $(this).toggleClass('visible');
})


// додавання файлів адвокатом для клієнта в його консультацію
$('.consultation_advocate_doc_btn').on('change', function() {
    let file_create = $('#consultation_advocate_doc_btn')[0];
    let Formdata = new FormData();
    let files = file_create.files;
    let id_sonsultation = $(this).parents('.advocate_calender_info_active').attr('data-id');
    let info = return_info_users();
    Formdata.append(`author`, info.result_client);
    Formdata.append(`consultation`, id_sonsultation);

    $.each(files, function(i, file){
        Formdata.append(`file`, file);
        let json_file = {
            file_name: file.name,
            file_href: '#'
        }
        $('.consultation_place')[0].appendChild(create_simple_files(json_file));

        fetch('/api/consultation_documents/', {
            method: 'POST',
            body: Formdata,
        })
        .then(data => {
            return data.json();
        })
        .then(data => {
         
        })
    });

   
});

let create_simple_files = (content) => {
    let doc_profile = document.createElement('a');
        doc_profile.classList.add('doc-profile');
        doc_profile.setAttribute(`href`, content.file_href);
        doc_profile.setAttribute(`target`, '_blank');


    // let doc_img = document.createElement('img');
    // doc_img.classList.add('doc-img');
    // doc_img.setAttribute(`src`, '/static/img/doc.svg');

    let doc__title = document.createElement('div');
    doc__title.classList.add('doc__title');
    doc__title.textContent = content.file_name;

    doc_profile.appendChild(doc__title);

    return doc_profile;
}

// додавання файлів адвокатом
$('.advocate_doc_add_btn').on('change', function() {
    let file_create = $('#advocate_doc_add_btn')[0];
    let Formdata = new FormData();
    let files = file_create.files;
    let info = return_info_users();
    Formdata.append(`user`, info.result_client);

    $.each(files, function(i, file){
        Formdata.append(`file[${i}]`, file);
        $('.doc-block')[0].appendChild(create_advocate_files(file));
    });

    fetch('/api/add_document/', {
        method: 'POST',
        body: Formdata,
    })
    .then(data => {
        return data.json();
    })
    .then(data => {
     
    })
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



$('.pseudo_btn').click(function(e) {
	e.preventDefault();
  var nb_attachments = $('form input').length;
  var $input = $('<input type="file" name=attachment-' + nb_attachments + '>');
  $input.on('change', function(evt) {
    var f = evt.target.files[0];
    let value_object = {
        input: $(this),
        name: f.name
    }
    $('.advocate_download__block')[0].appendChild(create_client_files(value_object));
  });
  $input.hide();
  $input.trigger('click');
});




// додавання файлів клієнтом
$('.input_user_file').on('change', function() {
    
    // let fileData = this.files;
    // 

    // let Formdata = new FormData();
    // jQuery.each(fileData, function(i, file) {
    //     Formdata.append(`document[${i}]`, file);
    //     
    // });
    // formData.delete(name) – удаляет поле с заданным именем name,


    // fetch('/test/', {
    //     method: 'POST',
    //     body: Formdata,
    // })
    // .then(data => {
    //     return data.json();
    // })
    // .then(data => {
     
    // })

    // let file_create = $('#input_user_file')[0];
    // let files = file_create.files;
    // if (files.length == 1) {
    //     $('.new_files_info').text(`${files.length} новий файл`);
    // } else {
    //     $('.new_files_info').text(`${files.length} нових файлів`);
    // }
    // $('.new_files_users').children().remove();

    // $.each(files, function(index, value ){
    //     $('.new_files_users')[0].appendChild(create_client_files(value));
    // });
});


let create_client_files = (content) => {
    
    let advocate_download_prof = document.createElement('div');
        advocate_download_prof.classList.add('advocate_download_prof', 'new_advocate_download_prof');

    let advocate_download_name = document.createElement('div');
    advocate_download_name.classList.add('advocate_download_name', 'main_title', 'main_title_4', 'color_gold');
    advocate_download_name.textContent = content.name;
    

    let svg_span = document.createElement('span');
    svg_span.classList.add('advocate_download_close');

    svg_span.innerHTML = `
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
            <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">
            </path>
        </svg>
    `;
    $(svg_span).on('click', delete_file);

    $(advocate_download_prof).append($(content.input));
    advocate_download_prof.appendChild(advocate_download_name);
    advocate_download_prof.appendChild(svg_span);

    
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
    $(wrap).toggleClass('step_select_open');
    let current_practise = $('.advocate_practise_content__block').find('.advocate_download_prof');
    let all_practise = $('.step_hidden_content').find('.step_select_radio');
        $.each(all_practise, function(index, all_value) {
            $.each(current_practise, function(index, current_value) {
                if ($(all_value).attr('data-id') == $(current_value).find('.advocate_download_name').attr('data-id')) {
                    $(all_value).addClass('step_select_text_active');
                }
            });
        });
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
    let id = $(wrap).find('.advocate_download_name').attr('data-id');
    $(wrap).css('max-height', '0px');
    $(wrap).css('left', '-100%');

    let current_practise = $('.step_hidden_content').find('.step_select_radio');
        $.each(current_practise, function(index, value) {
            if ($(value).attr('data-id') == id) {
                $(value).removeClass('step_select_text_active');
            }
        });


    setTimeout(() => {
        $(wrap).remove();

        get_fetch_for_active_practise();
    }, 200);

}



$('.submit_wrapper').on('click', function() {
    check_user_valid();
})
$('.submit_user_order').on('click', function() {
    $('.load_spin').addClass('load_spin_active');
    let all_order_vars = create_obgect_order();
    append_form_data(all_order_vars);
    fetch_order(all_order_vars);
    
});

function create_obgect_order() {

    let object = {
        Formdata: new FormData(),
        client: $('.client_info_id').attr('data-client'),
        practise: $('.pract_step_select').find('.step_active_content').attr('data-id'),
        advocate: $('.advoc_step_select').find('.step_active_content').attr('data-id'),
        date: $('.advocate_user_date').attr('data-date'),
        clock_first: $('.clock_manager_first').attr('data-result').replace('.', ':'),
        clock_last: $('.clock_manager_second').attr('data-result').replace('.', ':'),
        url: $('.user_order_of_advocate').attr('action'),
        csrftoken: $('.hidden_wrap_inp').find('input').val(),
        file_array: $('.new_advocate_download_prof').find('input')
    }
    return object;
}
function append_form_data(all_order_vars) {
    jQuery.each(all_order_vars.file_array, function(i, file) {
        let fileData = file.files[0];
        all_order_vars.Formdata.append(`document[${i}]`, fileData);
    });

    all_order_vars.Formdata.append(`client`, all_order_vars.client);
    all_order_vars.Formdata.append(`faculty`, all_order_vars.practise);
    all_order_vars.Formdata.append(`advocat`, all_order_vars.advocate);
    all_order_vars.Formdata.append(`date`, all_order_vars.date);
    all_order_vars.Formdata.append(`start`, all_order_vars.clock_first);
    all_order_vars.Formdata.append(`end`, all_order_vars.clock_last);
    all_order_vars.Formdata.append(`csrftoken`, all_order_vars.csrftoken);
    
    if (all_order_vars.comment != undefined) {
        all_order_vars.Formdata.append(`comment`, all_order_vars.comment); 
    }
        
}
function fetch_order(content) {
    fetch(content.url, {
        method: 'POST',
        body: content.Formdata,
    })
    .then(data => {
        return data.json();
    })
    .then(data => {
        
        if ($('.reserve_hidden_content').length >= 1) {
            create_all_calender(true);
        } else {
            $('.load_spin').removeClass('load_spin_active');
            let redirect = $('.submit_user_order').attr('data-redirect');
            window.location = redirect;
        }

        alert(data.messages[0].text);
    })
}
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
            
            $('.sumbit_content_error').text('');
            $('.submit_wrapper').removeClass('submit_wrapper_error');
        } else {
            $('.submit_wrapper').addClass('submit_wrapper_error');
        }
    });
}

$('.step_date_prof').on('click', add_clockwork);

function add_clockwork() {
    let prepare_second_click = $('.second_mark').attr('data-index');
    $(this).toggleClass('step_date_prof_active');

    // якщо перед кліком не було активної години то додає якір для початкової години
    if ($('.step_date_prof_active').length == 1) {
        $('.step_date_prof').removeClass('first_mark');
        $('.step_date_prof').removeClass('second_mark');
        $('.step_date_prof').removeClass('step_date_prof_is_hover');
        $(this).addClass('first_mark');
        
    } else if ($('.step_date_prof_active').length == 2) {
        let all_clockwork = $('.step_date_prof');
        $(this).addClass('second_mark');
        let first_index = Number($('.first_mark').attr('data-index'));
        let second_index = Number($('.second_mark').attr('data-index'));
        let current_index = Number($(this).attr('data-index'));
            
        $.each(all_clockwork, function(index, value) {
            if (index > first_index && index < second_index || index < first_index && index > second_index) {
                $(value).addClass('step_date_prof_active');
                if ($(value).hasClass('step_date_prof_passive')) {
                    $('.step_date_prof').removeClass('first_mark');
                    $('.step_date_prof').removeClass('second_mark');
                    $('.step_date_prof').removeClass('step_date_prof_active');
                    generete_modal_text('Між цими годинами вже є зайнята година адвоката, будь ласка оберіть інший період');
                    return false;
                }
            }
        });
        
       
          // перевірка чи юзер клікнув на середню активну годину
          if (first_index < second_index && prepare_second_click != undefined) {
            if (current_index == first_index + 1) {
                $('.step_date_prof').removeClass('first_mark');
                $('.step_date_prof').removeClass('second_mark');
                $('.step_date_prof').removeClass('step_date_prof_active');
                $('.step_date_prof').removeClass('step_date_prof_is_hover');
                $(this).addClass('step_date_prof_active');
                $(this).addClass('first_mark');
                return false;
            } 
            } else if (first_index > second_index && prepare_second_click != undefined) {
                if (current_index == first_index - 1) {
                    $('.step_date_prof').removeClass('first_mark');
                    $('.step_date_prof').removeClass('second_mark');
                    $('.step_date_prof').removeClass('step_date_prof_active');
                    $('.step_date_prof').removeClass('step_date_prof_is_hover');
                    $(this).addClass('step_date_prof_active');
                    $(this).addClass('first_mark');
                    return false;
                }  
            } 

            

    } else if ($('.step_date_prof_active').length == 0 || $('.step_date_prof_active').length >= 3) {
        $('.step_date_prof').removeClass('first_mark');
        $('.step_date_prof').removeClass('second_mark');
        $('.step_date_prof').removeClass('step_date_prof_active');
        $('.step_date_prof').removeClass('step_date_prof_is_hover');
        $(this).addClass('step_date_prof_active');
        $(this).addClass('first_mark');
        
    } 


    let attr = Number($(this).parents('.step_date__wrap').attr('data-transition'));
    let current_clock = Number($(this).parents('.step_date__block').find('.step_date__wrap').find('.step_date_prof_active').length);
    $('.step_access').text(transform_clock(current_clock * attr));

    if ($('.step_date_prof_active').length == 0) {
        cancel_clock();
    } else if ($('.step_date_prof_active').length >= 1) {
        accept_clock();
    }
}


function accept_clock() {
      // якщо все ок проводить обрахунки
      if ($('.reserve_hidden_content').length >= 1) {
        let result_clock = find_order_clock();
        $('.first_advocate_user_clock').text(result_clock.first);
        $('.first_advocate_user_clock').attr('data-clock', result_clock.first);
        $('.second_advocate_user_clock').text(result_clock.second);
        $('.second_advocate_user_clock').attr('data-clock', result_clock.second);
        $('.advocate_step_hidden_content').removeClass('step_hidden_content_active');
    } else {
        let current_clock = transform_minute(Number($('.step_access').text()));
        console.log('current_clock: ', current_clock);
        // if (current_clock == 0) {
        //     $('.step_access').css('border', '1px solid red');
        //     $('.advocate_select_time').find('.step_select').removeClass('step_select_active');
        //     check_user_valid();
        //     $('.all_price_consultation').text(0);
        //     hide_step([4]);
        // } else {
            let current_cost = Number($('.all_price_consultation').attr('data-advocate-cost'));
            console.log('current_cost: ', current_cost);
            let duration = Number($('.all_price_consultation').attr('data-advocate_duration_cost'));
            console.log('duration: ', duration);
            let current_sum = current_cost / duration;
            console.log('current_sum: ', current_sum);
            let sum = current_sum * current_clock;
            console.log('sum: ', sum);
    
            $('.advocate_select_time').find('.step_select').addClass('step_select_active');
            $('.current_clock_num').text(transform_clock(current_clock));
            $('.all_price_consultation').attr('data-price', sum);
            
            let result_clock = find_order_clock();
            
            $('.clock_manager_first').text(`з ${result_clock.first}`);
            $('.clock_manager_first').attr(`data-result`, result_clock.first);
            $('.clock_manager_second').text(`по ${result_clock.second}`);
            $('.clock_manager_second').attr(`data-result`, result_clock.second);
            $('.all_price_consultation').text(sum);
            // counter_num('.all_price_consultation', 1000, sum);
            check_user_valid();
            show_step([4]);
        // }
    }
}
function cancel_clock() {
    if ($('.reserve_hidden_content').length >= 1) {
        $('.first_advocate_user_clock').text('');
        $('.second_advocate_user_clock').text('');
        $('.advocate_step_hidden_content').removeClass('step_hidden_content_active');
    } else {
            $('.step_access').css('border', '1px solid #D2A351');
            $('.advocate_select_time').find('.step_select').removeClass('step_select_active');
            $('.current_clock_num').text('0');
            $('.clock_manager_first').text(``);
            $('.clock_manager_second').text(``);
            $('.all_price_consultation').text(0);
            check_user_valid();
            hide_step([4]);
    } 
}


function hover_clock() {
    if ($('.first_mark').length == 1 && $('.second_mark').length == 0) {
        let all_clockwork = $('.step_date_prof');
        let mark_index = Number($('.first_mark').attr('data-index'));
        let this_index = Number($(this).attr('data-index'));
        
        $.each(all_clockwork, function(index, value) {
            
            if (index < this_index && index > mark_index || index > this_index && index < mark_index) {
                $(value).addClass('step_date_prof_is_hover');
            } else {
                $(value).removeClass('step_date_prof_is_hover');
            }
        });
        
    }
}

$('.save_reserve_date_btn').on('click', function() {
    let date_value = $('.datapicker_user').val();
    
    let first_clock = $('.first_advocate_user_clock').attr('data-clock');
    let second_clock = $('.second_advocate_user_clock').attr('data-clock');

    if (date_value == '') {
        $('.error_reserve').text('Вкажіть дату');
    } else if (first_clock == '0' && second_clock == '0') {
        $('.error_reserve').text('Вкажіть час');
    } else {
        $('.error_reserve').text('');

       
       

        fetch(`/api/faculties/`, {
            method: "GET",
          })
          .then((data) => {
            return data.json();
          })
          .then((body) => {
            let object = {
                Formdata: new FormData(),
                client: $('.advocat_info_id').attr('data-advocat'),
                practise: body[0].id,
                advocate: $('.advocat_info_id').attr('data-advocat'),
                date: $('.datapicker_user').val(),
                clock_first: $('.first_advocate_user_clock').attr('data-clock').replace('.', ':'),
                clock_last: $('.second_advocate_user_clock').attr('data-clock').replace('.', ':'),
                url: '/api/consultations/',
                csrftoken: $('.hidden_wrap_inp').find('input').val(),
                comment: $('.advocate_user_comment__block').find('textarea').val()
                
            }
              append_form_data(object);
              fetch_order(object);
              create_clockwork_items();
          })

        function append_form_data(all_order_vars) {
            jQuery.each(all_order_vars.file_array, function(i, file) {
                let fileData = file.files[0];
                all_order_vars.Formdata.append(`document[${i}]`, fileData);
            });
        
            all_order_vars.Formdata.append(`client`, all_order_vars.client);
            all_order_vars.Formdata.append(`faculty`, all_order_vars.practise);
            all_order_vars.Formdata.append(`advocat`, all_order_vars.advocate);
            all_order_vars.Formdata.append(`date`, all_order_vars.date);
            all_order_vars.Formdata.append(`start`, all_order_vars.clock_first);
            all_order_vars.Formdata.append(`end`, all_order_vars.clock_last);
            all_order_vars.Formdata.append(`csrftoken`, all_order_vars.csrftoken);
            if (all_order_vars.comment != undefined) {
                all_order_vars.Formdata.append(`comment`, all_order_vars.comment);
            }
        }
    }
})
$('.step_access_btn').on('click', function() {
    // if ($(this).hasClass('step_advocate_btn')) {
        
    //         let result_clock = find_order_clock();
            
    //         $('.first_advocate_user_clock').text(result_clock.first);
    //         $('.first_advocate_user_clock').attr('data-clock', result_clock.first);
    //         $('.second_advocate_user_clock').text(result_clock.second);
    //         $('.second_advocate_user_clock').attr('data-clock', result_clock.second);

    //     $('.advocate_step_hidden_content').removeClass('step_hidden_content_active');
    // } else {
    //     let current_clock = transform_minute(Number($('.step_access').text()));
    //     if (current_clock == 0) {
    //         $('.step_access').css('border', '1px solid red');
    //         $('.advocate_select_time').find('.step_select').removeClass('step_select_active');
    //         check_user_valid();
    //         $('.all_price_consultation').text(0);
    //         hide_step([4]);
    //     } else {
    //         $('.step_access').css('border', '1px solid #D2A351');
    
    //         let current_cost = Number($('.all_price_consultation').attr('data-advocate-cost'));
    //         let duration = Number($('.all_price_consultation').attr('data-advocate_duration_cost'));
    
    //         let current_sum = current_cost / duration;
    //         let sum = current_sum * current_clock;
    
    //         $('.advocate_select_time').find('.step_select').addClass('step_select_active');
    //         $('.current_clock_num').text(transform_clock(current_clock));
    //         $('.all_price_consultation').attr('data-price', sum);
            
    //         let result_clock = find_order_clock();
            
    //         $('.clock_manager_first').text(`з ${result_clock.first}`);
    //         $('.clock_manager_first').attr(`data-result`, result_clock.first);
    //         $('.clock_manager_second').text(`по ${result_clock.second}`);
    //         $('.clock_manager_second').attr(`data-result`, result_clock.second);
    //         $('.all_price_consultation').text(sum);
    //         // counter_num('.all_price_consultation', 1000, sum);
    //         check_user_valid();
    //         show_step([4]);
    //     }
    // }
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
    console.log('result: ', result);
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
    let id_practise = $(this).attr('data-id');
    let name_practise = $(this).attr('data-title');

    if ($(this).hasClass('step_select_text_active')) {
        let current_practise = $('.advocate_practise__block').find('.advocate_download_prof');
        $.each(current_practise, function(index, value) {
            if ($(value).find(".advocate_download_name").attr('data-id') == id_practise) {
                $(value).remove();
                get_fetch_for_active_practise();
            }
        });
        $(this).removeClass('step_select_text_active');
    } else {
        $(this).addClass('step_select_text_active');
        let practise_json = {
            name: name_practise,
            id: id_practise
        }
        create_practise(practise_json);
        get_fetch_for_active_practise();
    }
   
});





let create_practise = (content) => {
    let product_item = "";
    product_item += `
    <div class="advocate_download_prof">
    <div data-id="${content.id}" class="advocate_download_name main_title main_title_4 color_gold">
        ${content.name}
    </div>
    <svg class="advocate_download_close" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
    </div>
      
    `;       
    let old_html = $(".advocate_practise_content__block")[0].innerHTML;
    $(".advocate_practise_content__block")[0].innerHTML = old_html + product_item;

    $('.advocate_download_close').on('click', delete_file);

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