@RestResource(urlMapping='/Accounts/*')
global with sharing class AccountRestManager {
    @HttpGet
    global static List<Account> getAccounts() {
        List<Account> accountList =  [SELECT Id, Name FROM Account LIMIT 10];
        return accountList;
    }
    @HttpPost
    global static Account createAccount(String Name)
    {
        Account a = new Account();
        a.Name = Name;
        insert a;	
        System.debug('AccountRestManager::createAccount::'+ a);
        return a;
    }
}