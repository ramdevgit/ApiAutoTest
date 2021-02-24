({
	render: function(cmp, helper) {
        console.log('RendererComponentRenderer.js:::::::render method');
       helper.changeValue(cmp);
       return this.superRender();
    },
    rerender: function(cmp, helper) {
        console.log('RendererComponentRenderer.js::::::rerender method'); 
        return this.superRerender();
    },
    afterRender: function(cmp,helper){
        console.log('RendererComponentRenderer.js:::::afterRenderMethod');
        return this.superAfterRender();
    },
    unrender: function(cmp, helper){
        cosole.log('RendererComponentRenderer.js::unrender');
        return this.superUnrender();

    }
    
})