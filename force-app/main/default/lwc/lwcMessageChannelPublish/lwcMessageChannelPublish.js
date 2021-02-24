import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import {createMessageContext, releaseMessageContext,  publish} from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c";
import SVG_LOGO from '@salesforce/resourceUrl/InstagramLogo';

export default class LwcMessageChannelPublish extends LightningElement {

    @track accountList;
    context = createMessageContext();
    svgURL = `${SVG_LOGO}#instagramLogo`
    constructor(){
        super();
        console.log('constructor::');
    }

    connectedCallback(){

        console.log('lwcMessageChannelSubscribe:::connectedCallback::::');
    }

    @wire(getAccounts)
    wiredAccounts({data, error}){
        if(data){
            
            console.log('getAccounts:::::::');
            this.accountList = data;
            
        }
        else if (error) {

           console.log('error:::::::', error);
        }
    }

    handleAccountClick(event){

        event.preventDefault();
        console.log('handleAccountClick:::recordid', event.target.dataset.value);
        const message = {
            recordId : event.target.dataset.value
        }

        publish(this.context, SAMPLEMC, message);
        
    }
    
}