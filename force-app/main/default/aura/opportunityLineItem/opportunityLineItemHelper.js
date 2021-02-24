({
    setPageDataAsPerPagination : function(component, helper) {
        var data = [];
        var pageNumber = component.get("v.currentPageNumber");
        var pageSize = component.get("v.pageSize");
        let allData = component.get("v.allData");
        var x = (pageNumber-1)*pageSize;
        //creating data-table data
        for(; x<=(pageNumber)*pageSize; x++){
            let rowData = allData[x];
            if(rowData){
                if(rowData.Id.includes('-')){
                    let index = rowData.Id.indexOf('-');
                   	rowData.Id = rowData.Id.substring(0, index != -1 ? index : rowData.Id.length);
                    rowData.Id = rowData.Id+'-'+pageNumber;
                }else{
					rowData.Id = rowData.Id+'-'+pageNumber;
                }
                data.push(rowData);
            }
        }
        component.set("v.data", data);
        console.log('setPageDataAsPerPagination::data::', data);
        helper.generatePageList(component, pageNumber, helper);
    },
    
    generatePageList : function(component, pageNumber, helper){
        console.log('generatePageList:::pageNumber', pageNumber);
        pageNumber = parseInt(pageNumber);
        var pageList = [];
        var totalPages = component.get("v.totalPages");
        if(totalPages > 1){
            if(totalPages <= 10){
                var counter = 2;
                for(; counter < (totalPages); counter++){
                    pageList.push(counter);
                } 
            } else{
                if(pageNumber < 5){
                    pageList.push(2, 3, 4, 5, 6);
                } else{
                    if(pageNumber>(totalPages-5)){
                        pageList.push(totalPages-5, totalPages-4, totalPages-3, totalPages-2, totalPages-1);
                    } else{
                        pageList.push(pageNumber-2, pageNumber-1, pageNumber, pageNumber+1, pageNumber+2);
                    }
                }
            }
        }
        component.set("v.pageList", pageList);
        console.log("generatePageList::pageList::", pageList);
        helper.changeSelectedRows(component, pageNumber);
    },
    changeSelectedRows : function(component, pageNumber){
         let selectedRowsIds = component.get("v.selectedRowsIds");
        console.log('changeSelectedRows::selectedRowsIds:', selectedRowsIds, 'pageNumber', pageNumber);
        let selectedRows = [];
        let pageSelectedIds = [];
        let displayData = component.get("v.data");
        displayData.forEach(function(row) {
            console.log(' selectedRowsIds.includes::row.Id', row.Id);
            if(selectedRowsIds && selectedRowsIds.length > 0 && selectedRowsIds.includes(row.Id) 
              	){
                console.log(' selectedRowsIds.includes::inside', row.Id);
                selectedRows.push(row);
                pageSelectedIds.push(row.Id);
            }
        });
       // component.set("v.selectedRows", selectedRows);
        component = component.find("productTable");
        component.set("v.selectedRows", pageSelectedIds);
        console.log('changeSelectedRows::selectedRows::', selectedRows, 'selectedRowsIds', selectedRowsIds);
    },
    navigateToOpportunity : function(component, helper){
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": component.get("v.opportunityId")
        });
        navEvt.fire();
    }
})