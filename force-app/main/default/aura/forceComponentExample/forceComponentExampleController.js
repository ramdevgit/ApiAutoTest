({
    createRecord : function(component, event, helper) {
        var homeEvent = $A.get("e.force:navigateToObjectHome");
        homeEvent.setParams({
            "scope": "ramsoftsquare__Contact"
        });
        homeEvent.fire();
    }
})