({
    doInit : function(cmp, event, helper) {
        console.log('ContactDisplayCreateController::doInit');
        helper.getContacts(cmp);
        
    },
    createRecord: function(cmp, event, helper){
        cmp.set("v.showEditable", true);
        cmp.set("v.isEdit", false);
        cmp.set("v.isCreate", true);
    },
    handleCancelEditEvent: function(cmp, event, helper){
        cmp.set("v.showEditable", false);
        cmp.set("v.isEdit", false);
        cmp.set("v.isCreate", false);
        
    },
    handleEditDelete: function(cmp, event, helper){
        var selectedAction =  event.detail.menuItem.get("v.label");
        var selectedIndex = event.getParam("value");
        var recordList = cmp.get("v.wrapperClass.listContact");
        console.log('ContactDisplayCreate::EditRecord:::selectedAction', selectedAction,'selectValue',selectedIndex,'source',event.getSource() );
        if(selectedAction === 'Edit'){
            console.log('ContactDisplayCreate::EditRecord:::Edit');
            cmp.set("v.showEditable", true);
            cmp.set("v.isCreate", false);
            cmp.set("v.isEdit", true);
            cmp.set("v.editRecord", recordList[selectedIndex]);
            
        }
        else if(selectedAction === 'Delete'){
            console.log('ContactDisplayCreate::DeleteRecord:::Delete',selectedIndex);
            helper.deleteRecord(cmp, recordList[selectedIndex] );
            
        }
    },
    firstPage : function(component, event, helper)
    
    {
        let contactList = component.get("v.wrapperClass.listContact");
        let pageSize = component.get("v.pageSize");
        let paginationList = [];
        console.log('ShowAccountController.js::firstPage:: contactList.length', contactList.length );
        for(var i=0; i< pageSize; i++)
        {
            paginationList.push(contactList[i]);
        }
        console.log('ShowAccountController.js::firstPage:: paginationList.length', paginationList.length );
        console.log('ShowAccountController.js::firstPage::end::','pageSize::', pageSize );
        
        component.set("v.paginationList", paginationList);
    },
    
    lastPage : function(component, event, helper)
    {
        let contactList = component.get("v.wrapperClass.listContact");
        let pageSize = component.get("v.pageSize");    
        let totalSize = component.get("v.totalSize");
        let paginationList = [];
        console.log('ShowAccountController.js::lastPage:: accList.length',  contactList.length);
        for(let i=totalSize-pageSize+1; i< totalSize; i++)
        {
            paginationList.push(contactList[i]);
        }
        console.log('ShowAccountController.js::lastPage:: paginationList.length', paginationList.length );
        console.log('ShowAccountController.js::lastPage::pageSize::',pageSize );
        
        component.set("v.paginationList", paginationList);
    },
    
    nextPage : function(component, event, helper)
    {
        let contactList = component.get("v.wrapperClass.listContact");
        let end = component.get("v.end");
        let start = component.get("v.start");
        let pageSize = component.get("v.pageSize");
        let paginationList = [];
        let counter = 0;
        console.log('ShowAccountController.js::nextPage:: contactList.length', contactList.length );
        console.log('ShowAccountController.js::nextPage::end::',end,'start::',start,'pageSize::',pageSize );
        for(let i=end+1; i<end+pageSize+1; i++)
        {
            if(contactList.length > end)
            {
                paginationList.push(contactList[i]);
                counter ++ ;
            }
        }
        start += counter;
        end += counter;
        component.set("v.start", start);
        component.set("v.end", end);
        console.log('ShowAccountController.js::nextPage:: paginationList.length', paginationList.length );
        component.set("v.paginationList", paginationList);
    },
    
    previousPage : function(component, event, helper)
    {
        let contactList = component.get("v.wrapperClass.listContact");
        let end = component.get("v.end");
        let start = component.get("v.start");
        let pageSize = component.get("v.pageSize");
        let paginationList = [];
        let counter = 0;
        console.log('ShowAccountController.js::previousPage:: contactList.length',  contactList.length );
        for(var i= start-pageSize; i < start ; i++)
        {
            if(i > -1)
            {
                paginationList.push(contactList[i]);
                counter ++;
            }
            else {
                start++;
            }
        }
        start -= counter;
        end -= counter;
        component.set("v.start",start);
        component.set("v.end",end);
        console.log('ShowAccountController.js::previousPage:: paginationList.length', paginationList.length );
        component.set("v.paginationList", paginationList);
        
    }
})