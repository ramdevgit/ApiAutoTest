({
    doInit: function(component, event, helper) {
        helper.getInitialValues(component, event, helper);
    },
    colorChange: function(component, event, helper) {
        //let changedColor = component.find("selectedColor").get("v.value");
        console.log('changeColor:::', changedColor);
    },
    changeMultiPickValue: function(component, event, helper){
        let selectedOptionValue = event.getParam("value");
        console.log('selectedOptionValue:::', selectedOptionValue.toString());
        component.set("v.selectedInsideBox", selectedOptionValue);
        
    },
    
    saveRecord: function(component, event, helper) {
        let validExpense = component.find('mobileform').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if(validExpense){
            let mobileBrand = JSON.stringify(component.get('v.mobileBrand'));
            helper.saveRecord(component, mobileBrand);
        }
    }
    
})