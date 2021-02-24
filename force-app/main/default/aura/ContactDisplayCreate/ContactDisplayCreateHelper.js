({
    getContacts : function(component) {
        var action = component.get("c.getContactsLastModified");
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state == "SUCCESS"){
                console.log('ContactDisplayCreateController::', response.getReturnValue());
                var pageSize = component.get("v.pageSize");
                var paginationList =[];
                var wrapperClass = response.getReturnValue();
                console.log('wrapperClass::listContact.length', wrapperClass.listContact.length);
                component.set('v.wrapperClass', response.getReturnValue());
                component.set("v.totalSize", wrapperClass.listContact.length);
                component.set("v.start",0);
                component.set("v.end",pageSize-1);
                for(var i=0; i< pageSize; i++)
                {
                    paginationList.push(wrapperClass.listContact[i]);
                }
                component.set("v.paginationList", paginationList);
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
    deleteRecord : function(cmp, selectedRecord){
        var deleteAction = cmp.get("c.deleteRecord");
        deleteAction.setParams({record: selectedRecord});
        deleteAction.setCallback(this, function(response){
            console.log('ContactDisplayCreate::DeleteRecord:::setCallback');
            let state = response.getState();
            console.log('ContactDisplayCreate::DeleteRecord:::setCallback::state', state);
            
            if(state === "SUCCESS"){
                console.log('ContactDisplayCreate::DeleteRecord:::setCallback::state', state);
                
                cmp.set("v.isCreate", false);
                cmp.set("v.showEditable", false);
                
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
        $A.enqueueAction(deleteAction);  
    }
})