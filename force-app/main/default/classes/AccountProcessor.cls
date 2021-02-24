global class AccountProcessor {
    @future
    public static void countContacts(List<Id> accountIds){
        Map<Id, Integer> contactCountMap = new Map<Id, Integer>();
        List<Contact> contactList = [SELECT Id, AccountId FROM Contact WHERE AccountId =: accountIds];
        for(Contact con : contactList){
            if(con.AccountId !=null && !contactCountMap.containsKey(con.AccountId)){
                contactCountMap.put(con.AccountId, 1);
            }
            else if(contactCountMap.containsKey(con.AccountId)){
                contactCountMap.put(con.AccountId, contactCountMap.get(con.AccountId)+1);
            }
        }
        List<Account> accountList  = new List<Account>();
        for(Id accId : contactCountMap.keyset()){
            Account acc = new Account();
            acc.Id = accId;
            acc.Number_of_Contacts__c = contactCountMap.get(accId);
            accountList.add(acc);
        }
        update accountList;
    }
}