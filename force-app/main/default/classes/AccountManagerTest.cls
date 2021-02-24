@isTest
public class AccountManagerTest {
    @isTest static void testAccountById() {
        Id recordId = createTestRecord();
        // Set up a test request
        RestRequest request = new RestRequest();
        request.requestUri =
            'https://ramsoftsquare-dev-ed.my.salesforce.com/services/apexrest/Accounts/'
            + recordId+'/contacts';
        request.httpMethod = 'GET';
        RestContext.request = request;
        // Call the method to test
        Account acc  = AccountManager.getAccount();
        // Verify results
        System.debug('accList:::'+ acc);
        System.assert(acc != null);
    }
    public  static Id createTestRecord() {
        // Create test record
        List<Contact> contactList = new List<Contact>();
        Account accTest = new Account( Name ='Test Record');
        insert accTest;
        for(Integer i=0; i< 10; i++){
            contactList.add(new Contact(LastName= 'Test Contact'+ i, AccountId =accTest.Id));
        }
        insert contactList;
        return accTest.Id;
    } 
    
}