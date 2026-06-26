
const express = require('express');
const router = express.Router();
const axios = require("axios"); // axios is required as it works very well for api connections: https://www.npmjs.com/package/axios#axios-api

// based off of API code from previous asignments and lots of debugging
router.post('/translate', async (req, res) =>{
    const { text } = req.body;
    const lang = req.body.lang;
    
    let from; // first box where user inputs
    let to; // second box where suggestion will be put (maybe add seperatley ratehr than in box??)

    // determine what the translation will be (en or es)
    if (lang=="en"){
        from = "en";
        to = "es";
    } else{
        from = "es";
        to = "en";
    }

    // try and catch to help see if error and why
    try{
        // use axios to get response from API
        const response = await axios.post(
            `${process.env.AZURE_TRANSLATOR_ENDPOINT}/translate?api-version=3.0&from=${from}&to=${to}`,
            [{ Text: text }],
            {
                // API azure translator connection where input will be translated
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.AZURE_TRANSLATOR_KEY,
                    "Ocp-Apim-Subscription-Region": process.env.AZURE_TRANSLATOR_REGION,
                    "Content-Type": "application/json"
                }
            }
        );

        // takes the first result of the translation-data of translation and extracts it to text string
        const translation = response.data[0].translations[0].text;

        // sets translation
        res.json({ translation });
    }
    // if errors, print error to console for fixing 
    catch (err){
        console.log(err);
        res.json({translation: ""});
    }
});

module.exports = router;