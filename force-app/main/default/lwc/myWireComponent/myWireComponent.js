import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class MyWireComponent extends LightningElement {

    connectedCallback(){
        console.log('myWireComponent:::');
    }

    @wire(getAccounts)
    accounts;

}