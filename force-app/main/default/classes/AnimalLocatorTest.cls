@isTest
public class AnimalLocatorTest {
    @isTest static  void testGetCallout() {
        Test.startTest();
        AnimalLocatorMock mock = new AnimalLocatorMock();
        Test.setMock(HttpCalloutMock.class, mock);
        // Call method to test
        String animalName =  AnimalLocator.getAnimalNameById(1);
        System.debug('result::::'+ animalName);
        Test.stopTest();
    }
}