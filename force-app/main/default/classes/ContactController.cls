global with sharing class ContactController {
    @auraEnabled
    public static void saveRecord(Contact record){
        System.debug('editContact');
        if(record.Id!=null){
            update record;
            System.debug('update successfullly'+ record);
            
        }
        else if(record.Id == null){
            insert record;
        }
    }
    @AuraEnabled
    public static String deleteRecord(Contact record){
        try{
            delete record;
        }catch(Exception e){
            System.debug('ContactController::deleteRecord::'+ e.getMessage());
            return e.getMessage();
        }
        return 'SUCCESS';
    }
    @AuraEnabled
    public static wrapperClass getContactsLastModified(){
        wrapperClass returnwrapperClass = new  wrapperClass ();        
        returnwrapperClass.listContact = [SELECT Id, LastName, Email, LeadSource, Department FROM Contact WHERE ramsoftsquare__Is_Primary_Contact__c=false ORDER  BY LastModifiedDate DESC LIMIT 150];
        return returnwrapperClass;
    }    
    @AuraEnabled
    public static String getAccounts(String searchAccountName){
        if(!(String.isBlank(searchAccountName))){
            return JSON.serialize([SELECT Id, Name FROM Account WHERE Name LIKE :searchAccountName+'%'  LIMIT 5]);
        }
        return null;
    }
    @AuraEnabled 
    public static wrapperClass getFieldValues(){
        wrapperClass returnwrapperClass = new  wrapperClass ();  
        Schema.DescribeFieldResult picklist = Contact.LeadSource.getDescribe();
        List<Schema.PicklistEntry> ple = picklist.getPicklistValues();
        returnwrapperClass.leadSource = new List<String>();
        for( Schema.PicklistEntry pickListVal : ple){
            returnwrapperClass.leadSource.add(pickListVal.getValue());
        } 
        return returnwrapperClass;    
    }
    @AuraEnabled
    public static wrapperClass getContacts(){
        wrapperClass returnwrapperClass = new  wrapperClass ();        
        returnwrapperClass.listContact = [SELECT Id, Name, FirstName, LastName, Contact.Account.Name, Activation_Date__c, Is_Primary_Contact__c, Price__c, Country__c FROM Contact LIMIT 100];
        returnwrapperClass.contactCount = returnwrapperClass.listContact.size(); 
        return returnwrapperClass;    
    }
    
    public class wrapperClass{
        @AuraEnabled public List<contact> listContact{get;set;}
        @AuraEnabled public Integer contactCount{get;set;}
        @AuraEnabled public List<String> leadSource{get;set;}
    }
}