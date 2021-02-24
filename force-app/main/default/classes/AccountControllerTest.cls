@isTest
public class AccountControllerTest {
	

    @testSetup static void setup(){
         List<Account> accountList = new List<Account>();
        accountList.add(new Account(Name='TestAccount', Type='Prospect', ShippingStreet='Tharamani'));
        accountList.add(new Account(Name='TestOther', Type='Other', ShippingStreet='Tharamani'));
        accountList.add(new Account(Name='TestAccount1', Account_Active__c='No',  Country__c='USA', ShippingStreet='Tharamani'));
        accountList.add(new Account(Name='TestAccount2', Account_Active__c='Yes', Country__c='INDIA',ShippingStreet='Tharamani'));
        insert accountList;
    }
    
    @isTest static void testSave(){
    	AccountController controller = new AccountController();
        controller.save();
    }
    
    @isTest static void testGetAccounts(){
        AccountController controller = new AccountController();
        controller.getAccounts();
    }
    
}