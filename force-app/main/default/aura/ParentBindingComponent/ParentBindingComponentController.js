({
	bindValue : function(cmp, event, helper) {
        console.log('bindValue:::');
        cmp.set("v.valueChange", true);
        console.log('inputValue:::', cmp.find("inputValue").get("v.value"));
        cmp.set("v.textValue", cmp.find("inputValue").get("v.value"));
	}
})