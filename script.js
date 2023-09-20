// Drugs API
// https://api.fda.gov/drug/label.json?search=openfda.generic_name:Hydrocodone&limit=5
// parameters: pediatric_use, warnings

const drugButton = document.querySelector("#drugButton");
let queryField = document.getElementById('destination')
let textarea = document.getElementById("textarea")
// ar currentInformation = document.getElementById("myText").value;


drugButton.addEventListener("click", async (e) => {
  let drugName = queryField.value;
  console.log(drugName);
  let myQuery = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:${drugName}`;
  console.log(myQuery);
  let response = await fetch(myQuery);
  let responseJson = await response.json(); // read JSON response
  console.log(responseJson);

    // code to execute once JSON response is available
  let pediatricUse = 
    responseJson["results"] [0] ["pediatric_use"];
  let warnings = 
      responseJson["results"] [0] ["boxed_warning"];
   textarea.value = pediatricUse + "\n" + "\n" + warnings; 
  // console.log(warnings);
  

  
});

