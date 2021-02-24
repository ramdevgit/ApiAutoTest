({
	doInit : function(cmp, event, helper) {
        cmp.set("v.columns",[
            {label: 'Opportunity Name', fieldName: 'Name', type: 'text'},
			{label:'Account Name', fieldName:'StageName', type:'text'},
            {label:'Account Name', fieldName:'CloseDate', type:'date'}
        ]);
        let recordId = cmp.get("v.recordId");
        let action = cmp.get("c.getAccountOpportunities");
        action.setParams({accId:recordId});
        action.setCallback(this, function(response){
           let state = response.getState();
            if(state=== 'SUCCESS'){
                console.log('PaymentConsoleOpportunityController::doInit:opporutnityList', response.getReturnValue());
                cmp.set("v.recordList", response.getReturnValue());
                
            }else if(state ==='ERROR'){
                console.log('PaymentConsoleOpportunityController::doInit:ERROR', state);
            }
        });
        $A.enqueueAction(action);
	}
})