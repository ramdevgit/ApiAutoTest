({
    getInitialValues: function(component, event, helper) {
        console.log(':::getInitialValues');
        let action = component.get("c.getPickListValuesIntoMap");
        action.setCallback(this, function(response){
            let state = response.getState();
            console.log('getInitailValues::setCallback::', state);
            if(state == "SUCCESS"){
                let wrapperClass = response.getReturnValue();
                console.log('pickListValueMap::', wrapperClass);
                component.set("v.wrapperClass", wrapperClass);
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
        $A.enqueueAction(action);
    },
    saveRecord: function(component, mobileBrand){
        console.log('MobileBrandComponentHelper::saveRecord::');
        let action = component.get('c.saveMobileBrand');
        action.setParams({mobileOrder: mobileBrand});
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state == "SUCCESS"){
                console.log('save Successfully');
                location.reload();
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
        $A.enqueueAction(action);
    }
})