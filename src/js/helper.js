import { TIMEOUT_SEC } from "./config.js";

//putting all those functions here which will be used more than one time and place

//putting the functionality of error handling when user has slow internet and website doesnt load in time,
//so when this happens we would give an error and terminate the promise which will then end the functionality

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

//refactored send and get function
export const AJAX = async function (url, uploadData = undefined) {
    try {


        const fetchpro = uploadData ? fetch(url, {
            method: 'POST',     //method is to be set to post to send data or post data
            headers: {
                'Content-Type': 'application/json',  //we need to define headers and write this  content-type and application/json in the same manner 
                // as we have written here 
            },
            body: JSON.stringify(uploadData)

        }) : fetch(url)
        const res = await Promise.race([fetchpro, timeout(TIMEOUT_SEC)])//using dynamic id to get the api data to create our stuff 
        const data = await res.json()

        if (!res.ok) throw Error(`something Happened  ${res.status} ${res.statusText}`);
        return data

    } catch (err) {
        console.log(err);
        throw err
    }
}

/*
export const getJSON = async function (url) {
    try {
        const res = await Promise.race([fetch(`${url}`), timeout(TIMEOUT_SEC)])//using dynamic id to get the api data to create our stuff 
        const data = await res.json()

        if (!res.ok) throw Error(`something Happened  ${res.status} ${res.statusText}`);
        return data
    } catch (err) {
        // console.log(err);
        throw err
    }
}



export const sendJSON = async function (url, uploadData) {
    try {
        //this is how to --> post data or send data
        const fetchpro = fetch(url, {
            method: 'POST',     //method is to be set to post to send data or post data
            headers: {
                'Content-Type': 'application/json',  //we need to define headers and write this  content-type and application/json in the same manner 
                // as we have written here 
            },
            body: JSON.stringify(uploadData)

        })
        const res = await Promise.race([fetchpro, timeout(TIMEOUT_SEC)])//using dynamic id to get the api data to create our stuff 
        const data = await res.json()

        if (!res.ok) throw Error(`something Happened  ${res.status} ${res.statusText}`);
        return data
    } catch (err) {
        console.log(err);
        throw err
    }
}
*/