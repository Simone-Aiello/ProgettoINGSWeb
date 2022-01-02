function createRow(){
    let row = document.createElement("div");
    row.className = "row";
    row.style.margin = "5px 0";
    return row ;
}

function checkType(value,type){
	if(value.constructor.name != type)
		throw new Error("The value: "+value+" is not a "+type);
}

function createButtonWithIcon(icon){
    let button = document.createElement("button");
    button.className = "btn icon-button "+icon ;
    return button ;
}

function isDate(date){
    var _regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if(!_regex.test(date))
        throw new Error("La data inserita non è valida");
}

function isBeforeNow(date) {

    var _regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if(!_regex.test(date))
        throw new Error("La data inserita non è valida");

    var match = date.match(_regex);

    let day_user = parseInt(match[1]);
    let month_user = parseInt(match[2]);
    let year_user = parseInt(match[3]);

    let today = new Date();

    let today_day = today.getDate();
    let today_month = today.getMonth() + 1;
    let today_year = today.getFullYear();

    if(today_year != day_user){
        if(today_year > day_user)
            return true ;
        return false;
    }

    if(today_month != month_user){
        if(today_month > month_user)
            return true ;
        return false;
    }

    if(today_day != day_user){
        if(today_day > day_user)
            return true ;
        return false;
    }

    return false ;
}

function isAfterNowOrToday(date) {
    return !isBeforeNow(date);
}

function isAfterNow(date){

    var _regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if(!_regex.test(date))
        throw new Error("La data inserita non è valida");

    var match = date.match(_regex);

    let day_user = parseInt(match[1]);
    let month_user = parseInt(match[2]);
    let year_user = parseInt(match[3]);

    let today = new Date();

    let today_day = today.getDate();
    let today_month = today.getMonth() + 1;
    let today_year = today.getFullYear();

    if(today_year != day_user){
        if(today_year > day_user)
            return false ;
        return true;
    }

    if(today_month != month_user){
        if(today_month > month_user)
            return false ;
        return true;
    }

    if(today_day != day_user){
        if(today_day > day_user)
            return false ;
        return true;
    }

    return true ;
}


