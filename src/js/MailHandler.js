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
			$('#vaguemestre').submit(function(event){

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
	
		},

		/**
		 * [requestSuccessHandler triggered on ajax mail success]
		 * @param  {[string]} 		res 			[Server response]
		 * @return {[undefined]}
		 */
		requestSuccessHandler : function(res){
		
			if(res === 'ok'){
				alertify.notify('Merci !<br/>j\'ai bien reçu votre mail.<br/>', 'success', 0);
			}else{
				alertify.notify(self.mailErrorMessage , 'error', 0);
			}
		
		}

	};

	var self = MailHandler;

	window.MailHandler = MailHandler;

	MailHandler.initialize();

})();