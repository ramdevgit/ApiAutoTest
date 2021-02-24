({
	updateContact : function(component, updateContact) {
        var action = component.get("c.saveRecord") 
	    action.setParams({ record : updateContact});
        action.setCallback(this, function(response){
        	var state = response.getState();
            if(state == "SUCCESS"){
                console.log('save Successfully');
                location.reload();
                var cancelEvent = component.getEvent("closeEditEvent");
                cancelEvent.fire();
                
            }
        });
        $A.enqueueAction(action);
	}
    
})