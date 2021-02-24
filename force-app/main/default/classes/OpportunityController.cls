public class OpportunityController {
    
    public List<Opportunity> opportunityList{get;set;}
    private ApexPages.StandardSetController standardController;
    public Set<Id> opporunityIds = new Set<Id>();
    
    public OpportunityController(ApexPages.StandardSetController standardController){
        System.debug('OpportunityController::ApexPages.StandardSetController::');
        this.standardController = standardController;
        opportunityList = new List<Opportunity>();
        for (Opportunity opp : (List<Opportunity>)standardController.getSelected()){ 
            opporunityIds.add(opp.Id);
        }
        System.debug('OpportunityController::ApexPages.StandardSetController::result.size()'+standardController.getResultSize());
        System.debug('OpportunityController::ApexPages.StandardSetController::opporunityIds.size()'+opporunityIds.size());
        
        opportunityList = [SELECT Id, Name, Account.Name, Manager_Email__c FROM Opportunity WHERE ID IN: opporunityIds];
        String [] toAddresses = new String [1];
        Integer i = 0;
        for(Opportunity opp: opportunityList){
            if(opp.Manager_Email__c != null){
                //toAddresses[i++]= opp.Manager_Email__c;
                System.debug(opp.Manager_Email__c);
            }
        }
        toAddresses[0] = 'ramsoftnetwork@gmail.com';
        System.debug('opportunityList::size'+ opportunityList.size() );
        String userName = UserInfo.getUserName();
        User activeUser = [Select Id, Email From User where Username = : userName limit 1];
        
        String userEmail = activeUser.Email;
        String targetObjectId = activeUser.Id;
        // sendTemplatedEmail(toAddresses, 'OpportunityEmailAlert', userEmail, targetObjectId);
        
    }
    
    @AuraEnabled
    public static List<Opportunity> getAccountOpportunities(String accId){
        List<Opportunity> opportunityList = new List<Opportunity>();
        opportunityList =[SELECT Id, Name, StageName, CloseDate FROM Opportunity WHERE AccountId= :accId];
        if(opportunityList.size()>0){
            return opportunityList;
        }
        return null;
    }
    
    public static void sendEmail(){
        String userName = UserInfo.getUserName();
        User activeUser = [Select Id, Email From User where Username = : userName limit 1];
        
        String userEmail = activeUser.Email;
        String targetObjectId = activeUser.Id;
        String [] toAddresses = new String [1];
        toAddresses[0] ='ramsoftnetwork@gmail.com';
        OpportunityController.sendTemplatedEmail(toAddresses, 'OpportunityEmailAlert', userEmail, targetObjectId);
    }
    
    public static void sendTemplatedEmail(String[] toRecipients, String templateApiName, String orgWideEmailId, String targetObjectId) {
        
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        EmailTemplate templateId;  
        try {
            templateId = [select id, Name, Subject, Body  from EmailTemplate where name  = :templateApiName];
        }
        catch (Exception e) {
            throw new EmailException ('[U-03] Unable to locate EmailTemplate using name: ' + templateApiName + 
                                      ' refer to Setup | Communications Templates ' + templateApiName);
        }
        String body = templateId.Body;
        email.setToAddresses(toRecipients);
        email.setSubject('This is the message body from opportunity controller.');
        email.setHtmlBody(body);
        //email.setorgWideEmailAddressId(orgWideEmailId);
        email.setTargetObjectId('0032v00002lLh9SAAS');
        email.setTemplateId(templateId.Id);
        email.setSaveAsActivity(false);
        Messaging.SingleEmailMessage[] messages =  new List<Messaging.SingleEmailMessage> {email};
            System.debug(LoggingLevel.INFO,'** entered sendTemplatedEmail, to:' + toRecipients +   +  ' templateId:' + templateId +'orgWideEmailId' + orgWideEmailId
                         +'targetObjectId'+ targetObjectId);
        try {
            //Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
            Messaging.SendEmailResult[] results =  Messaging.sendEmail(messages);
            System.debug('Email Message results::'+ results);
            if (results[0].success) {
                System.debug('The email was sent successfully.');
            } else {
                System.debug('The email failed to send: '
                             + results[0].errors[0].message);
            }
            return;
        }
        catch (EmailException e) {throw new EmailException('[U-02] sendTemplatedEmail error. ' + e.getMessage());}
    }
   
}