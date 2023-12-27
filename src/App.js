import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.png'
import flowchart from './assets/flowchart.png'
import EnterDishName from './Request'

//main app component
function App() {
  const [dishNameEnter, setDishNameEnter] = useState(false);
  const [GPTresponse, setGPTresponse] = useState("");
  const [resSent, setresSent] = useState(false);
  
  console.log(GPTresponse);
  return (
    <div className='App'>
      <Header />
      {dishNameEnter === false ?
        <><Content /> <Scanbutton func={setDishNameEnter} /> <Demo /></> 
        : 
        resSent === false ? 
          <EnterDishName upgpt={setGPTresponse} resgpt={setresSent} />
          : 
          GPTresponse === "" ?
            <ResLoading />
            :
            <GPTresponsedisplay gptjson={GPTresponse} />}
      <Footer />
    </div>
  );
}

//gpt response display component
function GPTresponsedisplay( gptjson ) {
  var gptjsonmsg = JSON.parse(gptjson.gptjson.choices[0].message.content);
  var nutritionalvalue = gptjsonmsg.nutritional_value;
  return (
    <div className='output'>
      <div className='Dish'>
        <h1>
          Dish Name:  {gptjsonmsg.dish_name}
        </h1>
      </div>
      <br />
      <div className='ingredients'>
        <h1>Ingredients: </h1>
        <ul>
          {gptjsonmsg.ingredients.map((ingredient, index) => (
            <li>
              <p className='Ing' key={index}>
                {ingredient}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <br />
      <div> 
        <h1>Recipe: </h1>
          {gptjsonmsg.recipe.map((recipe, index) => (
            <p className='Recipe' key={index}>{recipe}
            </p>
          ))}
      </div>
      <br />
      <div>
        <h1>
          Nutritional Value: 
        </h1>  
        {Object.entries(nutritionalvalue).map(([key, value], index) => (
        <div className='Nut-key-value' key={index}>
          <h3>
            {key}:
          </h3> 
            {value}
        </div>
        ))}
      </div>
    </div>
  );
}


//header component
function Header() {
  return (
    <div>
      <nav>
        <img src={logo} className="logo" alt="logo" onClick={() => window.location.reload()}>
        </img>
        <ul>
          <li><button onClick={() => window.location.reload()}>Home</button></li>
          <li><button onClick={() => document.getElementById('demo').scrollIntoView({behavior: "smooth"})}>Demo</button></li>
          <li><button>Login</button></li>
          <li><button>Contact</button></li>
        </ul>
      </nav>
    </div>
  );
}

//content component
function Content() {
  return (
    <div className="main-content">
      <h1 className="mainheading">
        Welcome to <img src={logo} alt="logo"></img>
      </h1>
      <h4>Meal Magic Unveiled: Explore DishAlchemy's Detailed Breakdowns🔮</h4>
      <p>
        Step into the realm of gastronomic exploration with DishAlchemy. 
        DishAlchemy goes beyond the plate, scanning meals to reveal a treasure trove of 
        culinary details. From the freshest ingredients to the step-by-step recipe breakdowns
        and comprehensive nutritional insights, DishAlchemy captures the essence of every meal. 
        Dive into a world where every dish tells a tale - discover its carefully curated ingredients, 
        follow the meticulous recipe, and uncover the nutritional value woven into each bite.It's more
        than a scan; it's a journey through the heart of your meal's story. It's the art and science 
        of meals, brought to life. 🌟🍴💡
      </p>
    </div>
  );
}

//scan button component
function Scanbutton( {func} ) {
  const handleClick = () => {
    func(true);
    };
  return (
    <div className="scansection">
      <div className="scanbutton" onClick={handleClick}>
        ENTER THE DISH NAME AND DIVE INTO THE WORLD OF DishAlchemy!
      </div>
    </div>
  );
}

//demo component
function Demo() {
  return ( 
    <div>
      <div id="demo">
        <h1>DEMO
        </h1>
        <div className="flowc">
            <div className="fc-text">
                    <h2>Need help to proceed?
                    We got you:)</h2>
                    <h2>Refer to the flowchart alongside to see how it works✨</h2>
            </div>
            <div className="fc-img">
            <img src={flowchart} alt=""></img>
            </div>
        </div>
      </div>
    </div>
  );
}

//loading screen component
function ResLoading()
{
  return(
    <div className="dish">
    <div className="loadingio-spinner-spinner-r8v9lcnvu8f"><div className="ldio-0krhie7mzfff">
    <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div></div>
    </div>
  );
}

//footer component
function Footer() {
  return (
    <div className='footer'>
      © 2023, DishAlchemy Inc. or its affiliates
    </div>
  );
}

export default App;