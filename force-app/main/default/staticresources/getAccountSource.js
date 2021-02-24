window.getAccountSource = function(component) {
    return {
        findAll: function(callback) {
            var action = component.get("c.getPicklist");
            action.setCallback(this, function(response) {
                if (response.getState() === "SUCCESS") {
                    callback(null, response.getReturnValue());
                } else {
                    callback(response.getError());
                }
            });
            $A.enqueueAction(action);
        },
    };
}