

// Створює календарик авдоката
export const create_row_item = (content) => {
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


// Створює галузі або самих адвокатів в бронювання клієнта
export const create_doc = (content) => {
    let step_date_prof = document.createElement('div');



    return step_date_prof;
}

export const test = () => {
    console.log(1212);
}

// Створює години для календаря
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


// Додавання файлів адвокатом
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

// Додавання файлів клієнтом до бронювання
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

// Створює практики для адвоката в його особистих даних
let create_practise = (content) => {
    let step_active_content = document.createElement('div');
        step_active_content.classList.add('step_active_content', 'standart_title', 'standart_title_4', 'color_gold');
        step_active_content.textContent = content.textPractise;
        return step_active_content;
}