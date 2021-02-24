global  with sharing class AccountController {
    
    public Account account{get; set;}
    public List<Account> accountList{get;set;}
    public String validationError{get;set;}
    public Boolean isEditEnabled;
   
    @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts(String searchKey) {
        String key = null;
        key = searchKey+'%';
        if(key!=null){
            return [SELECT Id, Name from Account WHERE Name LIKE :key Limit 10];
        }
        return null;
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String searchName){
        String searchKey =null;
        searchKey = searchName+'%';
        if(searchKey!=null){
            return ([SELECT Id, Name, Account.Name FROM Contact WHERE Name LIKE :searchKey LIMIT 100]);
        }
        return null;
        
    }
    @AuraEnabled
    public static List<String> getPicklist(){
      
        List<String> pickListValuesList = new List<String>();
        Schema.DescribeFieldResult fieldResult = Account.AccountSource.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry pickListVal : ple){
            pickListValuesList.add(pickListVal.getLabel());
        }     
        return pickListValuesList;
        
    }
    /*public static void createStatic(){
        MetadataService.MetadataPort service = createService();     
        MetadataService.StaticResource staticResource = new MetadataService.StaticResource();
        staticResource.fullName = 'MyResource';
        staticResource.contentType = 'text';
        staticResource.cacheControl = 'public';
        staticResource.content = EncodingUtil.base64Encode(Blob.valueOf('Static stuff'));
        MetadataService.SaveResult[] results = service.createMetadata(new List<MetadataService.Metadata> { staticResource });
        
    }
    private static MetadataService.MetadataPort createService(){ 
        MetadataService.MetadataPort service = new MetadataService.MetadataPort();
        service.SessionHeader = new MetadataService.SessionHeader_element();
        service.SessionHeader.sessionId = UserInfo.getSessionId();
        return service;     
    }*/
    @auraEnabled
    public static Account getAccountInfo(Id accId){
        Account acc = new Account();
        acc = [SELECT Id, Name, Phone, Type, Industry, website FROM Account WHERE Id=: accId];
        return acc;
    }
    
    @AuraEnabled 
    public static List<Contact> getAccountContacts(String accId){
        List<Contact> contactList = new List<Contact>();
        contactList =[SELECT Id, Name, Account.Name, ramsoftsquare__Is_Miner__c, ramsoftsquare__Is_Primary_Contact__c FROM Contact WHERE AccountId= :accId];
        if(contactList.size()>0){
            return contactList;
        }
        return null;
    }
    public  PageReference  save(){
        if(account.BillingStreet!=null){
            
            insert account;
        } else{
            validationError = 'State should be filled';
        }
        PageReference redirectSuccess = new ApexPages.StandardController(Account).view();
        return (redirectSuccess);
    }
    
    public Boolean getIsEditEnabled(){
        return isEditEnabled;
    }
    
    public PageReference edit(){
        if(isEditEnabled = true){
            
        }       
        return null;
    }
    
    public PageReference saveAccounts() {  
        update accountList;
        isEditEnabled = false;
        return null;    
    }
    
    public PageReference updateRecord(){
        try {
            update account;
            System.debug(':::AccountController:::update accountList::'+ account);
        } catch(System.DMLException e) {
            ApexPages.addMessages(e);
        }
        
        PageReference redirectSuccess = new ApexPages.StandardController(Account).view();
        return (redirectSuccess);
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return([SELECT Id, Name, ShippingCity, ShippingCountry, ShippingStreet, Phone  FROM Account LIMIT 10 ]);
    } 
    
    @RemoteAction
    global static Id saveAccount(String accountName, String shippingCountry, String shippingCity, String shippingStreet, String phone ){
        Account acc = new Account();
        acc.Name = accountName;
        acc.ShippingCountry = shippingCountry;
        acc.ShippingCity = shippingCity;
        acc.ShippingStreet = shippingStreet;
        
        insert acc;
        
        if(acc.Id != null){
            System.debug(':::AccountController:@RemoteAction:saveAccount:return acc.Id'+ acc.Id);
            return acc.Id;
        }
        return null;
    }
    
    @RemoteAction
    global static List<Account> searchAccount(String accName){
        System.debug(':::AccountController: @RemoteAction:searchAccount'+ accName);
        if(accName !=null){
            String accountName= accName+'%';
            return ([SELECT Id, Name, ShippingCity, ShippingCountry, ShippingStreet, Phone  FROM Account WHERE Name LIKE :accountName LIMIT 100]) ;    
        }
        return null;
    }
    @RemoteAction
    global static String searchAccountAngular(String accName){
        System.debug(':::AccountController: @RemoteAction:searchAccountAngular'+ accName);
        if(accName !=null){
            String accountName= accName+'%';
            return JSON.serialize(([SELECT Id, Name, ShippingCity, ShippingCountry, ShippingStreet, Phone  FROM Account WHERE Name LIKE :accountName LIMIT 100])) ;    
        }
        return null;
    }
    
    @RemoteAction
    global static List<Account> getAllAccounts(){
        System.debug(':::AccountController: @RemoteAction:getAllAccounts');
        return([SELECT Id, Name, ShippingCity, ShippingCountry, ShippingStreet, Phone  FROM Account ]);  
        
    }
}