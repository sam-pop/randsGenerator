const request = require('request');
const fs = require("fs");

const NATIONALITY = 'us'; // enter desired nationalities, comma seperated (AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NL, NZ, TR, US)
const RESULTS = 100; // num of results to log


request('https://randomuser.me/api/?nat=' + NATIONALITY + '&results=' + RESULTS, (error, response, body) => {
    let thisBody = JSON.parse(body).results;
    for (let i of thisBody) {
        // mapping the response fields
        let name = i.name.first + " " + i.name.last;
        let photo = i.picture.large;
        let gender = i.gender;
        let nationality = i.nat;
        let address = i.location.street + ", " + i.location.city + ", " + i.location.state + ". " + i.location.postcode;
        let email = i.email;
        let dob = i.dob;
        let phone = i.phone;

        //log away!
        log("{");
        // ADD LOGGING PARAMS HERE
        logProp("name", name);
        logProp("dob", dob);
        logProp("address", address);
        logProp("phone", phone);
        logProp("email", email);
        logProp("photo", photo);
        // END OF logging params
        log("},");
    }
    console.log("LOGGING DONE! (/rands.txt)");
});


// logs a string to file
function log(str) {
    fs.appendFileSync("./rands.txt", str + '\r\n', (error) => {
        if (error) throw error;
    });
}

// logs name:'value' pairs to file
function logProp(name, value) {
    fs.appendFileSync("./rands.txt", (name + ": '" + value + "',") + '\r\n', (error) => {
        if (error) throw error;
    });
}