@isTest
public class CreateLaptopCustomerTestClass {
    static testMethod void createCustomer(){
        Laptop_Customer__c laptopCustomer = new Laptop_Customer__c(Customer_Name__c='Ramesh');
        
    }

}