

$(function () {
	//$.mobile.page.prototype.options.backBtnText = "Tilbage";
  // Swipe events
  // https://github.com/eikes/jquery.swipe-events.js
  /*
  	$('#activities-slider')
          .swipeEvents()
          .bind("swipeLeft",  function(){ $('#swipebox').html("Swipe Left"); })
          .bind("swipeRight", function(){ $('#swipebox').html("Swipe Right"); })
          .bind("swipeDown",  function(){ $('#swipebox').html("Swipe Down"); })
          .bind("swipeUp",    function(){ $('#swipebox').html("Swipe Up"); });  
          
   */
   
   // Slider

    setupHome();
    $(document).keydown(function(e){
		console.log('KeyDown: '+e.keyCode);
	    if (e.keyCode == 37) { 
		   		window.activities.prev();
	       return false;
	    }
	    if (e.keyCode == 39) { 
		    window.activities.next();// right
	       return false;
	    }	    
	});          
          
	//setupHome();
			
	/*
	$.simpleWeather({
	    location: 'Ranum, Denmark',
        unit: 'c',
        success: function(weather) {
                html = '<div class="image" style="background-image:url('+weather.image+')"></div>';
                html += '<h1>'+weather.temp+'&deg;</h1>';
                html += '<a href="'+weather.link+'" class="external" target="_blank">View forecast at Yahoo! Weather</a>';

                $("#weather").html(html);
        },
        error: function(error) {
                $("#weather").html("<p>"+error+"</p>");
        }
	});
	*/
  
 //$.live('pageshow', function (page) { 
 //	alert('Page info'+page);
// });
 
});

// !#Information
$('#page-information').live('pageinit',function(event, ui)
{
    console.log('page-information :: pageinit');  
});

$('#page-information').live('pagebeforeshow',function(event, ui)
{
    console.log('page-information :: pagebeforeshow');  
});

// !#opening hours
$('#page-opening-hours').live('pageinit',function(event, ui)
{
    console.log('page-opening-hours :: pageinit');  
});

$('#page-opening-hours').live('pagebeforeshow',function(event, ui)
{
    console.log('page-opening-hours :: pagebeforeshow');  
});

// !#Home
$('#page-home').live('pageinit',function(event, ui)
{
    console.log('page-home :: pageinit');  
    setupHome();    
    //$('#activities-slider').show().fadeIn();    
});

$('#page-home').live('pagebeforeshow',function(event, ui)
{
    console.log('page-home :: pagebeforeshow');
    //setupHome();        
    //$('#activities-slider').hide();
  
});

function addPageControl(amount){
	$('.page-control').html('');
	for(var i = 0; i<amount; i++){
		if(i == 0){
			$('.page-control').append('<li class="active">dot</li>');		
		}else{
			$('.page-control').append('<li>dot</li>');		
		}		
	}
}

function setupHome(){
	 // Weather		
  // http://woeid.rosselliot.co.nz/lookup/ranum%20danmark
  if(!window.activities != null){
  window.activities = new Swipe(document.getElementById('activities-slider'), {
	    startSlide: 0,
	    speed: 400,
	    callback: function(event, index, elem) {
			$('.page-control li').removeClass('active');
		    $('.page-control li:eq('+index+')').addClass('active');
			//showInfo('<p>Swipe event</p><span class="swipe-left"></span>', 0, true);
	      // do something cool
	
	    }
	});	
  addPageControl($('#activities-slider li').size());
  }
	
  $.simpleWeather({
				zipcode: '',
				woeid: '556502',
				location: '',
				unit: 'c',
				success: function(weather) {
					html = '<h3 id="location">'+weather.city+'</h3>';
					html += '<p id="current-temp">'+weather.temp+'&deg;</p>';					
					html += '<p class="center"><strong>HÃ¸jeste temperatur i dag</strong> '+weather.high+'&deg; '+weather.units.temp+'</p>';
					html += '<p  class="center"><strong>Laveste temperatur i dag</strong> '+weather.low+'&deg; '+weather.units.temp+'</p>';
					html += '<img src="'+weather.image+'" class="icon">';					
					/*

					html += '<p><strong>Wind</strong> '+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+' <strong>Wind Chill</strong> '+weather.wind.chill+'</p>';
					html += '<p><strong>Currently</strong> '+weather.currently+' - <strong>Forecast</strong> '+weather.forecast+'</p>';

					html += '<p><strong>Humidity</strong> '+weather.humidity+' <strong>Pressure</strong> '+weather.pressure+' <strong>Rising</strong> '+weather.rising+' <strong>Visibility</strong> '+weather.visibility+'</p>';
					html += '<p><strong>Sunrise</strong> '+weather.sunrise+' - <strong>Sunset</strong> '+weather.sunset+'</p>';
					html += '<p><a href="'+weather.link+'">View forecast at Yahoo! Weather</a></p>';
					*/
					$("#weather").html(html);
				},
				error: function(error) {
					$("#weather").html('<p>'+error+'</p>');
				}
			});  
}