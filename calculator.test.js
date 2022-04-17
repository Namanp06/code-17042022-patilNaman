const { expect } = require('@jest/globals');
const calculator = require('./calculator');
//Testing Json Data
testingJson =[{"Gender": "Male", "HeightCm": 171, "WeightKg": 96 }, {"Gender": "Male", "HeightCm": 161,
"WeightKg":85 }];

//Result Data for the Testing Data
result=[{
    "Gender": "Male",
    "HeightCm": 171,
    "WeightKg": 96,
    "BMI": "32.8",
    "BMICategory": "Moderately obese",
    "HealthRisk": "Medium risk"
},
{
    "Gender": "Male",
    "HeightCm": 161,
    "WeightKg": 85,
    "BMI": "32.8",
    "BMICategory": "Moderately obese",
    "HealthRisk": "Medium risk"
}
];

//Testing
test('result should be rqual to the demo object', async () => {
        // const data = await calculator.find(testingJson);
        const data =  await calculator.find('test'); 
            
        //console.log(" Hello data is : ", data);
        let newData = 10;
        expect(JSON.stringify(data)).toEqual(JSON.stringify(result));
});


