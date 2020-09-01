(function() {
	
	function stripHtml(value) {
		// remove html tags and space chars
		return value.replace(/<.[^<>]*?>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ')
		// remove numbers and punctuation
		.replace(/[0-9.(),;:!?%#$'"_+=\/-]*/g,'');
	}
	jQuery.validator.addMethod("maxWords", function(value, element, params) { 
	    return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length < params; 
	}, jQuery.validator.format("Please enter {0} words or less.")); 
	 
	jQuery.validator.addMethod("minWords", function(value, element, params) { 
	    return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params; 
	}, jQuery.validator.format("Please enter at least {0} words.")); 
	 
	jQuery.validator.addMethod("rangeWords", function(value, element, params) { 
	    return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params[0] && value.match(/bw+b/g).length < params[1]; 
	}, jQuery.validator.format("Please enter between {0} and {1} words."));

})();

jQuery.validator.addMethod("letterswithbasicpunc", function(value, element) {
	return this.optional(element) || /^[a-z-.,()'\"\s]+$/i.test(value);
}, "Letters or punctuation only please");  

jQuery.validator.addMethod("alphanumeric", function(value, element) {
	return this.optional(element) || /^\w+$/i.test(value);
}, "Letters, numbers, spaces or underscores only please");  

jQuery.validator.addMethod("lettersonly", function(value, element) {
	return this.optional(element) || /[^0-9]+$/i.test(value);
}, "Ім'я повинно містити лише букви"); 

jQuery.validator.addMethod("nowhitespace", function(value, element) {
	return this.optional(element) || /^\S+$/i.test(value);
}, "No white space please"); 

jQuery.validator.addMethod("ziprange", function(value, element) {
	return this.optional(element) || /^90[2-5]\d\{2}-\d{4}$/.test(value);
}, "Your ZIP-code must be in the range 902xx-xxxx to 905-xx-xxxx");

jQuery.validator.addMethod("integer", function(value, element) {
	return this.optional(element) || /^-?\d+$/.test(value);
}, "A positive or negative non-decimal number please");

/**
* Return true, if the value is a valid vehicle identification number (VIN).
*
* Works with all kind of text inputs.
*
* @example <input type="text" size="20" name="VehicleID" class="{required:true,vinUS:true}" />
* @desc Declares a required input element whose value must be a valid vehicle identification number.
*
* @name jQuery.validator.methods.vinUS
* @type Boolean
* @cat Plugins/Validate/Methods
*/ 
jQuery.validator.addMethod(
	"vinUS",
	function(v){
		if (v.length != 17)
			return false;
		var i, n, d, f, cd, cdv;
		var LL    = ["A","B","C","D","E","F","G","H","J","K","L","M","N","P","R","S","T","U","V","W","X","Y","Z"];
		var VL    = [1,2,3,4,5,6,7,8,1,2,3,4,5,7,9,2,3,4,5,6,7,8,9];
		var FL    = [8,7,6,5,4,3,2,10,0,9,8,7,6,5,4,3,2];
		var rs    = 0;
		for(i = 0; i < 17; i++){
		    f = FL[i];
		    d = v.slice(i,i+1);
		    if(i == 8){
		        cdv = d;
		    }
		    if(!isNaN(d)){
		        d *= f;
		    }
		    else{
		        for(n = 0; n < LL.length; n++){
		            if(d.toUpperCase() === LL[n]){
		                d = VL[n];
		                d *= f;
		                if(isNaN(cdv) && n == 8){
		                    cdv = LL[n];
		                }
		                break;
		            }
		        }
		    }
		    rs += d;
		}
		cd = rs % 11;
		if(cd == 10){cd = "X";}
		if(cd == cdv){return true;}
		return false; 
	},
	"The specified vehicle identification number (VIN) is invalid."
);

/**
  * Return true, if the value is a valid date, also making this formal check dd/mm/yyyy.
  *
  * @example jQuery.validator.methods.date("01/01/1900")
  * @result true
  *
  * @example jQuery.validator.methods.date("01/13/1990")
  * @result false
  *
  * @example jQuery.validator.methods.date("01.01.1900")
  * @result false
  *
  * @example <input name="pippo" class="{dateITA:true}" />
  * @desc Declares an optional input element whose value must be a valid date.
  *
  * @name jQuery.validator.methods.dateITA
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
jQuery.validator.addMethod(
	"dateITA",
	function(value, element) {
		var check = false;
		var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
		if( re.test(value)){
			var adata = value.split('/');
			var gg = parseInt(adata[0],10);
			var mm = parseInt(adata[1],10);
			var aaaa = parseInt(adata[2],10);
			var xdata = new Date(aaaa,mm-1,gg);
			if ( ( xdata.getFullYear() == aaaa ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == gg ) )
				check = true;
			else
				check = false;
		} else
			check = false;
		return this.optional(element) || check;
	}, 
	"Please enter a correct date"
);

jQuery.validator.addMethod("dateNL", function(value, element) {
		return this.optional(element) || /^\d\d?[\.\/-]\d\d?[\.\/-]\d\d\d?\d?$/.test(value);
	}, "Vul hier een geldige datum in."
);

jQuery.validator.addMethod("time", function(value, element) {
		return this.optional(element) || /^([01][0-9])|(2[0123]):([0-5])([0-9])$/.test(value);
	}, "Please enter a valid time, between 00:00 and 23:59"
);

/**
 * matches US phone number format 
 * 
 * where the area code may not start with 1 and the prefix may not start with 1 
 * allows '-' or ' ' as a separator and allows parens around area code 
 * some people may want to put a '1' in front of their number 
 * 
 * 1(212)-999-2345
 * or
 * 212 999 2344
 * or
 * 212-999-0983
 * 
 * but not
 * 111-123-5434
 * and not
 * 212 123 4567
 */
jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, ""); 
	return this.optional(element) || phone_number.length > 9 &&
		phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
}, "Please specify a valid phone number");

jQuery.validator.addMethod('phoneUK', function(phone_number, element) {
return this.optional(element) || phone_number.length > 9 &&
phone_number.match(/^(\(?(0|\+44)[1-9]{1}\d{1,4}?\)?\s?\d{3,4}\s?\d{3,4})$/);
}, 'Please specify a valid phone number');

jQuery.validator.addMethod('mobileUK', function(phone_number, element) {
return this.optional(element) || phone_number.length > 9 &&
phone_number.match(/^((0|\+44)7(5|6|7|8|9){1}\d{2}\s?\d{6})$/);
}, 'Please specify a valid mobile number');

// TODO check if value starts with <, otherwise don't try stripping anything
jQuery.validator.addMethod("strippedminlength", function(value, element, param) {
	return jQuery(value).text().length >= param;
}, jQuery.validator.format("Please enter at least {0} characters"));

// same as email, but TLD is optional
jQuery.validator.addMethod("email2", function(value, element, param) {
	return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value); 
}, jQuery.validator.messages.email);

// same as url, but TLD is optional
jQuery.validator.addMethod("url2", function(value, element, param) {
	return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value); 
}, jQuery.validator.messages.url);

// NOTICE: Modified version of Castle.Components.Validator.CreditCardValidator
// Redistributed under the the Apache License 2.0 at http://www.apache.org/licenses/LICENSE-2.0
// Valid Types: mastercard, visa, amex, dinersclub, enroute, discover, jcb, unknown, all (overrides all other settings)
jQuery.validator.addMethod("creditcardtypes", function(value, element, param) {

	if (/[^0-9-]+/.test(value)) 
		return false;
	
	value = value.replace(/\D/g, "");
	
	var validTypes = 0x0000;
	
	if (param.mastercard) 
		validTypes |= 0x0001;
	if (param.visa) 
		validTypes |= 0x0002;
	if (param.amex) 
		validTypes |= 0x0004;
	if (param.dinersclub) 
		validTypes |= 0x0008;
	if (param.enroute) 
		validTypes |= 0x0010;
	if (param.discover) 
		validTypes |= 0x0020;
	if (param.jcb) 
		validTypes |= 0x0040;
	if (param.unknown) 
		validTypes |= 0x0080;
	if (param.all) 
		validTypes = 0x0001 | 0x0002 | 0x0004 | 0x0008 | 0x0010 | 0x0020 | 0x0040 | 0x0080;
	
	if (validTypes & 0x0001 && /^(51|52|53|54|55)/.test(value)) { //mastercard
		return value.length == 16;
	}
	if (validTypes & 0x0002 && /^(4)/.test(value)) { //visa
		return value.length == 16;
	}
	if (validTypes & 0x0004 && /^(34|37)/.test(value)) { //amex
		return value.length == 15;
	}
	if (validTypes & 0x0008 && /^(300|301|302|303|304|305|36|38)/.test(value)) { //dinersclub
		return value.length == 14;
	}
	if (validTypes & 0x0010 && /^(2014|2149)/.test(value)) { //enroute
		return value.length == 15;
	}
	if (validTypes & 0x0020 && /^(6011)/.test(value)) { //discover
		return value.length == 16;
	}
	if (validTypes & 0x0040 && /^(3)/.test(value)) { //jcb
		return value.length == 16;
	}
	if (validTypes & 0x0040 && /^(2131|1800)/.test(value)) { //jcb
		return value.length == 15;
	}
	if (validTypes & 0x0080) { //unknown
		return true;
	}
	return false;
}, "Please enter a valid credit card number.");




$(function() {
    Onload();
  })
// /**
//  * valide_form - Валідація форм
//  * @param {selector form} ID Форми на яку підвішують валідацію
//  * @param {class name} class групи куди виводять помилки
//  * @param {bull} true Чи виводи вспливайку пісял відповіді ajax
//  *
//  **/
function Onload() {
    valide_form('#modal-form_user', '.inp-vak-wrap', false);
    valide_form('#modal-form', '.input-wrap', true);
    valide_form('#modal-form_settings', '.inp-vak-wrap', false);
    valide_form('#modal-form_relog', '.inp-vak-wrap', false);
    valide_form('.user_order_of_advocate', '.inp-vak-wrap', true);
}
function location_leng() {
    return location.pathname.split('/')[1];
}
function valide_form(id_form, error_inp_wrap, check_request) {
    var check_request = check_request;
    if ($(id_form).length > 0) {
        var lang_site;
        var error_text = {};

        lang_site = location_leng();
        switch (lang_site) {
            case 'uk':
            error_text.required = 'Поле обов\'язково для заповнення';
            error_text.email = 'Поле має містити email';
            break;
            case 'ru':
            error_text.required = 'Поле обязательно для заполнения';
            error_text.email = 'Поле должно содержать email';
            break;
            case 'en':
            error_text.required = 'The field is required';
            error_text.email = 'The field must contain an email';
            break;
            default:
            error_text.required = 'Поле обов\'язково для заповнення.';
            error_text.email = 'Поле має містити email.';
        }
        $(id_form).validate({
            errorPlacement: function (event, validator) {
                $(validator).parents(error_inp_wrap).append($(event));
            },
            rules: {
                firstname: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true,
                },
                number: {
                    required: true,
                },
                name_car: {
                    required: true,
                },
                mail_car: {
                    required: true,
                    email: true,
                },
                tel_car: {
                    required: true,
                },
                pas: {
                    required: true,
                },
                pas1: {
                    required: true,
                },
                pas2: {
                    required: true,
                },
                username: {
                    required: true,
                },
                password: {
                    required: true,
                },
                fMail: {
                    required: true,
                    email: true,
                },
                fName: {
                    required: true,
                },
                fPhone: {
                    required: true,
                },
                name: {
                    required: true,
                    lettersonly: true
                },
                phone: {
                    required: true,
                },
             },
             messages: {
                name_car: {
                   required: error_text.required,
                },
                mail_car: {
                    required: error_text.required,
                    email: error_text.email
                },
                tel_car: {
                   required: error_text.required,
                },
                pas: {
                   required: error_text.required,
                },
                pas1: {
                   required: error_text.required,
                },
                pas2: {
                    required: error_text.required,
                },
                firstname: {
                    required: error_text.required,
                },
                email: {
                    required: error_text.required,
                    email: error_text.email
                },
                number: {
                    required: error_text.required,
                },
                username: {
                    required: error_text.required,
                },
                password: {
                    required: error_text.required,
                },
                fMail: {
                    required: error_text.required,
                    email: error_text.email
                },
                fName: {
                    required: error_text.required,
                },
                fPhone: {
                    required: error_text.required,
                },
                name: {
                    required: error_text.required,
                },
                phone: {
                    required: error_text.required,
                },
             },
             submitHandler: function(form) {
                event.preventDefault();
           
                 $('.load_spin').addClass('load_spin_active');
                $.fancybox.close({
                    src: '#modal-form_user',
                });
                $.fancybox.close({
                    src: '#modal-form_settings',
                });
                $.fancybox.close({
                    src: '#modal-form_relog',
                });


                let Formdata = new FormData();
                 var form_input = $(form).serializeArray();
                 var url_form = form.action;
                 var form_json = {};
                 $(form_input).each(function(index, obj) {
                    form_json[obj.name] = obj.value;
                 });


                    if ($(id_form).hasClass('new_form')) {
                        // форма з файлами!!! ========================>
                        let user_files = form.querySelectorAll('#input_user_file')[0];

                        console.log('user_files: ', user_files);
                        if (user_files != undefined) {
                          if (user_files.files[0] !== undefined) { 
                              $.each(user_files.files, function(index, value) {
                                Formdata.append('file', value);
                              });
                          }
                        }
                        let user_practise = $('.pract_step_select').find('.step_active_content').text();
                        let user_advocate = $('.advoc_step_select').find('.step_active_content').text();
                        let user_date = $('.advocate_user_date').text();
                        let user_clock = $('.clock_manager').attr('data-clock');
                        let user_price = $('.all_price_consultation').attr('data-price');

                        let object = {
                            practise: user_practise,
                            advocate: user_advocate,
                            date: user_date,
                            clock: user_clock,
                            price: user_price
                        }
                           
                        Formdata.append('data', JSON.stringify(object));




                        if(url_form != '') {
                    
                            fetch(url_form, {
                              method: 'POST',
                              body: Formdata
                            })
                            .then(data => {
        
                              return data.json();
                            })
                            .then(data => {
                                console.log(data)
                              if(data.status=='OK' && typeof data['status'] !== "undefined"){
                                  sayHi();
                                gtag('event', 'send', { 'event_category': 'form', 'event_action': 'send', });
                              }
                              if(data.status=='BAD' && typeof data['status'] !== "undefined"){
                                  $('.load_spin').removeClass('load_spin_active');
                                  $(".error_block_false").text("Невірний логін або пароль");
                                  $.fancybox.open({
                                    src: '#modal_form_false',
                                  });
                                  
                  
                              }
                  
                              if(typeof data['url'] !== "undefined" && data.url!=''){
                                //   sayHi();
                                  console.log(location.href)
                                  console.log(data.url)
                                  location.href=data.url;
                              }
                            
                  
                  
                            })
                  
                          }else {
                            console.log("forn_not_actions");
                          }
                    } else {
                        if(url_form != ''){
                    
                            fetch(url_form, {
                              method: 'POST',
                              body: new URLSearchParams($.param(form_json))
                            })
                            .then(data => {
        
                              return data.json();
                            })
                            .then(data => {
                                console.log(data)
                              if(data.status=='OK' && typeof data['status'] !== "undefined"){
                                  sayHi();
                                gtag('event', 'send', { 'event_category': 'form', 'event_action': 'send', });
                              }
                              if(data.status=='BAD' && typeof data['status'] !== "undefined"){
                                  $('.load_spin').removeClass('load_spin_active');
                                  $(".error_block_false").text("Невірний логін або пароль");
                                  $.fancybox.open({
                                    src: '#modal_form_false',
                                  });
                                  
                  
                              }
                  
                              if(typeof data['url'] !== "undefined" && data.url!=''){
                                //   sayHi();
                                  console.log(location.href)
                                  console.log(data.url)
                                  location.href=data.url;
                              }
                            
                  
                  
                            })
                  
                          }else {
                            console.log("forn_not_actions");
                          }
                    }
                 
          












                function sayHi() {
                    $('.load_spin').removeClass('load_spin_active');
                    $.fancybox.close();
                    if (check_request === true) {
                      $.fancybox.open({
                        src: '#modal-form_true',
                      });
                      setTimeout(() => {
                        $.fancybox.close({
                            src: '#modal-form_true',
                        });
                    }, 1000);
                        var form_inputs = $(form)[0].querySelectorAll('input');
                        if (form_inputs.length > 0) {
                            for (var key in form_inputs) {
                                if (form_inputs.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
                                    if (form_inputs[key].type !== 'submit') {
                                        form_inputs[key].value = '';
                                    }
                                }
                            }
                            var form_textaria = $(form)[0].querySelectorAll('textarea');
                            if (form_textaria.length > 0) {
                                form_textaria[0].value = '';
                            }
                        }
                    }
                }
                function sayHi_rewis() {
                    $('.load_spin').removeClass('load_spin_active');
                    $.fancybox.close();
                    if (check_request === true) {
                        $.fancybox.open({
                            src: '#modal-form_true',
                        });
                        var form_inputs = $(form)[0].querySelectorAll('input');
                        if (form_inputs.length > 0) {
                          for (var key in form_inputs) {
                          if (form_inputs.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
                              if (form_inputs[key].type !== 'submit') {
                                form_inputs[key].value = '';
                              }
                            }
                          }
                        }
                        var form_textaria = $(form)[0].querySelectorAll('textarea');
                        if (form_textaria.length > 0) {
                          form_textaria[0].value = '';
                        }
                    }
                }
             }
        });
    } 
}