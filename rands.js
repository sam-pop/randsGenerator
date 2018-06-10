/*
randsGenerator:
--------------
Generate a file populated with random user objects.
Data fetched from randomuser.me API.
https://randomuser.me/documentation
--------------
Author: Samuel Poplovitch
*/

const request = require('request');
const fs = require("fs");

const NATIONALITY = 'us'; // enter desired nationalities, comma seperated (AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NL, NZ, TR, US)
const RESULTS = 100; // num of results to log


request('https://randomuser.me/api/?nat=' + NATIONALITY + '&results=' + RESULTS, (error, response, body) => {
    let thisBody = JSON.parse(body).results;
    for (let i of thisBody) {
        // some of the response fields use can use
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

// logs key:'value' pairs to file
function logProp(key, value) {
    fs.appendFileSync("./rands.txt", (key + ": '" + value + "',") + '\r\n', (error) => {
        if (error) throw error;
    });
}