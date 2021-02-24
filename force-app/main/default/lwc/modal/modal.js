import { LightningElement,api, track } from 'lwc';

export default class Modal extends LightningElement {
        
    @api headerTitle;
    @track isModalOpen = false;
    @track bodyOnfucus = false;

    @api
    openModal() {

        console.log('openModal:::updated:');
        this.isModalOpen = true;
    }

    @api
    closeModal() {

        console.log('closeModal:::::');
        this.isModalOpen = false;
    }
    
    handleCloseFieldMapping(event){
        this.isModalOpen = false;
    }
    modalContentOnfocus(event){

        console.log('modalContentOnfocus::::');
        this.bodyOnfucus = true;
    }
    modalContentFadeout(event){

        console.log('modalContentFadeout:updated:::');
        this.bodyOnfucus = false;
    }
}