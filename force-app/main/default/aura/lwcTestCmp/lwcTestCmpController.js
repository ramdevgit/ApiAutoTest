({
	handleClick : function(component, event, helper) {
        console.log('handleClick::::', window.location.pathname);
        window.open(window.location.pathname,"_blank");
	}
})