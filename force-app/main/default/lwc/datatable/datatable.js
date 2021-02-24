import { LightningElement, api, track } from "lwc";
export default class Datatable extends LightningElement {
  @api rows; //Datas from parent Component
  @track tableRows = [];
  @api columns; //Column definition from Parent component
  @api isMultiselect; //Is show multiselect or not from Parent component
  @api tableConfig; //Datatable configuration

  @track selectAll = false; //Default false for internal table use 
  @track tableProperties = {};//table Properties 
  selectedRows = []; //If it has multi select it will collect row Ids and exposed the event for container get


  @api //Public method for reset the internal properties of the table
  rerenderRows(){
    this.selectAll = false;
    this.selectedRows = [];
  }
  connectedCallback(){
    console.log('table connected Callback');

    this.tableProperties.scrollableCls = this.tableConfig.scrollable ? 'slds-table--header-fixed_container' : '';
    this.tableProperties.scrollableHeight = this.tableConfig.scrollable && this.tableConfig.scrollableHeight ? 'height:'+this.tableConfig.scrollableHeight +'; border:  var(--lwc-borderWidthThin,1px) solid var(--lwc-colorBorder,rgb(221, 219, 218));'  : '';
    this.tableProperties.scrollableyCls = this.tableConfig.scrollable  ? 'slds-scrollable_y' : '';
    this.tableProperties.scrollableCellCls = this.tableConfig.scrollable  ? 'header slds-cell-fixed' : ' header ';
    this.tableProperties.scrollableCellStyle = this.tableConfig.scrollable  ? ' border-left: var(--lwc-borderWidthThin,1px) solid var(--lwc-colorBorder,#dddbda)' : '';
    this.tableProperties.scrollableActionClass = this.tableConfig.scrollable  ? 'toggle slds-th__action  slds-text-link--reset scrollable-header-class' : ' slds-text-link--reset slds-th__action';
 
  }
  //Get Header Class
  get headerClass(){
    return ((this.tableConfig  && this.tableConfig.headerClass) ? this.tableConfig.headerClass :'');
  }
  //Exposed events for the changes on input field Its coming from Datatable cell component
  handleInputChange(event) {
    const selectedEvent = new CustomEvent("inputchange", {
      detail: event.detail,
      bubbles: true
    });

    // Dispatches the event.
    this.dispatchEvent(selectedEvent);
  }
  //Logic For Tree Grid expand and collapse
  handleOnExpandTreeEvent(event) {
    let rows;
    rows = JSON.parse(JSON.stringify(this.rows));
    rows.forEach(row => {
      if (row.Id === event.detail && row.childrens.length) {
        if (row.showChild === "") {
          row.showChild = "hide";
        } else if (row.showChild === "hide") {
          row.showChild = "";
        }
      }
    });
    this.rows = rows;
  }
  //Logic for Contract All
  @api
  onContractTree(){
    this.onApplyExpand(false);
  }
  @api
  validateErrros(){
    
      let datatableRows = this.template.querySelectorAll("c-datatable-row"),
          isError = false;
      
      datatableRows.forEach((rowCmp) => {
        if(rowCmp.onValidateErrors()){
          isError = true;
        }
      });
      return isError;

  //  }
  }
  //Logic for Expand Tree
  @api
  onExpandTree() {
    this.onApplyExpand(true);
  }
  //Apply Expand or Contract by set the properties 
  onApplyExpand(isExpanded){
    let rows;
    rows = JSON.parse(JSON.stringify(this.rows));
    rows.forEach(row => {
      if ((row.childrens.length && isExpanded))  {
          row.showChild = "";
      } else {
        row.showChild = "hide";
      }
      
    });
    this.rows = rows;
    
  }
  //On Multiselect clicked
  onMultiSelect(event) {
    let datatableRows = this.template.querySelectorAll("c-datatable-row"),
        selectedRows = [];
    //Iterating over table rows and set check or uncheck properties      
    datatableRows.forEach((rowCmp) => {
      if(event.target.checked){
        rowCmp.onRowCheck();
      } else {
        rowCmp.onRowUnCheck();
      }
      selectedRows.push(rowCmp.row.Id);
    });
    //Toggleing over select all feature
    if(event.target.checked){
      this.selectAll = true;
      this.selectedRows = selectedRows; //Storing the selected rows unique IDs
    } else {
      this.selectAll = false;
      this.selectedRows = [];
    }
  }
  //Row level checkbox change handler and store the unique id to pass for container if needed
  handleCheckboxChange(event) {
    let data = event.detail;
    let selectedRows = this.selectedRows;
    if (data.checked) {
      selectedRows.push(data.uniqueId);
    } else {
      const index = selectedRows.indexOf(data.uniqueId);
      selectedRows.splice(index, 1);
    }
    this.selectedRows = selectedRows;
    if(this.selectedRows.length === this.template.querySelectorAll("c-datatable-row").length){
      this.selectAll = true;
    } else {
      this.selectAll = false;
    }
  }
  //Public methods for getting selected rows
  @api
  getSelectedRows() {
    return this.selectedRows;
  }
  @api
  onEditAll(){
    this.dispatchEvent(new CustomEvent("editall"));

    let datatableRows = this.template.querySelectorAll("c-datatable-row");
    datatableRows.forEach((rowCmp) => {
      rowCmp.onEditRows();
    });

  }
  handleEditAllEvent(event){
    event.stopPropagation();
    this.onEditAll();
  }
  onRowClick(event){
    //event.stopPropagation();    

  }
  handleCellClick(event){
    this.dispatchEvent(new CustomEvent("cellclick",{detail:event.detail}));
  }
  handleScroll(event){

    let outerScrollDiv = this.template.querySelector('.slds-table--header-fixed_container');

    let threshold =  outerScrollDiv.clientHeight;
    let areaHeight = event.target.scrollHeight;
    let scrollTop = event.target.scrollTop;
    if(areaHeight - threshold < scrollTop) {
      this.dispatchEvent(new CustomEvent("lazyload"));
    }

  }


}