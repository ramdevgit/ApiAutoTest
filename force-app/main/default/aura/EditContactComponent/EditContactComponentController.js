({
    doInit: function(component, event, helper){
        console.log('doInit::eventPhase', event.getPhase());
        var contact = JSON.parse(component.get("v.contactRecord"));
        console.log('contact', contact.Account.Name);
        component.set("v.accountSelected",true);
        component.set("v.contactRecord", contact);
        component.set("v.contactRecord.AccountId", contact.Account.Id);
        component.set("v.contactRecord.AccountName", contact.Account.Name);
        
    },
    searchAccounts: function(component, event, helper){
      
        //console.log('searchAccounts::eventPhase', event.getPhase());
        var action = component.get("c.getAccounts");
        var accountName = document.getElementById('accountName').value;
        console.log('SerachAccounts:::', accountName);
        action.setParams({searchAccountName : accountName});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == "SUCCESS"){
                var accountList = JSON.parse(response.getReturnValue());
				console.log('searchAccounts::getAccounts::', accountList);
                if(accountList !==null){
                    component.set("v.accountList", accountList);
                    component.set("v.showAccoutList", true);
                }
                else if(accountList === null){
                     component.set("v.showAccoutList", false);
                }
                
            }
        });
        $A.enqueueAction(action);  
    },
    handleLookupSelectEvent: function(component, event, helper) {
        console.log('handleLookupSelectEvent::eventPhase', event.getPhase());
        var selectedRecordId = event.getParam("recordId");
        var selectedrecordName = event.getParam("recordName");
        component.set("v.contactRecord.AccountId", selectedRecordId);
        component.set("v.contactRecord.AccountName", selectedrecordName);
        component.set("v.showAccoutList", false);
        component.set("v.accountSelected", true);
    },
    selectAccountHideExist: function(component, event, helper) {
		component.set("v.showAccoutList", false);
    	component.set("v.accountSelected", false);
    },
    
    saveRecord: function(component, event, helper) {
        console.log('save method');
        var validExpense = component.find('editform').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if(validExpense){
            //var chandAccountId = component.find("selectAccount").get("v.value");
            //component.set("v.contactRecord.AccountId", chandAccountId);
            var updateContact = JSON.stringify(component.get("v.contactRecord"));
            //console.log('chageAccountId:::', chandAccountId);
            console.log('updateContact:::', updateContact);
            helper.updateContact(component, updateContact);
        }
        console.log('save:::', JSON.stringify(component.get("v.contactRecord")));
        
        
    },
    cancel: function(component, event, helper) {
		console.log('cancel::eventPhase', event.getPhase());
        console.log('cancel EditContactComponentController');
        var cancelEvent = component.getEvent("closeEditEvent");
        cancelEvent.fire();
    }
})