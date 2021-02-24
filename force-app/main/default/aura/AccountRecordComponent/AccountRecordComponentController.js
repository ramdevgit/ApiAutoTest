({
	fetchAccountInfo : function(component, event, helper) {
		var recordId = component.get("v.recordId");
        var action = component.get("c.getAccountInfo");
        action.setParams({
            accId : recordId
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == "SUCCESS"){
            var result = response.getReturnValue();
            component.set("v.record", result);
            }
            else
            alert(state);
            
        });
         $A.enqueueAction(action);
	},
    
    editRecord: function(component, event, helper){
        var recordId = component.get("v.recordId");
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({"recordId": recordId});
        editRecordEvent.fire();
    }
})