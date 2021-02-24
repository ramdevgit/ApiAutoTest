({
    doInit: function(cmp, event, helper) {
        
        console.log('NestedTreeComponent:::', JSON.parse(JSON.stringify(cmp.get("v.item"))) );
        
    },
    selectNested : function(cmp, event, helper) {
        cmp.set("v.showChild",true);
       
    }
})