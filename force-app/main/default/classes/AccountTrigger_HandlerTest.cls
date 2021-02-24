@isTest
public class AccountTrigger_HandlerTest {

    @testSetup static void setup(){
        
        List<Account> accountList = new List<Account>();
        accountList.add(new Account(Name='TestAccount', Type='Prospect', ShippingStreet='Tharamani'));
        accountList.add(new Account(Name='TestOther', Type='Other', ShippingStreet='Tharamani'));
        accountList.add(new Account(Name='TestAccount1', Account_Active__c='No',  Country__c='USA', ShippingStreet='Tharamani'));
        accountList.add(new Account(Name='TestAccount2', Account_Active__c='Yes', Country__c='INDIA',ShippingStreet='Tharamani'));
        insert accountList;
        
        List<User> userList = new List<User>();
        userList.add(new User(LastName='Ramesh R', Alias='Ramesh', Email='ramsoftnetwork@gmail.com', Username='ramram@softsqaure.com'));
        userList.add(new User(LastName='Ramesh Admin 2019', Alias='ramram', Email='ramsoftnetwork@gmail.com', Username='ramramram@softsquare.com'));
        try{
        	insert userList;
        } catch(Exception e){
            System.debug(':::AccountTrigger_HandlerTest:setup():insert userList' + e.getMessage());
        }
       
    }
    
    @isTest static void testInsertAccountWithContact(){
       List<Account> accountList = [SELECT Id, Type, Name FROM Account WHERE Name='TestAccount'];
       AccountTrigger_Handler.InsertAccountWithContact(accountList);
     }
    
    @isTest static void testUpdateAccountWithContact(){
       Map<Id, Account> accountMap = new Map<Id, Account>([SELECT Id, Type, Name FROM Account WHERE Type='Prospect' OR Type='Other']);
       for(Account acc : accountMap.values()){
           if( acc.Type=='Other'){
               acc.Type ='Customer-Direct';
           }
           
       }
       AccountTrigger_Handler.updateAccountWithContact(accountMap); 
    }
    
    @isTest static void testOwnerChange(){
        List<Account> accountList = [SELECT Id, Type, Name FROM Account ];
        AccountTrigger_Handler.ownerChange(accountList);
    }
    
    @isTest static void testUpdateAccountContactActive(){
        
        List<Account> accountList = [SELECT Id, Type, Country__c,  Name, Activation_Date__c, Account_Active__c FROM Account ];
        Map<Id, Account> accountMap = new Map<Id, Account>();
        for(Account acc : accountList){
            
            Account newContact = new Account();
            if(acc.Account_Active__c=='No'){
           		newContact.Account_Active__c='Yes';  
            }
            newContact.Id = acc.Id;
            
         	accountMap.put(newContact.Id , newContact);
        }
        AccountTrigger_Handler.updateAccountContactActive(accountList, accountMap);
    }
    
}