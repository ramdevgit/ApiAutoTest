({
	handleEvent : function(component, event, helper) {
         console.log('name::::');
		var name = event.getParam("message");
        console.log('name::::', JSON.stringify(name));
        component.set("v.ParentAttribute", name);
	}
})