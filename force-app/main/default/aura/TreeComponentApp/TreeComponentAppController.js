({
	handleClick : function(component, event, helper) {
		var navigate =  event.getSource().get("v.title");
        console.log(navigate);
        component.set("v."+navigate.toString(), true);
	}
})