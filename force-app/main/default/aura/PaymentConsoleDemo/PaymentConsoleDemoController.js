({
    init : function(cmp, event, helper) {
        console.log("PaymentCosoleDemoController.js:::init::");
        var items = [{
            "label": "Status",
            "name": "1",
            "expanded": false,   
            "items": [{
                "label":"statusChild1",
                "name":"2",
                "expanded":false,
                "items":[]
            },{
                "label":"statusChild2",
                "name":"3",
                "expanded":false,
                "items":[]
            }]
        }, {
            "label": "Sub-Accounts Transactions",
            "name": "4",
            "expanded": false,
            "items": [{
                "label": "Account Deposits(18)",
                "name": "5",
                "expanded": false,
                "items" :[{
                    "label": "Account Deposits Child 1",
                	"name": "6",
                	"expanded": false
                },{
                    "label": "Account Deposits Child 2",
                	"name": "7",
                	"expanded": false
                }]
            },{
                "label": "Fees(24)",
                "name": "8",
                "expanded": true,
                "items" :[{
                    "label": "Admin(4)",
                    "name": "9",
                    "expanded": false,
                    "items" :[{}]
                }, {
                    "label": "Attorney",
                    "name": "10",
                    "expanded": true,
                    "items" :[{}]
                }, {
                    "label": "Maintenance(12)",
                    "name": "11",
                    "expanded": false,
                    "items" :[{
                        "label": "Deposits(6)",
                        "name": "12",
                        "expanded": false,
                        "items":[{
                            "label": "1/1/19",
                            "name": "13",
                            "expanded": false,
                            "items":[]
                        },{
                            "label": "1/15/19",
                            "name": "14",
                            "expanded": false,
                            "items":[]					
                        }, {
                            "label": "(etc)",
                            "name": "15",
                            "expanded": false,
                            "items":[]					
                        }]
                    },{
                        "label": "Payments(6)",
                        "name": "16",
                        "expanded": false,
                        "items":[{}]	  
                        
                    }]
                },{
                    "label": "Processor(6)",
                    "name": "17",
                    "expanded": false,
                    "items":[{}]	
                }]
                
            },{
                "label": "Settled Tradelines(1)",
                "name": "18",
                "expanded": false,
                "items":[{
                    "label": "AMEX",
                    "name": "19",
                    "expanded": true,
                    "items":[{
                        "label": "Drafts(12)",
                        "name": "20",
                        "expanded": false,
                        "items":[{
                        }]	
                    },{
                        "label": "Pmts(12)",
                        "name": "21",
                        "expanded": false,
                        "items":[{
                            "label": "1/7/19",
                            "name": "22",
                            "expanded": false
                        },{
                            "label": "1/31/19",
                            "name": "23",
                            "expanded": false
                        },{
                            "label": "(etc)",
                            "name": "24",
                            "expanded": false
                        }]	
                    }]	
                }]	
            },{
                "label": "Unsetteled Tradelines(2)",
                "name": "25",
                "expanded": false,
                "items":[{
                    "label": "Bank of America",
                    "name": "26",
                    "expanded": false
                	},{
                    "label": "Paypal",
                    "name": "27",
                    "expanded": false
                }]
            }]
        }];
        
        cmp.set("v.items", items);
        cmp.set("v.columns",[
              	 {label: 'Contact Name', fieldName: 'Name', type: 'text'},
            	 {label: 'Account name', fieldName: 'Account.Name', type: 'text'}
        	]);
        let accountId = cmp.get("v.accountId");
        console.log("PaymentConsoleDemoController.js::accountId", accountId);
        let action = cmp.get('c.getAccountContacts');
        action.setParams({accId: accountId});
        action.setCallback(this, function(response){
           let state = response.getState();
            if(state==='SUCCESS'){
                console.log('PaymentConsoleDemoController::accountContacts::', response.getReturnValue());
                cmp.set("v.contactRecord", response.getReturnValue());
            }else if(state =='ERROR'){
                console.log('PaymentConsoleDemoController::');
            }
        });
        $A.enqueueAction(action);
    }
});