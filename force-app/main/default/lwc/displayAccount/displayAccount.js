import { LightningElement, track,  wire } from 'lwc';
import findAccounts from '@salesforce/apex/AccountController.findAccounts';
import getContacts from '@salesforce/apex/AccountController.getContacts';
const DELAY = 1000;

const columnList = [
    {label: 'Id', fieldName: 'Id',type: 'text'},
    {label: 'Name', fieldName: 'Name',type: 'text'},
    {label:'Account Name',fieldName:'Account.Name', type:'text'},
];
export default class ApexClassExample extends LightningElement {
    @track accounts;
    @track singleAccount={};
    @track error;
    @track accountList=null;
    @track searchKey=null;
    @track searchName=null;
    @track contactList=[];
    @track showContacts=false;  
    @track columnList = columnList;

    

    handleKeyChange(event) {
        console.log('displayAccount.js::searchKeyValue-->', event.target.value);
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.searchKey = searchKey;
        /*this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
        }, DELAY);*/
    }
    getContactsFromAccountName(event){
        this.showContacts=true;
        console.log('displayAccount.js::getContactsFromAccountName-->', event.target.value);
        const searchName = event.target.value;
        this.searchName = searchName;
    }


    @wire(findAccounts,{ searchKey: '$searchKey' })
        wiredContacts({data, error}){
            if(data){
                console.log('displayAccounts.js::findAccounts::', JSON.parse(JSON.stringify(data)));
                this.accountList = data;
                this.accounts = data;                
                this.singleAccount = data[0];
                console.log('Single >>'+JSON.stringify(this.singleAccount, null, '\t'));
                this.error = undefined;
            }
            else if (error) {
                console.log('displayAccounts::.js::findAccounts::', error);
                this.error = error;
                this.accounts = undefined;
            }
        }
        @wire(getContacts,{searchName: '$searchName'})
            wiredContactList({data, error}){
                if(data){
                    console.log('displayAccounts.js::getContactsFromAccountName::', JSON.parse(JSON.stringify(data)));
                    this.contactList=JSON.parse(JSON.stringify(data));

                }else if(error){
                    this.error =error;
                    this.contactList = undefined;
                    console.log('displayAccounts.js::getContactsFromAccountName::error', error);
                }
            }

}