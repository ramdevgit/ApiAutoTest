({
    doInit : function(cmp, event, helper) {
    },
    selectSection: function(cmp, event, helper){
        var selectedSection = event.target.id;
        cmp.showSelectionMethod(selectedSection);
        /*var action = $A.get("e.c:accordionApplicationEvent");
        action.setParams({showSelection:selectedSection});
		action.fire();*/
        console.log("accordionComponentController::selectSection::", selectedSection);
    },
    handleShowActiveSectionName: function(cmp, event, helper){
        var selectedSection = event.target.id;
        alert(cmp.get("v.showSection"));
    },
    showSelectionEvent: function(cmp, event, helper){
        console.log('accordionComponentController::showSelectionEvent');
        var param  = event.getParam("showSelection");
        console.log('accordionComponentController::showSelectionEvent::params', param);
        cmp.set("v.showSection", param);
    },
    selectSectionMethodAction:function(cmp, event, helper){
        var params = event.getParam("arguments");
        console.log('accordionComponentController::selectSectionMethodAction::params', params.section);
        cmp.set("v.showSection",  params.section);
        
    }
})