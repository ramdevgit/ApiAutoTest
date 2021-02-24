public class PaymentTrigger_Handler {
    
    //update the recent concequtive failed payment in Opportunity
    public static void insertPaymentUpdateOpportunity(Map<Id, Payment__c> newMap){
        
        Set<Id> oppIdSet = new Set<Id>();
        Map<Id, Integer> failedCountMap = new Map<Id, Integer> ();
        List<Opportunity> oppList = new  List<Opportunity> ();
        
        for(Payment__c payment: newMap.values()){
            oppIdSet.add(payment.Opportunity__c);
        }
        
        for(Payment__c payment : [SELECT Id, Name, Status__c, Opportunity__r.Id 
                                  FROM Payment__c 
                                  WHERE Opportunity__r.Id IN : oppIdSet    ORDER BY CreatedDate]) {
                                  
            System.debug(':::payment:::' + payment);
            if(payment.Status__c == 'Failed'){
                
                if(!failedCountMap.containsKey(payment.Opportunity__c)){
                    failedCountMap.put(payment.Opportunity__c, 1);
                } 
                else {
                    Integer count = failedCountMap.get(payment.Opportunity__c);
                    failedCountMap.put(payment.Opportunity__c, count + 1);  
                }
                
            } 
            else {
                failedCountMap.put(payment.Opportunity__c, 0);
            }                             
        }
        
        System.debug(':::failedCount:::' + failedCountMap);
        
        for(Opportunity opp : [SELECT Id, Name, Recent_Failed_Count__c FROM Opportunity WHERE Id IN : failedCountMap.keySet()]){  
            opp.Recent_Failed_Count__c = failedCountMap.get(opp.Id);
            oppList.add(opp);
        }
        update oppList;
    }
}