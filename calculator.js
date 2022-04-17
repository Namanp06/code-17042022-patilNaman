const StreamArray = require('stream-json/streamers/StreamArray');
const path = require('path');
const fs = require('fs');
// let json = require('./demo.json');

async function find(testFileName) {
    
    return new Promise((resolve) => {
        //Using StreamArray for parsing large Json Data File
        const jsonStream = StreamArray.withParser();

        //You'll get json objects here
        //Key is an array-index here
        let myFinalJson = [];
        jsonStream.on('data', async ({ key, value }) => {
            let myObj = {};
            //Calculating BMI
            myObj.Gender = value.Gender;
            myObj.HeightCm = value.HeightCm;
            myObj.WeightKg = value.WeightKg;
            myObj.BMI = (value.WeightKg / Math.pow(value.HeightCm / 100, 2)).toFixed(1);
            if (myObj.BMI <= 18.4) {
                myObj.BMICategory = 'Underweight'
                myObj.HealthRisk = 'Malnutrition risk'
            } else if (myObj.BMI <= 24.9) {
                myObj.BMICategory = 'Normal weight'
                myObj.HealthRisk = 'Low risk'
            } else if (myObj.BMI <= 29.9) {
                myObj.BMICategory = 'Overweight'
                myObj.HealthRisk = 'Enhanced risk'
            } else if (myObj.BMI <= 34.9) {
                myObj.BMICategory = 'Moderately obese'
                myObj.HealthRisk = 'Medium risk'
            } else if (myObj.BMI <= 39.9) {
                myObj.BMICategory = 'Severel obese'
                myObj.HealthRisk = 'High'
            } else {
                myObj.BMICategory = 'Very severely obese'
                myObj.HealthRisk = 'Very high risk'
            }
            // myObj.BMICategory = myObj.BMI <= 18.4 ? 'Underweight' : myObj.BMI <= 24.9 ? 'Normal weight' : myObj.BMI <= 29.9 ? 'Overweight' :
            //     myObj.BMI <= 34.9 ? 'Moderately obese' : myObj.BMI <= 39.9 ? 'Severel obese' : 'Very severely obese'
            // myObj.HealthRisk = myObj.BMI <= 18.4 ? 'Malnutrition risk' : myObj.BMI <= 24.9 ? 'Low risk' : myObj.BMI <= 29.9 ? 'Enhanced risk' :
            //     myObj.BMI <= 34.9 ? 'Medium risk' : myObj.BMI <= 39.9 ? ' High' : 'Very high risk'
            myFinalJson.push(myObj)
        });

        jsonStream.on('end', async () => {
            // return myFinalJson;
            resolve(myFinalJson);
        });

        const filename = path.join(__dirname, testFileName ? testFileName + '.json' : 'demo.json');
        fs.createReadStream(filename).pipe(jsonStream.input);


        return myFinalJson;

    });
}

exports.find = find;