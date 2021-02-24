({
    doInit : function(cmp, event, helper) {
        cmp.set("v.columns",[
            {label: 'Contact Name', fieldName: 'Name', type: 'text'},
            {label:'Is Primary Contact', fieldName:'ramsoftsquare__Is_Primary_Contact__c', type:'boolean'},
            {label:'Is Miner', fieldName:'ramsoftsquare__Is_Miner__c', type:'boolean'}
        ]);
        let accountId = cmp.get("v.recordId");
        console.log("PaymentConsoleDemoController.js::accountId", accountId);
        let action = cmp.get('c.getAccountContacts');
        action.setParams({accId: accountId});
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state==='SUCCESS'){
                console.log('PaymentConsoleDemoController::accountContacts::', response.getReturnValue());
                cmp.set("v.recordList", response.getReturnValue());
            }else if(state =='ERROR'){
                console.log('PaymentConsoleDemoController::');
            }
        });
        $A.enqueueAction(action);
        
    }
})