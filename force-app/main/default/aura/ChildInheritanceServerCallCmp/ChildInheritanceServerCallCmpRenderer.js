({
	// Your renderer method overrides go here
    render: function(cmp, helper){
        console.log('render:');
        return this.superRender();
    }
})