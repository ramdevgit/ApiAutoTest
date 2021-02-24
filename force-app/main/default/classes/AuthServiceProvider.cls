@RestResource(urlMapping='/auth/*')
global with sharing class AuthServiceProvider {
	
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