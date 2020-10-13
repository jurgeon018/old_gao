import fetchScript from '/static/js/index.js';

const fetch = fetchScript();

var test = function (){
	fetch('/static/js/jquery.fancybox.min.js', {timeout: 1000})
	.then(function(response) {

	  console.log('script loaded successfully');
	  	    $('.link-fanc').fancybox({
	          touch: false
	      });
	  	    $('.log-prof_modal').fancybox({
	  	    	touch: false,
	  	    	scrolling: 'hidden',
	  	    });
	  	    $('.set-prof').fancybox({
	  	    	touch: false,
	  	    	scrolling: 'hidden',
	  	    
	  	    });

	})
	.catch(function(ex) {

	  console.log('failed', ex);
	});
};
setTimeout(test, 1000);
