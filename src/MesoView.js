/**
 * @author Chris
 */

var MesoView = function (mesostic) {
    this.mesostic = mesostic;
};

MesoView.prototype.init = function (c) {
	
	var wrapper = $(c);
	
	$('textarea').focus(function(){
 		$(this).empty();
	});
	
}

MesoView.prototype.display = function(){
	
}

window.MesoView = MesoView;
 