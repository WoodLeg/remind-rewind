(function(){
    'use strict';

    angular
    .module('remindRewind.sharing')
    .controller('sharingController', SharingController);

    SharingController.$inject = ['$log', 'LIVESHARE_LIMIT_PARTICIPANTS'];

    function SharingController($log, LIVESHARE_LIMIT_PARTICIPANTS) {
        var self = this;

        $log.debug('Sharing modal is in '+ this.mode +' mode');
        $log.debug('Available options:', this.options);
        $log.debug('API content ', this.api);

        this.liveshareParticipants = this.options.participants || '';
        this.liveshareRecipients = [];
        this.optionalMessage = '';
        this.liveshareMaxRecipients = LIVESHARE_LIMIT_PARTICIPANTS;

        this.formData = {
            participants: self.liveshareRecipients
        };

        this.moreRecipients = function(){

            if (self.mode === 'liveshare') {
                if ((self.liveshareRecipients.length + self.liveshareParticipants.length) > (self.liveshareMaxRecipients - 1)) {
                    self.limitLiveshareParticipants = true;
                    self.email = null;
                    return;
                }
            }

            $log.debug('Added new participant! '+ self.email);
            if (self.email === null || angular.isUndefined(self.email)){
                return;
            }

            if (self.liveshareRecipients.indexOf(self.email) > -1 || self.liveshareParticipants.indexOf(self.email) > -1) {
                $log.debug('User already added!');
                return;
            }

            self.liveshareRecipients.push(self.email);
            self.email = null;
            self.cantShare = false;
        };


        this.deleteRecipient = function(email) {

            if ((self.liveshareRecipients.length + self.liveshareParticipants.length) > (self.liveshareMaxRecipients - 1)){
                self.limitLiveshareParticipants = false;
            }

            for (var i = 0; i < self.liveshareRecipients.length; i++) {
                if (self.liveshareRecipients[i] === email){
                    self.liveshareRecipients.splice(i, 1);
                }
            }

            for (var j = 0; j < self.liveshareParticipants.length; j++) {
                if (self.liveshareParticipants[j] === email){
                    self.liveshareParticipants.splice(j, 1);
                }
            }

            $log.debug('Removing selected participant: '+ email);
        };
    }

})();
