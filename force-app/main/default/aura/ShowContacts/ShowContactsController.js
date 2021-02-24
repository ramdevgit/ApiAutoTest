({
	getAllContacts: function(component, event, helper) {
        console.log('--getAllContacts---controller');
        //helper.getAllContact(component, event, helper);
        const apexServiceCmp = component.find("apexServiceCmp");
        var action = component.get("c.getContacts");
        apexServiceCmp.callServer(
        	action,
            {},
            false,
            $A.getCallback(function(response){
                console.log('::getContacts::', response.listContact);
				component.set("v.contactList", response.listContact);
            }),
            null,
            false,
            false,
            false
        );
        //console.log('--getAllContacts---helper--after component.get("c.getContacts") ');
        //$A.enqueueAction(contactList);

		//helper.getContacts(component, event, helper);	*/
	},
    
    doInit: function(component, event, helper){
   		component.set('v.columns', [
    		{label: 'Contact Name', fieldName: 'Name', type: 'text'},
		    {label: 'Account Name', fieldName: 'Account.Name', type: 'text'},
 			{label: 'Country', fieldName: 'Country__c', type: 'text'}
    	]);
	},
    
    updateSelectedText:function(component, event, helper){
		var selectedRows = event.getParam('selectedRows');
        component.set('v.selectedRowsCount', selectedRows.length);
    }
})