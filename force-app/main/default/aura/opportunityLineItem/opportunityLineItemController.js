({
    doInit : function(component, event, helper) {
        console.log('opportunityLineItemController::doInit');
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "",
            "message": "Opportunity created succesfully",
            "type" : "success",
            "mode" : "dismissible"
        });
        toastEvent.fire();
        component.set('v.columns', [
            {label: 'Product Name', fieldName: 'Product2Name', type: 'text'},
            {label: 'List Price', fieldName: 'UnitPrice', type: 'Currency'},
            {label: 'Product Code', fieldName: 'ProductCode', type: 'text'},
            {label: 'Description', fieldName: 'Product2Description', type: 'text'}
        ]);
        var action = component.get("c.getPriceBookEntriesProduct");
        action.setParams({
            priceBookId : component.get("v.priceBookId")
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if(state == 'SUCCESS'){
                console.log('doInit::sucess::', response.getReturnValue());
                let rows = response.getReturnValue();
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    if (row.Product2) {
                        row.Product2Name = row.Product2.Name;
                        row.Product2Description = row.Product2.Description ? row.Product2.Description : '';
                    }
                    
                }
                component.set("v.totalPages", Math.ceil(rows.length/component.get("v.pageSize")));
                component.set("v.allData", rows);
                component.set("v.currentPageNumber",1);
                component.set("v.initialLoad", true);
                
                helper.setPageDataAsPerPagination(component, helper);
                
            }else if(state == 'ERROR'){
                let errorMessage = response.getError();
                console.log('doInit:Error::', errorMessage);
            }
            
        });
        $A.enqueueAction(action);
    },
    
    handleSelect : function(component, event, helper){
        console.log('handleSelect:::');
       
        //console.log('selectedLineItems::', component.get("v.selectedLineItems"), event.getParam('selectedRows'));
         
        /* new code */
        //if(!component.get("v.hasPageChanged") || component.get("v.initialLoad")){
        if(true){
            //console.log('inside:hadleSelect:', component.get("v.selectedLineItems"));

            component.set("v.initialLoad", false);
            let selectedRowsIds = component.get("v.selectedRowsIds");
            var selectedRows = event.getParam('selectedRows');
            var allSelectedRows = component.get("v.selection");
            var currentPageNumber = component.get("v.currentPageNumber");
            var i = allSelectedRows.length;
            let pageSelectedIds = [];
            if(allSelectedRows && allSelectedRows.length > 0 ){
                allSelectedRows.forEach(function(row) {
                    //if(row.Id.split("-")[1] == currentPageNumber){
                        selectedRows.push(row);
                    //}
                });
                //component.set("v.selectedRows", selectedRows);
            }
            
            console.log('tt::', allSelectedRows, 'currentPageNumber', currentPageNumber, i , selectedRows);
            /*if(i > 0){
                while (i--) {
                    let row = allSelectedRows[i];
                    var pageNumber = row.Id.split("-")[1];
                    console.log('pageNumber:::', pageNumber,'allSelectedRows.length i==', i );
                    if (pageNumber && pageNumber == currentPageNumber && selectedRowsIds.includes()) { 
                        allSelectedRows.splice(i, 1);
                    } 
                }
            }*/
            
            if(selectedRows && selectedRows.length > 0){
                selectedRows.forEach(function(row) {
                    console.log('row::', row, selectedRowsIds);
                    pageSelectedIds.push(row.Id);
                    if(selectedRowsIds && selectedRowsIds.length > 0){
                        if( !selectedRowsIds.includes(row.Id)){
                            //console.log('row:!selectedRowsIds.includes', row);
                            selectedRowsIds.push(row.Id);
                            allSelectedRows.push(row);
                        }
                    }
                    else {
                        selectedRowsIds.push(row.Id);
                        allSelectedRows.push(row);
                        //console.log('row:selectedRowsIds == []:', row);
                    }
                });
            }
            console.log('before::selectedRowsIds::', selectedRowsIds);
            selectedRowsIds.forEach(function(rowId) {
                if(!pageSelectedIds.includes(rowId) && selectedRowsIds.includes(rowId)){
                    selectedRowsIds.splice(selectedRowsIds.indexOf(rowId), 1);
                }
            });
			console.log('after::selectedRowsIds::', selectedRowsIds);
			
            console.log('before::allSelectedRows::', allSelectedRows);
            allSelectedRows.forEach(function(row) {
                if(!pageSelectedIds.includes(row.Id) && !selectedRowsIds.includes(row.Id)){
                    allSelectedRows.splice(allSelectedRows.indexOf(row), 1);
                }
            });
             console.log('after::allSelectedRows::', allSelectedRows);
            
            console.log('selectedRowsIds::', selectedRowsIds);
            console.log('allSelectedRows::', allSelectedRows);
            component.set("v.selectedRowsIds", selectedRowsIds);
            component.set("v.selection", allSelectedRows);
           
            
            component.set("v.hasPageChanged", false); //added
        } else{
             component.set("v.hasPageChanged", false);
        }
        //console.log('selectedRowsIds:1:', selectedRowsIds);
        //console.log('allSelectedRows:1:', allSelectedRows);

    },
    addProductsToOpporunity : function(component, event){
        console.log('addProductsToOpporunity::');
        var selectedRows = component.get("v.selection"); 
        let opportunityId = component.get("v.opportunityId");

        let setRows = [];
        for ( var i = 0; i < selectedRows.length; i++ ) {
            console.log('selectedRows[i]::', selectedRows[i]);
            let orderLineItemRow = {};
            orderLineItemRow['Product2Name'] = selectedRows[i].Product2Name;
            orderLineItemRow['Product2Id'] = selectedRows[i].Product2Id;
            orderLineItemRow['ProductCode'] = selectedRows[i].ProductCode;
            orderLineItemRow['ListPrice'] = selectedRows[i].UnitPrice;
            orderLineItemRow['UnitPrice'] = selectedRows[i].UnitPrice;
            orderLineItemRow['OpportunityId'] = opportunityId;
            orderLineItemRow['Description'] = selectedRows[i].Product2Description ? selectedRows[i].Product2Description : '';
            console.log('orderLineItemRow:', orderLineItemRow);
            setRows.push(orderLineItemRow);
            
        }
        component.set("v.selectedLineItems", setRows);
                console.log('addProductsToOpporunity:::',  component.get("v.selectedLineItems"));

        let selectedLineItems = component.get("v.selectedLineItems");
        if(selectedLineItems.length > 0){
            component.set("v.showOrderLineItem", true);
            component.set('v.lineItemColumns', [
                {label: 'Product', fieldName: 'Product2Name', type: 'text', editable: false },
                {label: 'Quantity', fieldName: 'Quantity', type: 'number', editable: true, typeAttributes: { required: true } },
                {label: 'List Price', fieldName: 'ListPrice', type: 'currency', typeAttributes: { currencyCode: 'USD'}, editable: true },
                {label: 'Sales Price', fieldName: 'UnitPrice', type: 'currency', typeAttributes: { currencyCode: 'USD'}, editable: true },
                {label: 'Line Description', fieldName: 'Description', type: 'text', editable: true }
            ]);
            
        }else{
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "",
                "message": "Please select products.",
                "type" : "warning",
                "mode" : "dismissible"
            });
            toastEvent.fire();
        }
        
    },
    saveOrderLineItem : function(component, event, helper){
        
        let oppLineItems = component.get("v.selectedLineItems");
        oppLineItems.forEach(row => {
            delete row['Product2Name'];
        });
        console.log('saveOrderLineItem:::::oppLineItems',oppLineItems);
        var action = component.get("c.saveOpportunityLineItems");
        var allValid = component.find('fieldId').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && !inputCmp.get('v.validity').valueMissing;
        }, true);
        if (allValid) {
            action.setParams({
                opportunityLineItems : oppLineItems
            });
            action.setCallback(this, function(response) {
                let state = response.getState();
                if(state == 'SUCCESS'){
                    console.log('sucess::', response.getReturnValue());
                    helper.navigateToOpportunity(component, helper);
                }else if(state == 'ERROR'){
                    let errorMessage = response.getError();
                    console.log('doInit:Error::', errorMessage);
                }
                
            });
        } else {
            console.log('enter All field Values::');
        }
        $A.enqueueAction(action);
    },
    
    showAddProducts: function(component, event, helper){
        console.log('showAddProducts:::');
        component.set("v.showOrderLineItem", false);
        component.set("v.selectedLineItems", []);
        component.set("v.selectedRows", []);
        component.set("v.selectedRowsIds", []);
        component.set("v.selection", []);
        
    },
    searchTable : function(cmp, event, helper) {
        console.log('searchTable::::');
        var allRecords = cmp.get("v.data");
        var searchFilter = event.getSource().get("v.value");
        console.log('searchTable:::searchFilter:', searchFilter);
        if(searchFilter != '' && searchFilter.length != 0){
            var tempArray = [];
            for( var i=0; i < allRecords.length; i++){
                if((allRecords[i].Product2Name && allRecords[i].Product2Name.indexOf(searchFilter) != -1) ||
                   (allRecords[i].ProductCode && allRecords[i].ProductCode.indexOf(searchFilter) != -1))
                {
                    console.log('allRecords[i]::', allRecords[i]);
                    tempArray.push(allRecords[i]);
                }
            }
            console.log('tempArray::', tempArray);
            cmp.set("v.data", tempArray);
            
        }else{
            cmp.set("v.data", cmp.get("v.allData"));
        }
        
    },
    navigateToOpportunity : function(component, event, helper) { 
        console.log('navigateToOpportunity::');
        helper.navigateToOpportunity(component, helper);
    },
    
    onNext : function(component, event, helper) {   
        console.log('onNext::');
        component.set("v.selectedRows", []);
        component.set("v.hasPageChanged", true);
        var pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber+1);
        helper.setPageDataAsPerPagination(component, helper);
        
    },
    
    onPrev : function(component, event, helper) {  
        console.log('onPrev::');
        component.set("v.selectedRows", []);
        component.set("v.hasPageChanged", true);
        var pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber-1);
        helper.setPageDataAsPerPagination(component, helper);
        
    },
    
    selectedPagination : function(component, event, helper) {
        console.log('selectedPagination::');
        component.set("v.selectedRows", []);
        component.set("v.hasPageChanged", true);
        component.set("v.currentPageNumber", parseInt(event.getSource().get('v.name'))); 
        helper.setPageDataAsPerPagination(component, helper);
        
        
    },
    
    onFirst : function(component, event, helper) {
        console.log('onFirst::');
        component.set("v.selectedRows", []);
        component.set("v.hasPageChanged", true);
        component.set("v.currentPageNumber", 1);
        helper.setPageDataAsPerPagination(component, helper);
        
    },
    
    onLast : function(component, event, helper) {    
        console.log('onLast::');
        component.set("v.selectedRows", []);
        component.set("v.hasPageChanged", true);
        component.set("v.currentPageNumber", component.get("v.totalPages"));
        helper.setPageDataAsPerPagination(component, helper);
        
    },
    updateTable : function(component, event, helper) {
        console.log('updateTable::');
        helper.setPageDataAsPerPagination(component, helper);
    }
})