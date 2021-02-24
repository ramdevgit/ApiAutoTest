({
    doInit : function(component, event, helper) {
        $A.createComponent(
            "lightning:button",
            {
                "aura:id": "findableAuraId",
                "label": "Press Me",
                "onclick": component.getReference("c.handlePress")
            },
            function(newButton, status, errorMessage){
                if(status == "SUCCESS"){
                    var body = component.get("v.body");
                    body.push(newButton);
                    component.set("v.body", body);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                    else if (status === "ERROR") {
                        console.log("Error: " + errorMessage);
                    }
                
            }
        );
    },
    handlePress:function(component, event, helper){
        
        
        let cmpList1 = [];
        let cmpName = "lightning:select";
        let attributes = {
            "aura:id":"optionselect",   
            "label": "Select List",
            "name": "list1",
            "onchange": component.getReference("c.handleSelect")
        } 
        let ltngSelect = [cmpName, attributes];
        cmpList1.push(ltngSelect);
        
        for(var i = 0; i < 10010; i++){
            let tagName = "option";
            let optionAttr = {"value" : "option "+i, "label" : "option "+i}
            let optionTags = [tagName, optionAttr];
            cmpList1.push(optionTags);
        }
        
        console.log("cmpList:::", cmpList1);
        
        /*var cmpList=component.get("v.body");
        for(let i=0;i<10;i++){
            $A.createComponent("option",
                               { value: "Option"+i, label: "Option"+i },
                               function(newOption, status, errorMessage){
                                   if(status == "SUCCESS"){
                                       console.log('handlePress::option::function::',JSON.parse(JSON.stringify(cmpList)));
                                      // var body = component.get("v.body");
                                       cmpList.push(newOption);
                                       //component.set("v.body", body);
                                   }
                                   else if (status === "INCOMPLETE") {
                                       console.log("No response from server or client is offline.")
                                   }
                                       else if (status === "ERROR") {
                                           console.log("Error: " + errorMessage);
                                       }
                               });
                               }*/
        
        
        $A.createComponents(
            cmpList1,
            function(components) {
                let optionsTag = components.splice(1,components.length-1);
                console.log("optionsTag::::", optionsTag);
                components[0].set("v.body", optionsTag);
                component.set("v.body", components[0]);
            }
            
        );
    },
    handleSelect: function(component, event, helper){
        console.log('DynamicCreateComponentController::handleSelect::', component.find("optionselect").get("v.value"));    
    },
    
    handleComponent : function(component, event, helper) {
        $A.createComponent(
            "ui:outputText",
            {
                "aura:id": "inpId",
                "value": "CustomComponent",
                "readOnly": "true",
                "labelClass":"slds-form-element__label",
                "placeholder":"Enter Some Text",
                "label": "Enter some text",
                "class": "slds-input"
            },
            function(newInp, status, errorMessage){
                if (status === "SUCCESS") {
                    var body = component.get("v.body");
                    body.push(newInp);
                    component.set("v.body", body);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                    else if (status === "ERROR") {
                        console.log("Error: " + errorMessage);
                    }
            }
        );
    },
    handleDestroy : function(component, event, helper){
        component.destroy();
        component.destroy();
    },
    handleDestroywithfacet:function(component, event, helper){
        
        var body = component.get("v.body");
        body.shift();
        component.set("v.body", body);
    },
    lightningQuickCancel: function(component, event, helper) {
        console.log(':::lightningQuickCancel:::');
        var cancelAction = $A.get("e.force:closeQuickAction");
        cancelAction.fire();
    }
    
})