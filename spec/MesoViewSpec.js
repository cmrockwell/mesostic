/**
 * @author Chris
 */

describe('Meso view', function () {
	beforeEach(function () {  	
		container = $('<div/>');
        container.addClass('wrapper');
        container.appendTo(document.body);
		
		container.append($('<input type="text" name="spine" id ="spine" size="30" value="try to create"/>'));
        container.append($("<div id='inputText'> <textarea>test</textarea> </div>"));
		container.append($("<div id='poem'> <textarea></textarea> </div> "));
		
		var m = new Mesostic();
	    m.init($('#spine').val() , $('div#inputText textarea').val());
	    var mv = new MesoView(m);
		mv.init($('#wrapper')); 	
	});

    afterEach(function () {
        container.remove();
    });
	
	it('gets seed text thru ajax calls to wikipedia', function(){
		expect($('div#inputText textarea').val()).toEqual("");
	});

});

/*
A mesostic is a poem or other typography such that a vertical phrase intersects lines of horizontal text. It is similar to an acrostic, but with the vertical phrase intersecting the middle of the line, as opposed to beginning each new line.
The practice of using index words to select pieces from a preexisting text was developed by Jackson Mac Low as "diastics". It was used extensively by the experimental composer John Cage (Walsh 2001).
There are two types of mesostic: fifty percent and one hundred percent. In a fifty-percent mesostic, according to Andrew Culver (John Cage's assistant), "Between any two [capitalized] letters, you can't have the second [letter]." 
In a one-hundred-percent mesostic, "Between any two [capitalized] letters, you can't have either [letter]." 
Below, an example of a one-hundred-percent mesostic:

        KITCHEN

  let us maKe
      of thIs
      modesT
        plaCe
    a room Holding
tons of lovE
       (&, Naturally, much good food, too)

 */