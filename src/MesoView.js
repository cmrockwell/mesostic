/**
 * @author Chris
 */

var MesoView = function (mesostic) {
    this.mesostic = mesostic;
    var spc = '&nbsp;';
    $.support.cors = true;
};


MesoView.prototype.init = function (c) {
	
	//var wrapper = $(c);
	
	/*$('textarea').focus(function(){
 		$(this).empty();
	});*/

	$('input#spine').blur(function(){
		mesoview.mesostic.setSpine($('input#spine').val());		
	});
	
	$('button#basicbtn').click(function(){
		mesoview.mesostic.reset();
		mesoview.mesostic.init($('#spine').val() , $('div#inputText textarea').val());
		//alert(mesoview.mesostic.getSpine());
		mesoview.mesostic.makeNonPure();
		mesoview.display(); 		
	});
	
	$('button#btn50').click(function(){
		mesoview.mesostic.reset();
		mesoview.mesostic.init($('#spine').val() , $('div#inputText textarea').val());
		//alert(mesoview.mesostic.getSpine());
		mesoview.mesostic.makePure(50);
		mesoview.display(); 		
	});

	$('button#btn100').click(function(){
		mesoview.mesostic.reset();
		mesoview.mesostic.init($('#spine').val() , $('div#inputText textarea').val());
		//alert(mesoview.mesostic.getSpine());
		mesoview.mesostic.makePure(100);
		mesoview.display(); 		
	});	
	
	$('a#getseed').click(function(e){
		e.preventDefault();
		$.ajax({
  			url: "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles="+mesoview.mesostic.getSpine+"&format=json",
  			type: 'GET',
  			dataType: "jsonp",
	    	jsonp : "callback",
	    	jsonpCallback: "jsonpcallback",}).success(function() {
  				alert( "updated seed from wikipedia" );});	
	});
	this.mesostic.makeNonPure();
	this.display();
	var mesoview = this;

}

MesoView.prototype.display = function(){
	var poem ="";

	for (var i=0; i<this.mesostic.poem.length; i++){
		// for each word, determine the number of spaces for spine word alignment
		var space = "";
		for(var s=0; s< (this.mesostic.maxIndexOfSpineLtr - this.mesostic.spineLtrs[i]); s++){
			space +=" ";
		}
		poem += space+this.mesostic.poem[i] + '\n';
	}
	//$('div#poem textarea')
	$('div#poem textarea').val(poem);
	
}

function jsonpcallback(rtndata){
	var extract="";
	for (var i in rtndata.query.pages) {
    	console.log(rtndata.query.pages[i].extract); 
    	extract += rtndata.query.pages[i].extract;
	}
	$('div#inputText textarea').val(extract);
}

function startAjax(){
	$.ajax({
  		url: "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles="+mesoview.mesostic.getSpine()+"&format=json",
  		type: 'GET',
  		dataType: "jsonp",
	    jsonp : "callback",
	    jsonpCallback: "jsonpcallback",
	        //userAgent: "stu.wccnet.edu/~cmrockwell/mesostic"
  			//data: { action: "query&prop=extracts&exintro&explaintext", titles: "mesostic", format:'json' }
	}).success(function() {
  		alert("blen");
	});	
}


window.MesoView = MesoView;
 