/**
 * @author Chris
 */

describe('Mesostic Generator',function(){


	beforeEach(function () {  	
		meso = new Mesostic();
	});

	it('has a spine word',function(){	 
		meso.setSpine("SPINE");
		expect(meso.getSpine()).toEqual("SPINE");
	});


	it('has seed text', function() {
		meso.setSeed("A mesostic is a poem or other typography such that a vertical phrase"+
		"intersects lines of horizontal text. It is similar to an acrostic, but with the vertical"+
		" phrase intersecting the middle of the line, as opposed to beginning each new line.")
		expect(meso.getSeed()).toEqual("A mesostic is a poem or other typography such that a vertical phrase"+
		"intersects lines of horizontal text. It is similar to an acrostic, but with the vertical"+
		" phrase intersecting the middle of the line, as opposed to beginning each new line.");
	});
  
  
});