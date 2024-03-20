
import React from 'react';

import { useState } from 'react';
import { useHistory } from 'react-router-dom';

//used to display homepage
const Homepage = () => {
   const history = useHistory();

   const [isHovering, setIsHovering] = useState(false);


   //used to handle Mouse Over Event
   // const handleMouseOver = () => {

   //    setIsHovering(true);

   // };


   // //used to Handle Mouse Out Event
   // const handleMouseOut = () => {

   //    setIsHovering(false);

   // };

   const StartPage = () => {

      sessionStorage.removeItem("id");
      history.push("/nav");
   }

   return (
      <div className="container" style={{ overflow: 'hidden' }}>
         <div className="welcome-container" style={{ backgroundImage: 'none' }}>
            <h1 className="welcome">Welcome!!! <br/>
               <span className="moving-text">Nostalgic Nest Preloved Furniture Store</span>
            </h1>
         </div>
         <div className="btnstart">
         <button 
               className={`start-button ${isHovering ? 'hovered' : ''}`} // Apply 'hovered' class when isHovering is true
               onClick={() => StartPage()} 
               onMouseOver={() => setIsHovering(true)} // Set isHovering to true on mouse over
               onMouseOut={() => setIsHovering(false)} // Set isHovering to false on mouse out
            ><h1>Click to Get Started</h1></button>
         </div>
         <div className="bottom-content">
            <p className="bottom-text">Unlock Style and Savings: Enjoy 25% Off Your First Furniture Purchase! Elevate Your Space for Less!!!</p>
         </div>
      </div>
   );

}
//exporting home page
export default Homepage;