$(document).ready(function() {
	$("#contactform").submit(function(e) {
		e.preventDefault();
	    var form = $(this);
	    var url = form.attr("action");
	    $("#submit").html('Please wait... <span class="fas fa-circle-notch fa-spin"></span>');
	    setTimeout(
			  function() 
			  {
				$.ajax({          
			        	type: "post",
			        	url: url,
			        	data: form.serialize(),
			        	dataType: "json",
			        	cache: false,
			        	success: function(data){
			        		if(data.status == 'ok'){
						        $("#submit").html('Submit Message <span class="fa-solid fa-angle-right"></span>');
						    	alert(data.msg);
						        form.trigger("reset");
						    }else{
						    	$("#submit").html('Submit Message <span class="fa-solid fa-angle-right"></span>');
						    	alert(data.msg);
						    	grecaptcha.reset();
						    }
			        	}
				});
			}, 2000);
	});
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bookDeliveryLink').addEventListener('click', function(event) {
        event.preventDefault();
        timedScrollTo(document.getElementById('contact'), 1500); // 1000ms = 1 second
    });
});

function timedScrollTo(element, duration) {
    const start = window.pageYOffset;
    const end = element.getBoundingClientRect().top + start;
    const startTime = performance.now();

    function scroll() {
        const currentTime = performance.now();
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, start + (end - start) * ease);

        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(scroll);
}