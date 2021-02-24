import { LightningElement, api, track } from "lwc";
/*This method is getting value from object*/
import { getValueFromObject, formatDate } from "c/utils";

export default class DatatableCell extends LightningElement {
  @api columnConfig; //Cell configuration is passed from datarow
  @api row; // Data row
  @track formattedData; //Used to store the row, value,type for cell component internal use
  @api tableConfig; //Used to Store Table Configuration get from parent container
  @track isEditOnLoad = false;//Used for Edit on Load on Component Level
  @api parentRowIndx;//Used to Store Parent Row Index
  @api childRowIndx;//Used to Store Child Row Index
  disconnectedCallback() {
    //console.log('ggg');
  }
  //Rendered CallBack Function
  renderedCallback() {
    //For currency input field css fro hiding up/down arow
    if (this.isEditable) {
      this.template.host.style.background = "none";
    }
    const style = document.createElement("style");
    style.innerText =
      "input::-webkit-outer-spin-button {display:none;}input::-webkit-inner-spin-button {display:none;}";
    if (this.columnConfig.type === "currency" && this.isEditable) {
      this.template.querySelector("lightning-input").appendChild(style);
    }
  }
  //For Getting reactive Formatted Value based on the Row Value change So we used Getter 
  get formattedValue() {
    let getColumnField = this.columnConfig.fieldName;

    return getValueFromObject(
      this.row,
      typeof getColumnField === "function"
        ? getColumnField(this.row)
        : this.columnConfig.fieldName
    );
  }
  //For Getting reactive Formatted Cell Class based on the Row Value change So we used Getter
  get formattedCellClass() {
    return this.columnConfig.cellClass
      ? this.isEditable && this.columnConfig.cellClass
        ? this.getCellClass() + " slds-cell-edit "
        : this.getCellClass()
      : "";
  }
  
  //It calls whever the DOM change detection occurs  is executed when the initialization of this component is completed.
  connectedCallback() {
    if (this.columnConfig.editable) {
      this.classList.add("slds-cell-edit");
    }

    let formattedData = {}; //Formatted data with types specified
    formattedData.isCurrency =
      this.columnConfig.type === "currency" ? true : false;
    formattedData.uniqueId = this.row.Id;
    let getColumnField = this.columnConfig.fieldName;
    formattedData.value = getValueFromObject(
      this.row,
      typeof getColumnField === "function"
        ? getColumnField(this.row)
        : this.columnConfig.fieldName
    );
    if (this.columnConfig.type === "date") {
      formattedData.value = formattedData.value
        ? formatDate(formattedData.value, "/", this.columnConfig.format)
        : "";
    }
    formattedData.isCheckbox =
      this.columnConfig.type === "checkbox" && !this.columnConfig.showIcon
        ? true
        : false;
    formattedData.isIconCheckbox =
      this.columnConfig.type === "checkbox" && this.columnConfig.showIcon
        ? true
        : false;
    formattedData.isRequired =
        this.columnConfig.required ? true : false;
    formattedData.iconCheckboxWhenTrue =
      this.columnConfig.type === "checkbox" &&
      this.columnConfig.showIcon &&
      this.columnConfig.iconWhenTrue
        ? this.columnConfig.iconWhenTrue
        : "";
    formattedData.iconCheckboxWhenFalse =
      this.columnConfig.type === "checkbox" &&
      this.columnConfig.showIcon &&
      this.columnConfig.iconWhenFalse
        ? this.columnConfig.iconWhenFalse
        : "";
    formattedData.isText = this.columnConfig.type === "text" ? true : false;
    formattedData.isNumber = this.columnConfig.type === "number" ? true : false;
    formattedData.cellClass = this.columnConfig.cellClass
      ? this.isEditable && this.columnConfig.cellClass
        ? this.getCellClass() + " slds-cell-edit "
        : this.getCellClass()
      : "";
    formattedData.isDate = this.columnConfig.type === "date" ? true : false;
    formattedData.dateAttributes =
      this.columnConfig.type === "date"
        ? this.getTypeAddtionalDateAttributes(
            "date",
            this.columnConfig.attributes
          )
        : this.getTypeAddtionalDateAttributes("date", null);
    formattedData.isTree =
      this.columnConfig.type === "tree" &&
      this.row.childrens &&
      this.row.childrens.length > 0
        ? true
        : false;
    formattedData.isPicklist =
      this.columnConfig.type === "picklist" ? true : false;
    formattedData.options =
      this.columnConfig.type === "picklist" ? this.columnConfig.options : [];

    formattedData.fieldName =
      typeof getColumnField === "function"
        ? getColumnField(this.row)
        : this.columnConfig.fieldName;
    formattedData.style = this.columnConfig.style;
    if (
      !formattedData.isCurrency &&
      !formattedData.isText &&
      !formattedData.isNumber &&
      !formattedData.isTree
    ) {
      formattedData.isText = true;
    }
    this.formattedData = formattedData;
    this.isEditOnLoad = this.columnConfig.editOnLoad;
  }
  //For Cell Class Genrator
  getCellClass() {
    if (typeof this.columnConfig.cellClass === "function") {
      let cellFunc = this.columnConfig.cellClass;
      return cellFunc(this.row);
    }
    return this.columnConfig.cellClass;
  }
  //Check The Column has Expanded Or Not
  get isExpanded() {
    if (this.isEditable && this.formattedData.isTree) {
      return this.row.showChild === "" ? true : false;
    }
    return false;
  }

  //Getter to check editatble or not
  get isEditable() {
    let isEditable = false;
    if (typeof this.columnConfig.editable === "function") {
      let rowFunc = this.columnConfig.editable;
      isEditable =
        rowFunc(this.row) &&
        (this.isEditOnLoad || this.tableConfig.isEditAllOnLoad);
    } else {
      isEditable =
        this.columnConfig.editable &&
        (this.isEditOnLoad || this.tableConfig.isEditAllOnLoad);
    }
    return (
      isEditable ||
      (this.columnConfig.treeClickable &&
        this.row.childrens &&
        this.row.childrens.length) ||
      false
    );
  }
  //Getter to check tree view or not
  get isTree() {
    return (
      this.row.childrens &&
      this.row.childrens.length &&
      this.columnConfig.type === "tree"
    );
  }
  //Getter to check editable view or not
  get isText() {
    return !this.isTree && !this.isEditable;
  }
  //on tree click it will fire event with parent unique id
  onTreeClick(event) {
    console.log("got here");
    const selectedEvent = new CustomEvent("toggletree", {
      detail: this.formattedData.uniqueId
    });

    // Dispatches the event.
    this.dispatchEvent(selectedEvent);
  }
  //Get Edit or Not Properties Based on Colum definition
  get editOrNot() {
    let isEditable = this.checkFieldToEdit();
    return !this.isEditOnLoad && isEditable;
  }
  //Check the Field is Editatble or not
  checkFieldToEdit() {
    let isEditable = false;
    if (typeof this.columnConfig.editable === "function") {
      let rowFunc = this.columnConfig.editable;
      isEditable = rowFunc(this.row);
    } else {
      isEditable = this.columnConfig.editable;
    }
    return isEditable;
  }
  //Enable the Edit Operation 
  enableEdit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.handleCellClick();

    if (!this.tableConfig.isEditAll) {
      this.isEditOnLoad = !this.isEditOnLoad;
    } else if (this.checkFieldToEdit()) {
      this.dispatchEvent(new CustomEvent("editall"));
    }
  }
  //API Properties on Edit Cell
  @api
  onEditCell() {
    this.isEditOnLoad = true;
  }
  //for Future purpose style class added
  get editableCls() {
    return "slds-truncate";
  }
  //For Future Purpose Layout Edit icon and content Size 
  get layoutEditSize() {
    return this.editOrNot ? "10" : "10";
  }
    //For  geting Type Addtional DateAttributes  
  getTypeAddtionalDateAttributes(type, attributeMap) {
    let formatatedDateProperties = {
      minDate: null,
      maxDate: null
    };

    if (type === "date") {
      if (attributeMap) {
        formatatedDateProperties.minDate = formatDate(
          attributeMap.minDate,
          "-",
          "yyyy-mm-dd"
        );
        formatatedDateProperties.maxDate = formatDate(
          attributeMap.maxDate,
          "-",
          "yyyy-mm-dd"
        );
       
      }
    }
    return formatatedDateProperties;
  }
  //Input field change and dispatch event what fied has edited
  handleDataChange(event) {
    this.dataCaptureAndDispatch({
      fieldName: this.columnConfig.fieldName,
      uniqueId: this.formattedData.uniqueId,
      parentRowIndx: this.parentRowIndx,
      childRowIndx: this.childRowIndx,
      value:
        this.columnConfig.type === "checkbox"
          ? event.target.checked
          : event.target.value
    });
  }
  //For Capdture the Input field Change
  dataCaptureAndDispatch(detail) {
    this.template.host.style.background =
      "var(--lwc-colorBackgroundHighlight,rgb(250, 255, 189))";
    this.dispatchEvent(
      new CustomEvent("inputchange", {
        detail: detail
      })
    );
  }
  //For Capdture the Input field checbox Change
  handleDataCheckboxChange() {
    this.formattedData.value = !this.formattedData.value;
    this.template.host.style.background =
      "var(--lwc-colorBackgroundHighlight,rgb(250, 255, 189))";
    this.dataCaptureAndDispatch({
      fieldName: this.columnConfig.fieldName,
      uniqueId: this.formattedData.uniqueId,
      value: this.formattedData.value
    });
  }
  //Handle Cell Click
  handleCellClick() {

    if (!this.isEditable && this.columnConfig.cellClick) {
      this.dispatchEvent(new CustomEvent("cellclick", { detail: this.row.Id }));
    }
  }
  /* get formattedValue(){
    return this.formattedData.value;
  }*/
  //On Standard Input Field Validate Method For Check Overall Updations
  @api onValidateErrors() {
    //let errorFunc = this.tableConfig.errorCallback;

    if (this.isEditable) {
      // let errorProperties = errorFunc(this.row);
      if (
        this.columnConfig
          .validate /*errorProperties.fieldNames.indexOf(this.columnConfig.fieldName) !== -1*/
      ) {
        //console.log(JSON.stringify(errorProperties));
        const allValid = [
          ...this.template.querySelectorAll("lightning-input")
        ].reduce((validSoFar, inputCmp) => {
          inputCmp.reportValidity();
          console.log(inputCmp.name,inputCmp.reportValidity(),inputCmp.checkValidity());
          return validSoFar && inputCmp.checkValidity();
        }, true);
        return !allValid;
      }
    
    }
  }
}