@isTest
public class AccountProcessorTest {
    @isTest
    private static void testCountContacts() {
        List<Account> accountList = new List<Account>();
        List<Contact> contactList = new List<Contact>();
        List<Id> accountIdList = new List<Id>();
        for(Integer i=0; i < 5; i++){
            Account acc = new Account();
            acc.Name = 'Test Account Future'+i;
            accountList.add(acc);
        }
        insert accountList;
        for(Account acc : accountList){
            for(Integer i=0; i < 5; i++){
                Contact cont = new Contact();
                cont.LastName = 'Test Contact Future'+i;
                cont.AccountId = acc.Id;
                accountIdList.add(acc.Id);
                contactList.add(cont);
            }
            insert contactList;
        }
        Test.startTest();
        AccountProcessor.countContacts(accountIdList);
        Test.stopTest();
    }
}