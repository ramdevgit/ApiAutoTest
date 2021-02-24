({
    doInit: function(cmp, event, helper) {
        console.log('EditContactRecordEditFormController:::doInit', JSON.parse(cmp.get("v.contact")));
        cmp.set('v.contact', JSON.parse(cmp.get("v.contact")));
    },

	handleLoad: function(cmp, event, helper) {
        cmp.set('v.showSpinner', false);
    },

    handleSubmit: function(cmp, event, helper) {
        cmp.set('v.disabled', true);
        cmp.set('v.showSpinner', true);
    },

    handleError: function(cmp, event, helper) {
        // errors are handled by lightning:inputField and lightning:nessages
        // so this just hides the spinnet
        cmp.set('v.showSpinner', false);
    },

    handleSuccess: function(cmp, event, helper) {
        cmp.set('v.showSpinner', false);
        location.reload();
        //cmp.set('v.saved', true);
    },
    cancel: function(cmp, event, helper){
        var cancelEvent = cmp.getEvent("closeEditEvent");
        cancelEvent.fire();
    }
})