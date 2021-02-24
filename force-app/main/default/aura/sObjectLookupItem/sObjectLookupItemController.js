({
    getValues: function (component) {
        console.log('sobejectLookupItemController::getValues');
        var record = component.get("v.record");
        console.log('recordItems', record);
    },
    handleSelect: function (component,event) {
        console.log('sobejectLookupItemController::handleSelect');
        var chooseEvent = component.getEvent("lookupSelect");
        chooseEvent.setParams({
            "recordId" : component.get("v.record.Id"),
            "recordName":component.get("v.record.Name")
        });
		console.log('recordID', component.get("v.record.Id"),'recordName', component.get("v.record.Name"));
        chooseEvent.fire();
    }
    
})