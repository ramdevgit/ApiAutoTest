import { LightningElement, api, track } from "lwc";

export default class DatatableRow extends LightningElement {
  @api row; //Datas from parent Component
  @api columns; //Column definition from Parent component
  @api isMultiselect; //Is show multiselect or not from Parent component
  @api tableConfig;//Table config Details
  @api parentRowIndx;//Get row Idx
  @api childRowIndx;

  @track checked = false; //Default checked false for internal use 

  connectedCallback(){
    let rowStyle = (this.tableConfig && this.tableConfig.rowStyle ? this.tableConfig.rowStyle : '');
    if(rowStyle && (typeof(rowStyle) === 'function')){
      let rowcls = rowStyle(this.row);
      if(rowcls){
        this.setAttribute('style',rowStyle(this.row));
      }
    } else{
      if(rowStyle){
        this.setAttribute('style',rowStyle);
      }
    }

   
  }

//Identification on toogle tree  fire events 
  onToogleTree(event) {
    const selectedEvent = new CustomEvent("toggletree", {
      detail: event.detail,
      bubbles: "true"
    });

    // Dispatches the event.
    this.dispatchEvent(selectedEvent);
  }
  //On Input field chagnge fire events it come from datatable cell component
  onInputChange(event) {
    const selectedEvent = new CustomEvent("inputchange", {
      detail: event.detail,
      bubbles: true
    });

    // Dispatches the event.
    this.dispatchEvent(selectedEvent);
  }
  //Fire the event to parent component to hold the selected rows
  onCheckboxClick(event) {
    const selectedEvent = new CustomEvent("checkboxchange", {
      detail: { checked: event.target.checked, uniqueId: this.row.Id },
      bubbles: true
    });
    this.dispatchEvent(selectedEvent);
  }
  //Public methods to check the row checkbox
  @api
  onRowCheck() {
    this.template.querySelector('lightning-input').checked = true;
  }
  @api
  onRowUnCheck(){
    this.template.querySelector('lightning-input').checked = false;
  }
  @api
  onEditRows() {
    let datatableCellCmps = this.template.querySelectorAll("c-datatable-cell");
    
    datatableCellCmps.forEach((cellCmp) => {
      cellCmp.onEditCell();
    });

  }
  @api 
  onValidateErrors(){
    let datatableCellCmps = this.template.querySelectorAll("c-datatable-cell"),
        isError = false;
    
    datatableCellCmps.forEach((cellCmp) => {
      if(cellCmp.onValidateErrors()){
        isError = true;
      }
    });
    return isError;
    
  }
  onEditAll(event){
    this.dispatchEvent(new CustomEvent("editall"));

  }
  handleCellClick(event){
    this.dispatchEvent(new CustomEvent("cellclick",{detail:event.detail}));

  }
}