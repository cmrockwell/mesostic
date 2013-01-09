/**
 * @author Chris
 */

var MesoView = function (mesostic) {
    this.mesostic = mesostic;
    var spc = '&nbsp;';
    var wrapper ={};
    $.support.cors = true;
    extract="";
        
};


MesoView.prototype.init = function (c) {
	// get the default textbox values via ajax call
	this.getParams();
	this.setDefault();
	
	//this.mesostic.makeNonPure();
	//this.display();
	mesoview = this;
	wrapper = c;
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
		mesoview.words = mesoview.mesostic.getSpine().replace(/(\s+|[^\w]+)/g, function($1){return " ";}).split(' '); // make array of just words
		mesoview.wordIndex =0;

		mesoview.showSeedForm();
		
		/*$.ajax({
  			url: "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles="+mesoview.words[0]+"&format=json&redirects",
  			type: 'GET',
  			dataType: "jsonp",
	    	jsonp : "callback",
	    	jsonpCallback: "jsonpcallback"
	    	}).success(function() {// runs after the named call back
  				mesoview.wordIndex++;
  				if(mesoview.words[mesoview.wordIndex])
  					{startAjax(mesoview.words[mesoview.wordIndex]);}
  				});*/	
		
	});						
		
}

MesoView.prototype.showSeedForm = function(){
	var headerHtml = "<h1>Generate Seed Form</h1>	<p>Generate seed text by entering a search phrase below.</p>";
	var formHtml = "<form id=\"getSeedForm\" > <label>Search Phrase: </label>" +
	"<input type=\"text\" name=\"wordphrase\" id=\"wordphrase\" \"/> "+ 	
	"<button type=\"submit\" id=\"getphrase\" name=\"getphrase\">Get Extract for Phrase</button> </form> "+
 	"<p>Or, you can search using the spine words.</p>"+
 	"<form id=\"getSpine\"> <button type=\"submit\" id=\"getword\" name=\"getword\">Get Extract from Spine Words</button></form>" +
 	"<form id=\"cancel\"> <button type=\"submit\" id=\"cancel\" name=\"cancel\">Cancel</button> </form>";
 	var getSeedElement = $(headerHtml+formHtml);
 	var maskDiv = $('<div id="mask" height="'+ wrapper.offsetHeight+'" width="'+wrapper.offsetWidth+'">' +'</div>');
 	var getSeedDiv = $('<div id="getSeedDiv"></div>');
 	getSeedDiv.append(headerHtml);
 	getSeedDiv.append(formHtml);	
 	wrapper.append(maskDiv);
 	wrapper.append(getSeedDiv);
 	
 	$('button#getphrase').click(function(e){
 		e.preventDefault();
 		var phrase = encodeURIComponent($('#wordphrase').val()); 
 		startAjax(phrase);
 		mesoview.closeSeedView();
 	});
 	
 	$('button#getword').click(function(e){
 		e.preventDefault();
 		startAjax(mesoview.words.shift(), true);
 		mesoview.closeSeedView();
 		/*$.ajax({
  			url: "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles="+mesoview.words[0]+"&format=json&redirects",
  			type: 'GET',
  			dataType: "jsonp",
	    	jsonp : "callback",
	    	jsonpCallback: "jsonpcallback"
	    	}).success(function() {// runs after the named call back
  				mesoview.wordIndex++;
  				if(mesoview.words[mesoview.wordIndex])
  					{startAjax(mesoview.words[mesoview.wordIndex]);}
  				});*/
 	});
 	
 	$('button#cancel').click(function(e){
 		e.preventDefault();
		mesoview.closeSeedView();
 	});
}

MesoView.prototype.closeSeedView = function(){
 		var seedEle = document.getElementById('getSeedDiv');
 		var maskEle = document.getElementById('mask');
 		seedEle.parentNode.removeChild(seedEle);
 		maskEle.parentNode.removeChild(maskEle);	
}

MesoView.prototype.setDefault = function(){
	// maybe ajax calls do not work over localhost.
	//alert("http://localhost/mesostic_back_end/classes/Mesostics.php?id="+this.urlParams['id']);
	
	//Core.sendRequest('classes/Books.php',obj.authorResults, input);
	var idParm = "0";
	if(this.urlParams['id']!=null){
		idParm= this.urlParams['id'];
		}
	Core.sendRequest('http://localhost/mesostic_back_end/classes/Mesostics.php?id='+idParm,defaultCallBack);
	/*$.ajax({  		
  		url: "http://localhost/mesostic_back_end/classes/Mesostics.php?id="+this.urlParams['id'],
  		type: 'GET',
  		dataType: "jsonp",
	    jsonpCallback: "mesoview.defaultCallBack",

	}).success(function() {
		var json = JSON.parse(JSON.parse(resp.responseText));
		alert('test');

		mesoview.mesostic.reset();
		mesoview.mesostic.init(json['poems']['spine'] , json['poems']['seed'] );
	/*});//*/	

}

MesoView.prototype.getParams = function(){
	this.urlParams = {};
	var match;
	var plus = /\+/g;  // Regex for replacing addition symbol with a space
   	var search = /([^&=]+)=?([^&]*)/g;
   	var decode = function (string) { return decodeURIComponent(string.replace(plus, " ")); };
   	var query  = window.location.search.substring(1);
	//alert(query);
   	while (match = search.exec(query))
		{
			this.urlParams[decode(match[1])] = decode(match[2]);
		}
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
///////////this does not seem right. I wanted this function part of the mesoview prototype. but it didn't work with the parameter req.
function defaultCallBack(req){//response
	var json = JSON.parse(req.responseText);
	var seedDecoded = decodeURIComponent(json[0]['seed']);
	var spineDecoded = decodeURIComponent(json[0]['spine']); 
	
	$('#spine').val(spineDecoded);
	$('div#inputText textarea').val(seedDecoded);
	
	mesoview.mesostic.reset();
	mesoview.mesostic.init(spineDecoded, seedDecoded);
	mesoview.mesostic.makeNonPure();
	mesoview.display();	
}

function jsonpcallback(rtndata){
	//var extract="";
	for (var i in rtndata.query.pages) {
    	//console.log(rtndata.query.pages[i].extract); 
    	extract += rtndata.query.pages[i].extract;
	}
	$('div#inputText textarea').val(extract);
}

function startAjax(word, wordOrPhrase){
	
	$.ajax({
  		url: "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles="+word+"&format=json&redirects",
  		type: 'GET',
  		dataType: "jsonp",
	    jsonp : "callback",
	    jsonpCallback: "jsonpcallback",

	}).success(function() { // would this be a good place for a llambda or closure?
				
		if (mesoview.words.length !=0 && wordOrPhrase){
			var nextWord = mesoview.words.shift(); 		
			startAjax(nextWord, true);
		}
		
	});	
}


window.MesoView = MesoView;
 