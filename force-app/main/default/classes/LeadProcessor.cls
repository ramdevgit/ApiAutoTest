global class LeadProcessor implements Database.Batchable<sObject> {
    global Database.QueryLocator start(Database.BatchableContext bc) {
        
        return Database.getQueryLocator('SELECT Id, Name, LeadSource FROM Lead');
        // collect the batches of records or objects to be passed to execute
    }
    global void execute(Database.BatchableContext bc, List<Lead> records){
        List<Lead> leadList = new List<Lead>();
        for (Lead leadInstance : records) {
            leadInstance.LeadSource = 'Dreamforce';
            leadList.add(leadInstance);
        }
        update leadList;
    }    
    global void finish(Database.BatchableContext bc){
        // execute any post-processing operations
    }    
}