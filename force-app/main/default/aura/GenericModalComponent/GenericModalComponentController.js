({
    doInit: function(component, event, helper) {
        console.log('GenericModalComponentController::doInit::');
        component.set("v.showModal", true);
    },
    handleCloseEvent : function(component, event, helper) {
        console.log('GenericModalComponentController::handleCloseEvent::');
        component.set("v.showModal", false);
        var cancelEvent = component.getEvent("closeEditEvent");
        cancelEvent.fire();
        component.destroy();
        
    }
    
})