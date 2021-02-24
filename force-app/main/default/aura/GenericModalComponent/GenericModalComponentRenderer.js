({
    // Your renderer method overrides go here
    render:function(cmp, event, helper){
        console.log('GenericModalComponentRenderer::render');
        return this.superRender();
    },
    afterRender:function(cmp, event, helper){
        console.log('GenericModalComponentRenderer::afterRender');
        return this.superAfterRender();
    },
    rerender:function(cmp, event, helper){
        console.log('GenericModalComponentRenderer::rerender');
        return this.superRerender();
    },
    unrender:function(cmp, event, helper){
        console.log('GenericModalComponentRenderer::unrender');
        return this.superUnrender();
    }
})