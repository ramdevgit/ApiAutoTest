@RestResource(urlMapping='/Accounts/*/contacts')
global class AccountManager {
    
    @HttpGet
    global static Account getAccount() {
        RestRequest request = RestContext.request;
        List<Account>  accountList = new List<Account>();
        String accountId = request.requestURI.substring(request.requestURI.lastIndexOf('Account')+ 9, request.requestURI.lastIndexOf('/'));
        System.debug('accountId::'+ accountId);
        Account acc  = [SELECT  Id, Name,(Select Id, Name from Contacts) from Account WHERE Id = :accountId LIMIT 1];      
        return acc;
    }
    
	
}