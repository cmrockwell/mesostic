/**
 * @author Chris
 */

var MesoView = function (mesostic) {
    this.mesostic = mesostic;
    var spc = '&nbsp;';
    $.support.cors = true;
};


MesoView.prototype.init = function (c) {
	
	this.mesostic.makeNonPure();
	this.display();
	var mesoview = this;
	
	/*$('textarea').focus(function(){ // in case the spine text should be cleared on the first focus
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
		e.preventDefault(); //str.replace(/[^\w\s]|_/g, function ($1) { return ' ' + $1 + ' ';}).replace(/[ ]+/g, ' ').split(' ');
		extract="";
		var words = mesoview.mesostic.getSpine().replace(/(\s+|[^\w]+)/g, function($1){return " ";}).split(' '); // make array of just words
		alert(words);
		//for (var i=0; i<words.length; i++){
		$.ajax({
  			url: "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles="+words[0]+"&format=json&redirects",
  			type: 'GET',
  			dataType: "jsonp",
	    	jsonp : "callback",
	    	jsonpCallback: "jsonpcallback"
	    	}).success(function() {
  				alert( "updated seed from wikipedia" );});	
		//}
	});						

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
var extract="";

function jsonpcallback(rtndata){
	//var extract="";
	for (var i in rtndata.query.pages) {
    	console.log(rtndata.query.pages[i].extract); 
    	extract += rtndata.query.pages[i].extract;
	}
	$('div#inputText textarea').val(extract);
}

function startAjax(word){
	$.ajax({
  		url: "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles="+word+"&format=json",
  		type: 'GET',
  		dataType: "jsonp",
	    jsonp : "callback",
	    jsonpCallback: "jsonpcallback",

	}).success(function() {
		// nothing yet
	});	
}


window.MesoView = MesoView;
 