({
        getContacts: function(component, event, helper) {
            console.log(':::getContacts:::helper');
            console.log('getContacts::event Phase::::', event.getPhase());
            var action = component.get("c.getContacts");
            action.setCallback(this, function(response){
                var state = response.getState();
                if(state == "SUCCESS"){
                    console.log(':::contactList', response.getReturnValue());
                    component.set("v.contactList", response.getReturnValue());   
                }            
            });
            $A.enqueueAction(action);
        },
        editContact: function(component, event, helper){
            console.log('editContact::event Phase::::', event.getPhase());
            console.log('editContactdata:::', JSON.stringify(event.getSource().get("v.value")));
            component.set("v.editContact", JSON.stringify(event.getSource().get("v.value")));
            component.set("v.editableContact", true);
            var componentModal = component.find('Modalbox');
            var componentBack = component.find('Modalbackdrop');
            $A.util.addClass(componentModal, 'slds-fade-in-open');
            $A.util.addClass(componentBack, 'slds-backdrop'); 
            	
            
        },
        cancelEditContact: function(component, event, helper){
            console.log('cancelEditContact::event Phase::::', event.getPhase());
            console.log('editableContactFalse');
            component.set("v.editableContact", false);
            var componentModal = component.find('Modalbox');
            var componentBack = component.find('Modalbackdrop');
            $A.util.removeClass(componentModal,'slds-fade-in-open');
            $A.util.removeClass(componentBack, 'slds-backdrop'); 
    
        }
    })