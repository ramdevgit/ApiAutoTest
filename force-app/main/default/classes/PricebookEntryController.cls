public class PricebookEntryController {
    @AuraEnabled
    public static List<PricebookEntry> getPriceBookEntriesProduct(String priceBookId){
        List<PricebookEntry> priceBookEntryList = new List<PricebookEntry>();
        Set<Id> productIds = new Set<Id>();
        priceBookEntryList = [SELECT Id, UnitPrice, ProductCode,  Product2Id, Product2.Name, Product2.Description
                              FROM PricebookEntry 
                              WHERE Pricebook2Id =: priceBookId
                             ];
        
        for(PricebookEntry pricebookEntryInstance : priceBookEntryList){
            if(pricebookEntryInstance.Product2Id != null){
                productIds.add(pricebookEntryInstance.Product2Id);
            }
        }
        
        return priceBookEntryList;
    }
    
    @AuraEnabled
    public static List<OpportunityLineItem> saveOpportunityLineItems(List<OpportunityLineItem> opportunityLineItems){
        if(!opportunityLineItems.isEmpty()){
            insert opportunityLineItems;
        }
        if(opportunityLineItems[0].Id !=null){
            return opportunityLineItems;
        }
        return null;
    }
    
}