trigger laptopCustomerTrigger  on Laptop_Customer__c (before insert, after insert) {

    if(Trigger.isInsert && Trigger.isBefore){
            System.debug('Trigger.newMap values before insert' + Trigger.newMap);
    }
    
    if(Trigger.isInsert && Trigger.isAfter){
                    System.debug('Trigger.newMap values after insert values ' + Trigger.newMap.values());
                    for(Laptop_Customer__c lapCustomer :  Trigger.newMap.values()){
                        System.debug('laptopCustomer Name' + lapCustomer .Customer_Name__c);
                    }
                    System.debug('Trigger.newMap values after insert keyset '+  Trigger.newMap.keySet());
    }
}