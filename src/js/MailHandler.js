/**
 *	Class MailHandler
 *
 *	Handle mail sending from the web form
 */
(function(){

	"use strict";

	var MailHandler = {

		mailRequest : null,

		mailErrorMessage : 'Oups !<br/><br/>Une erreur est survenue durant l\'envoi du mail...<br/><br/>Merci d\'essayer ultérieurement.',

		/**
		 * [initialize]
		 * @return {[undefined]} 		[just attach custom submit handler]
		 */
		initialize : function(){

			//attach Web form mail sender handler
			$('#vaguemestre').on('submit', self.submitHandler);

		},

		/**
		 * [submitHandler handle the mail form submitting]
		 * 
		 * @param  {[object]}	 event 		[The submit event object]
		 * @return {[undefined]}
		 */
		submitHandler : function(event){

			event.preventDefault();

			//Multiple click handler
			if(self.mailRequest){
				self.mailRequest.abort();
			}

			self.mailRequest = $.ajax({
				type: 'POST',
				url: '/vaguemestre',
				data: $(this).serialize(),
				success:self.requestSuccessHandler,
				error:self.requestErrorHandler
			});

		},

		/**
		 * [requestErrorHandler triggered on ajax mail error]
		 * @param  {[object]} 		request 		[jQuery request Object]
		 * @return {[undefined]}
		 */
		requestErrorHandler : function(request){
	
			if(request.statusText !== 'abort'){
				alertify.notify(self.mailErrorMessage , 'error', 0);
			}
	
			$('.form-submit-btn').remove();

			$('.contact-response').html('<i class="icon icon-sad"></i><br/><br/>Impossible de contacter le serveur.');

		},

		/**
		 * [requestSuccessHandler triggered on ajax mail success]
		 * @param  {[string]} 		res 			[Server response]
		 * @return {[undefined]}
		 */
		requestSuccessHandler : function(res){

			var msgResponse;

			if(res === 'ok'){
				msgResponse = '<i class="icon icon-checkmark"></i><br/><br/>À bientôt !';			
				alertify.notify('Votre message sera lu dans les plus brefs délais.<br/>', 'success', 0);
			}else{
				msgResponse = '<i class="icon icon-sad"></i><br/><br/>Impossible de contacter le serveur.';
				alertify.notify(self.mailErrorMessage , 'error', 0);
			}

			$('.form-submit-btn').remove();

			$('.contact-response').html(msgResponse);
		
		}

	};

	var self = MailHandler;

	window.MailHandler = MailHandler;

	MailHandler.initialize();

})();