({
   
    handleErrors : function(params, errors) {
        let self = this;
        // Display error if applicable
        if (params.disableErrorNotification === true) {
            return;
        }
        
        // Retrieve and display the error message(s) sent by the server
        let isUnknownError = true;
        if (typeof errors !== 'undefined' && Array.isArray(errors) && errors.length > 0) {
            errors.forEach(function(error) {
                // Check for 'regular' errors
                if (typeof error.message !== 'undefined') {
                    self.displayError(error.message, params);
                    isUnknownError = false;
                }
                // Check for 'pageError' errors
                const pageErrors = error.pageErrors;
                if (typeof pageErrors !== 'undefined' && Array.isArray(pageErrors) && pageErrors.length > 0) {
                    pageErrors.forEach(function(pageError){
                        if (typeof pageError.message !== 'undefined') {
                            self.displayError(pageError.message, params);
                            isUnknownError = false;
                        }
                    });
                }
            });
        }
        // Make sure that we display at least one error message
        if (isUnknownError) {
            self.displayError('Unknown error', params);
        }
        
    },
    
    displayError : function(errorMessage, actionParams) {
        
        const toastEvent = $A.get("e.force:showToast");
        if (typeof toastEvent !== 'undefined') {
            toastEvent.setParams({
                title : 'Server Error',
                message : errorMessage,
                type : 'error',
                mode: 'sticky'
            });
            toastEvent.fire();
        }
    },
    getDataFromServer : function(component, method, callback, params )
    {
        var action = component.get(method);
        if (params) {
            action.setParams(params);
        }
        action.setCallback(this,function(response)
        {
            var state = response.getState();
            if (state === "SUCCESS") {
                callback.call(this,response.getReturnValue());  
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    alert('errors'+errors);   
                }
            }
        });
        $A.enqueueAction(action);
    }
    
})