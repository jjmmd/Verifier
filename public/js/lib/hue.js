var HueIP;

$( function() {
	$('.demo').each( function() {
        $(this).minicolors({
            control: $(this).attr('data-control') || 'hue',
                                
            change: function(hex, opacity) {
            	var log;
	            try {
	                log = hex ? hex : 'transparent';
	                if( opacity ) log += ', ' + opacity;
	                    colorChange(hex);
	            	} catch(e) {}
	        	},
        	theme: 'default'
        });
    });

    findHue();
});

//Find the Hue Bridge and set the IP address to global value HueIP
function findHue() {
	console.log("got here!");
	$.get("http://www.meethue.com/api/nupnp", function(result, textStatus){
    	if(textStatus == "success" & result[0] != undefined) {
    		HueIP = result[0].internalipaddress;
    		console.log("Hue Bridge Found: " + hueIP);
    	}
    	else {
    		console.log("No Hue Bridge is identified");
    	}
    });
}

//Get the Lighting Information from the Hue Bridge and create HTML representations of each light
function infoLight() {
	$.get("http://" + HueIP + "/api/newdeveloper", function(result, status) {
		if(status == "success") {
			//Iterate once for each light
			for(var i in result.lights) {
				//Add a On/Off Button, Brightness slider, and Colorwheel
				$('#lightMenu').append('<li>' + result.lights[i].name + '<br>' + 
					'<button id=' + i + ' onclick="buttonClick(this.id)">  ' + result.lights[i].state.on + '</button><br>' +
					'<input type="range" id=' + i + 'slider min=0 max=255 step=1 onmouseup="sliderMove(this.id, this.value)"></input>' + 
					'<input type="color" id=' + i + 'color onchange="colorChange(this.id, value)"></input></li>');
			}
		}
	});
};

//Change the light color according to the value returned from the colorpicker
//Unfortunately the value is sent as a 6 digit hex number which does not correspond to the 
//color values coded in the Hue
function colorChange(value) {
	//Eliminate the leading '#'
	value = value.replace('#', '');
		console.log(": " + parseInt(value, 16) / 256);

	var brightness = new Object();
	//Tried to transform the hex number into something hue friendly, but doesn't work well at all
	brightness.hue = Math.round(parseInt(value, 16) / 256);

	//Update the light
	$.ajax({
	    url: 'http://' + HueIP + '/api/newdeveloper/lights/1/state',
	    data : JSON.stringify(brightness),
	    type: 'PUT',
		success: function(result) {
			console.log(JSON.stringify(result));
	    }
	});
}

//This function is called when the brightness is changed by moving the slider
//Slider values are between 0 (dark) and 255 (bright)
function sliderMove(lightID, value) {
	var brightness = new Object();
	brightness.bri = parseInt(value);

	$.ajax({
	    url: 'http://' + HueIP + '/api/newdeveloper/lights/' + lightID[0] + '/state',
	    data : JSON.stringify(brightness),
	    type: 'PUT',
		success: function(result) {
			console.log(JSON.stringify(result));
	    }
	});
}

//Toggle the light on or off.  This makes a get call to the light to see what the on state is and
//then reverses it. The ajax call is performed in the .done so that it runs in sequence rather than
//asynchronously
function buttonClick(lightID) {
	$.get("http://" + HueIP + "/api/newdeveloper", function(result, status) {
		if(status == "success") {
			if(result.lights[lightID].state.on == true) {
				result.lights[lightID].state.on = false;
			}
			else {
				result.lights[lightID].state.on = true;
			}
		}
	}).done( function(result) {
		$.ajax({
		    url: 'http://' + HueIP + '/api/newdeveloper/lights/' + lightID + '/state',
		    data : JSON.stringify(result.lights[lightID].state),
		    type: 'PUT',
			success: function(result) {
				$('#' + lightID + '').html('ON');
		    }
		});
	});
}