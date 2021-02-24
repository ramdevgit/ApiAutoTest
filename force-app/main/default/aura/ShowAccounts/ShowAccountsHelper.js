({
    
    
    getAccounts: function(component, event, helper) {
        
        var accountList  = component.get("c.getAccounts");
        accountList.setCallback(this, function(response){
            var state = response.getState();
            if(state == 'SUCCESS'){
                var pageSize = component.get("v.pageSize");
                var paginationList =[];
                component.set('v.accountList', response.getReturnValue());
                setTimeout(function(){ 
                    $('#accountTable').DataTable();
                }, 500);    
                //var jq = jQuery.noConflict();
                //console.log('getAc', jq);
                //jq("#accountTable").DataTable();
                /*component.set("v.totalSize", component.get("v.accountList").length);
                component.set("v.start",0);
                component.set("v.end",pageSize-1);
                for(var i=0; i< pageSize; i++)
                {
                    paginationList.push(response.getReturnValue()[i]);
                }
                component.set("v.paginationList", paginationList);*/
            }
        });
        $A.enqueueAction(accountList);	
    }
    
})