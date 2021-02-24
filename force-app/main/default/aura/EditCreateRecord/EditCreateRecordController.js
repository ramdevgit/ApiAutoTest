({
    doInit:function(cmp, event, helper) {
                console.log('EditCreatedRecordController:::saveRecord',cmp.get("v.record"));

        let action = cmp.get("c.getFieldValues");
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                cmp.set("v.wrapperClass", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    saveContactRecord : function(cmp, event, helper) {
        console.log('EditCreatedRecordController:::saveRecord');
        console.log('EditCreatedRecordController:::saveRecord', JSON.parse(JSON.stringify(cmp.get("v.record"))));
        let validExpense = cmp.find('editform').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        console.log('EditCreatedRecordController:::saveRecordvalidExpense', validExpense);
        
        if(validExpense){     
            console.log('EditCreatedRecordController:::saveRecordvalidExpense', validExpense);
            var action = cmp.get("c.saveRecord");
            action.setParams({record : JSON.stringify(cmp.get("v.record"))});
            action.setCallback(this, function(response){
                let state = response.getState();
                console.log('EditCreatedRecordController:::saveRecordvalidExpense', state);
                if(state === "SUCCESS"){
                    console.log('Record Saved Successfully');
                    location.reload();
                    var cancelEvent = cmp.getEvent("closeEditEvent");
                    cancelEvent.fire();	
                }
                else if(state == "ERROR"){
                    let errors = response.getError();
                    let message = 'Unknown error'; 
                    if (errors && Array.isArray(errors) && errors.length > 0) {
                        message = errors[0].message;
                    }
                    console.error(message);
                }
            });
        }
        
        $A.enqueueAction(action);
    }
})