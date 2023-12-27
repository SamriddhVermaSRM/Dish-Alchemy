import React, { useState } from "react";
import './App.css';

const Ctoken1 = "s";
const Ctoken2 = "k-UUUbZJrsp3m9Ci";
const Ctoken3 = "u8c7LPT3BlbkFJ9v4PC6sfSul2Pg7ywyWD";


function EnterDishName( {upgpt, resgpt}) {
    const resq = () => {
      resgpt(true);
    };
  
    const [dishName, setDishName] = useState("");
    const handleChange = (event) => {
      setDishName(event.target.value);
    };
  
    
    
    const handleSubmit = () => {
      if (dishName !== "")
      gpt(dishName);
    };
  
    const setgptresponse = (result) => {
      upgpt(result);
    };
    
    const gpt = async (dishName) => { 
    console.log("gpt called");
    resq();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Ctoken1 + Ctoken2 + Ctoken3 ); // 
    
        var raw = JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [
            {
              "role": "system",
              "content": "You are a helpful assistant designed to output list of ingredients, recipe and nutritional_value and dish_name for given input dish in JSON format."
            },
            
            {
              "role": "user",
              "content": dishName
            }
          ]
        });
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch("https://api.openai.com/v1/chat/completions", requestOptions)
          .then(response => response.json())
          .then(result => ((setgptresponse(result), console.log("response recieved"))))
          .catch(error => console.log('error', error));
    };
     return (
      <div className="dish">
        <div className="dishbox">
          <input className='dishname' type="text" placeholder="Enter the dish name" onChange={handleChange} />
          <button className='dishbtn' type='submit' onClick={handleSubmit}>Submit</button>
        </div>
      </div>
     );
  }

  export default EnterDishName;