({
	doInit: function(component, event, helper) {
		helper.getContacts(component, event, helper);
	},
    editContact: function(component, event, helper) {
		helper.editContact(component, event, helper);
	},
    handleCancelEditEvent: function(component, event, helper){
        console.log('handleCancelEditEvent');
        helper.cancelEditContact(component, event, helper);
	}
})