public class DocumentUploadController {
    
    @AuraEnabled
    public static String getDocumentLink(String recordId){
        
        List<ContentDocumentLink> contentList = new List<ContentDocumentLink>();
        List<ContentVersion> contentVersionList = new List<ContentVersion>();
        
        if(recordId != null && recordId != ''){
            
            String sObjName = Id.valueOf(recordId).getSObjectType().getDescribe().getName();
            System.debug('sObjName::::'+ sObjName);
            
            if(sObjName != null && sObjName != ''){
                
                Set<Id> recordIdSet = new Set<Id>{recordId};
                Set<Id> documentIdSet = new Set<Id>();
                    contentList  = [SELECT Id, ContentDocumentId, LinkedEntityId  
                                    FROM ContentDocumentLink where 
                                    LinkedEntityId IN :recordIdSet 
                                    and LinkedEntity.Type= :sObjName];
                    
                    if(contentList != null && contentList.size()> 0){
                        
                        for(ContentDocumentLink documentLink : contentList){
                            
                            documentIdSet.add(documentLink.ContentDocumentId);
                        }
                        
                        if(documentIdSet != null && documentIdSet.size() > 0){
                            
                            contentVersionList =[SELECT Id, Title, FileType, CreatedDate, Description, Contentsize, Fileextension  FROM ContentVersion WHERE ContentDocumentId IN :documentIdSet];
                        }
                    }
              
            }
            
        }
        return JSON.serialize(contentVersionList);
    }
}