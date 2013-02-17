/**
 * 
 * @author Chris
 */

describe('Meso View', function () {
	var m;
	var mv;
	
	beforeEach(function () {  	
		container = $('<div/>');
        container.addClass('wrapper');
        container.appendTo(document.body);
		container.append($('<a href="" id="getseed">Get Seed Text</a>'));
		container.append($('<input type="text" name="spine" id ="spine" size="30" value=""/>'));
        container.append($('<div id="inputText"> <textarea> A mesostic is a poem or other typography such that'+
        'a vertical phrase intersects lines of horizontal text. It is similar to an acrostic, but with the vertical phrase intersecting the middle of the line,'+
        'as opposed to beginning each new line. The practice of using index words to select pieces from a preexisting text was developed by Jackson Mac Low as "diastics"'+
        'Culver (John Cage\'s assistant), "Between any two [capitalized] letters, you can\'t have the second [letter]. In a one-hundred-percent mesostic, "Between any two '+
        '[capitalized] letters, you can\'t have either [letter]."</textarea> </div>'));
		container.append($("<div id='poem'> <textarea></textarea> </div> "));
		
		m = new Mesostic();
	    m.init($('#spine').val() , $('div#inputText textarea').val());
	    mv = new MesoView(m);
		mv.init($('#wrapper')); 	
	});

    afterEach(function () {
        container.remove();
    });
	
	xit('gets seed text thru ajax calls to wikipedia', function(){
		
		var newSeed = 'Babysitting is the practice of temporarily caring for a child. Babysitting is commonly performed as a job by teenagers for extra money.';
		$('#spine').val('babysitter');
		m.setSpine('babysitter');
		
		container.find('#getseed').click(); // load the form
		
		$(document).ready(function() // wait until DOM is ready
        {
        	runs(function() {
        		container.find('#getSpine').click();	// click the request for abstract based on seed
        	}, "an asynchronous method to update the seed text based on the spine word");
        	
        	waitsFor(function() {
            	return $('div#inputText textarea').val() == newSeed;
        	}, "textarea to be set with babysitter extract from wikipedia", 5000);
		
		});
	});

	it('sets the defaults using ajax call to server', function(){
        runs(function() {
        	mv.getParams();
        	mv.setDefault();
        }, "an asynchronous method to make set the default");
        waitsFor(function() {
            return $('#spine').val() === 'mesostic'; 
        }, "calls the server, gets json based on params, sets the default seed, spine and mesostic", 1000);
				
	});
	
});

/* //expect($('div#inputText textarea').val()).toEqual("");
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