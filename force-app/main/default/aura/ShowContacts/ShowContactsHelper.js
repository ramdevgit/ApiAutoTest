({
	getContacts: function(component, event, helper) {
        console.log('--getAllContacts---helper');
		var contactList = component.get("c.getContacts");
        console.log('--getAllContacts---helper--after component.get("c.getContacts") ');
        contactList.setCallback(this, function(response){
        	var responseState = response.getState();
            if(responseState == "SUCCESS"){
                console.log('::getContacts::', response.getReturnValue() );
				component.set("v.contactList", response.getReturnValue());
            }
        });
        
        $A.enqueueAction(contactList);
	},
    getAllContact : function(component, event, helper) {
        //Calling base component's helper method
        helper.getDataFromServer(component,
                                 "c.getContacts",
                                 function(response){
                                     if(response){
                                         console.log('ShowContactHelper::getAllcontact::', response);
                                         component.set("v.contactList", response);
                                     }
                                 }
                                );
    }
    
    
})