({
    doInit: function(component, event, helper) {
        helper.getAccounts(component, event, helper);
        
    },
    scriptsLoaded : function(component, event, helper) {
        console.log('Script loaded..');  
    },
    firstPage : function(component, event, helper)
    
    {
        let accList = component.get("v.accountList");
        let pageSize = component.get("v.pageSize");
        let paginationList = [];
        console.log('ShowAccountController.js::firstPage:: accList.length', accList.length );
        for(var i=0; i< pageSize; i++)
        {
            paginationList.push(accList[i]);
        }
        console.log('ShowAccountController.js::firstPage:: paginationList.length', paginationList.length );
        console.log('ShowAccountController.js::firstPage::end::','pageSize::', pageSize );
        
        component.set("v.paginationList", paginationList);
    },
    
    lastPage : function(component, event, helper)
    {
        let accList = component.get("v.accountList");
        let pageSize = component.get("v.pageSize");    
        let totalSize = component.get("v.totalSize");
        let paginationList = [];
        console.log('ShowAccountController.js::lastPage:: accList.length',  accList.length);
        for(let i=totalSize-pageSize+1; i< totalSize; i++)
        {
            paginationList.push(accList[i]);
        }
        console.log('ShowAccountController.js::lastPage:: paginationList.length', paginationList.length );
        console.log('ShowAccountController.js::lastPage::pageSize::',pageSize );
        
        component.set("v.paginationList", paginationList);
    },
    
    nextPage : function(component, event, helper)
    {
        let accList = component.get("v.accountList");
        let end = component.get("v.end");
        let start = component.get("v.start");
        let pageSize = component.get("v.pageSize");
        let paginationList = [];
        let counter = 0;
        console.log('ShowAccountController.js::nextPage:: accList.length', accList.length );
        console.log('ShowAccountController.js::nextPage::end::',end,'start::',start,'pageSize::',pageSize );
        for(let i=end+1; i<end+pageSize+1; i++)
        {
            if(accList.length > end)
            {
                paginationList.push(accList[i]);
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
        let accList = component.get("v.accountList");
        let end = component.get("v.end");
        let start = component.get("v.start");
        let pageSize = component.get("v.pageSize");
        let paginationList = [];
        let counter = 0;
        console.log('ShowAccountController.js::previousPage:: accList.length',  accList.length );
        for(var i= start-pageSize; i < start ; i++)
        {
            if(i > -1)
            {
                paginationList.push(accList[i]);
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