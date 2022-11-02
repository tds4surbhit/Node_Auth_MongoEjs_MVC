const { json } = require('body-parser');
const fetch = require('node-fetch');



const getData = async () => {
    let finalArray = [];
    let url1 = 'https://api.nationalize.io/?name=mike'
    let url2 = 'https://api.nationalize.io/?name=bob'
    let url3 = 'https://api.nationalize.io/?name=sami'
    let response_one = await fetch(url1);
    let response_two = await fetch(url2);
    let response_three = await fetch(url3);
    let response_one_json = await json(response_one);
    let response_two_json = await json(response_two);
    let response_three_json = await json(response_three);
    
    if(response_one_json && response_two_json){
        console.log("Results came from 1st and 2nd Url");
        finalArray = [...response_one_json, ...response_two_json];
    }
    if(response_one_json && response_three_json){
        console.log("Results came from 1st and 3rd Url");
        finalArray = [...response_one_json, ...response_three_json];

    }
    finalArray = [...response_one_json, ...response_two_json, ...response_three_json];

}

getData();