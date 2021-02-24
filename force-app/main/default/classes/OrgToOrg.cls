@RestResource(urlMapping='/orgtoorg/*')
global with sharing class OrgToOrg {
     @HttpGet
    global static List<Account> getAccounts() {
        List<Account> accountList =  [SELECT Id, Name FROM Account LIMIT 10];
        return accountList;
    }
    @HttpPost
    global static String createAccount(String Name)
    {
        Account a = new Account();
        a.Name = Name;
        insert a;	
        String returnResponse = JSON.serialize(a);
        System.debug('AccountRestManager::createAccount::'+ a);
        return returnResponse;
    }

}