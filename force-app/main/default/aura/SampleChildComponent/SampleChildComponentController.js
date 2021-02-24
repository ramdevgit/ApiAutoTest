({
	fireComponentEvent : function(component, event, helper) {
        console.log('componentEvent');
		var componentEvents = component.getEvent("eventFired");
        console.log('fireComponentEvent:::', componentEvents );
        componentEvents.setParams({"message ":"Child Event Fired"});
        componentEvents.fire();
	}
})