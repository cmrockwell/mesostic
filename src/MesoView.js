/**
 * @author Chris
 */

var MesoView = function (mesostic) {
    this.mesostic = mesostic;
};

MesoView.prototype.init = function (c) {
	
	//var wrapper = $(c);
	
	$('textarea').focus(function(){
 		$(this).empty();
	});

	$('input#spine').focus(function(){
 		if ($(this).val()==='PASTE'){
 			$(this).val('');
 		}
	});
	
	$('button#basicbtn').click(function(){
		mesoview.mesostic.reset();
		mesoview.mesostic.init($('#spine').val() , $('div#inputText textarea').val());
		alert(mesoview.mesostic.getSpine());
		mesoview.mesostic.makeNonPure();
		mesoview.display(); 		
	});
	
	this.mesostic.makeNonPure();
	this.display();
	var mesoview = this;
}

MesoView.prototype.display = function(){
	var poem ="";
	for (var i=0; i<this.mesostic.poem.length; i++){
		poem += this.mesostic.poem[i] + '\n';
	}
	//$('div#poem textarea')
	$('div#poem textarea').val(poem);
	
}

window.MesoView = MesoView;
 