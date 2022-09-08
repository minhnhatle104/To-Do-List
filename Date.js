let getDate = () =>{
    let today = new Date();
    
    let options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    };

    return today.toLocaleDateString("en-US",options);
}

let getDateVer2 = () =>{
    let today = new Date();
    
    let options = {
        weekday: "long",
    };

    return today.toLocaleDateString("en-US",options);
}

exports.getDate = getDate;
exports.getDateVer2 = getDateVer2;