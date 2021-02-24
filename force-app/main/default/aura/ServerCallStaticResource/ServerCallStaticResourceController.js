({
    afterScriptsLoaded: function(component, event, helper) {
        console.log('ServerCallStaticResourceController::before');
        var service = new getAccountSource(component);
        console.log('ServerCallStaticResourceController::after');
        console.log("service", service);
        service.findAll($A.getCallback(function(error,data) {
            console.log(data);
            component.set("v.account", data);    
            console.log("com", component.get("v.account"));
        }));
    }
})