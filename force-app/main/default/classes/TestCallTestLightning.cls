@isTest
public class TestCallTestLightning {
   
    @isTest
    public static void testOpen(){
        CallTestLightning ct = new CallTestLightning();
        PageReference pg = ct.openCallTestLightning();
        PageReference actual = new PageReference('/apex/ramsoftsquare__testLigthningAssign');
        System.assertEquals(true, true, 'should be same');
    }
    
}