public class PromiseController {
    @AuraEnabled public static Object myServerSideAction_1(String input) {
        return input+'.Apex1';
    }
    @AuraEnabled public static Object myServerSideAction_2(String input) {
        return input+'.Apex2';
    }   
    @AuraEnabled public static Object myServerSideAction_3(String input) {
        return input+'.Apex3';
    }   
}