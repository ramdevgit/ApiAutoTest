public class Sample_Batch implements Database.Batchable<RequestInfoWrapper>{

    private List<RequestInfoWrapper> reqWrapperList;
    
    public Sample_Batch( List<RequestInfoWrapper> reqWrapperList) {
		
        this.reqWrapperList	= reqWrapperList;
    }
    
    public List<RequestInfoWrapper> start(Database.BatchableContext BC) {
        
        System.debug('sampleBatch::start;::');
        return this.reqWrapperList;
    }
    
    public void execute(Database.BatchableContext BC, List<RequestInfoWrapper> scope) {
		
        System.debug('sampleBatch::;execute::');
    }
    public void finish(Database.BatchableContext BC) {
        
         System.debug('sampleBatch::;finish::');

    }
    
}