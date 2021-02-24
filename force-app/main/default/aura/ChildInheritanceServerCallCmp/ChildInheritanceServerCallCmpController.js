({
    doInit : function(component, event, helper) {
        console.log('searchAccounts get called in doInit');
        component.set('v.columns', [
            {label: 'Contact Name', fieldName: 'Name', type: 'text'},
            {label: 'Account Name', fieldName: 'Account.Name', type: 'text'},
            {label: 'Country', fieldName: 'Country__c', type: 'text'}
        ]);
    },
    getAllContacts:function(component, event, helper){
        helper.callToServer(
            component,
            "c.getContacts",
            function(response) {
                console.log(' ChildInheritanceServerCallCmpController doInit:'+ JSON.stringify(response.listContact));
                //var apexResponse = JSON.stringify(response.listContact);
                component.set("v.returnedRecords", response.listContact);
            }, 
            {
                //acname: component.get("v.searchValue")
            }
        ); 
    }
    
    
})