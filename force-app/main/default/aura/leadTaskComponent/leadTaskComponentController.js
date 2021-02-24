({
    doInit : function(component, event, helper) {
        console.log('leadTaskComponent::doInit::recordId', component.get("v.recordId"));
        if(component.get("v.recordId") != null){ 
            var action = component.get("c.getTasks");
            action.setParams({
                leadId : component.get("v.recordId")
            });
            action.setCallback(this, function(response) {
                let state = response.getState();
                if(state == 'SUCCESS'){
                    console.log('doInit::sucess::', response.getReturnValue());
                    helper.showToast(component, 'Success', 'Tasks Completed Successfully.', 'success');
                }else if(state == 'ERROR'){
                    let errorMessage = response.getError();
                    console.log('doInit:Error::', errorMessage);
                   helper.showToast(component, 'Error', errorMessage, 'error');
                }
               
            });
            $A.enqueueAction(action);
            
        }
    }
})