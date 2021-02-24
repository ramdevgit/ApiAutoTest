({
	render : function(cmp, helper) {
       console.log('render::leadTaskComponentRenderer::');
       return this.superRender();

    },
    unrender: function (component, helper) {
        console.log('unRender::leadTaskComponentRenderer::');
        this.superUnrender();
        helper.navigateToOpportunity(component, helper);
    }
})