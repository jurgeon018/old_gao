

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

    $(wrap).find('step_select_text').removeClass('.step_select_text_active');
    $(this).addClass('.step_select_text_active');
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