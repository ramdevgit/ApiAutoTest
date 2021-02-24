//Used to get value from Key in object
const getValueFromObject = (obj, prop) => {
    if (prop.includes('.')) {
        let parts = prop.split('.'),
            last = parts.pop(),
            l = parts.length,
            i = 1,
            current = parts[0];

        while ((obj = obj[current]) && i < l) {
            current = parts[i];
            i++;
        }
        if (obj) {
            return obj[last];
        }
    } else {
        return obj[prop];
    }
    return null;
}
//Convert to Formatter
const formatDate = (date,seperator, formatter) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if(!seperator){
        seperator = '-';
    }
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    let formattedDate =[];
    if(formatter === null || formatter === undefined){
        return [month,day,year].join(seperator);
    }
    if(formatter){
	    if(formatter.includes("-")){
    	    seperator = "-";
    	}
	    else if(formatter.includes("/")){
	        seperator = "/";	
        }
        formatter.split(seperator).forEach((r) =>{
            if(r==='mm' || r==='m'){
                formattedDate.push(month);
            }
            if(r==='dd' || r==='d'){
                formattedDate.push(day);
            }
            if(r==='yyyy' || r==='yy'){
                formattedDate.push(year);
            }
        });
    }
    return formattedDate.join(seperator);
}

//Tolower case
const toLowerCase = (str) => str.toLowerCase();
//Parse Error Detailed 
const  filterErrors = (errors) => {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }

    return (
        errors
            // Remove null/undefined items
            .filter(error => !!error)
            // Extract an error message
            .map(error => {
                // UI API read errors
                if (Array.isArray(error.body)) {
                    return error.body.map(e => e.message);
                }
                // UI API DML, Apex and network errors
                else if (error.body && typeof error.body.message === 'string') {
                    return error.body.message;
                }
                // JS errors
                else if (typeof error.message === 'string') {
                    return error.message;
                }
                // Unknown error shape so try HTTP status text
                return error.statusText;
            })
            // Flatten
            .reduce((prev, curr) => prev.concat(curr), [])
            // Remove empty strings
            .filter(message => !!message)
    );
}

export {
    getValueFromObject,
    toLowerCase,
    filterErrors,
    formatDate
}