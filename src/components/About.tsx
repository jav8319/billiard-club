import React, { useState } from 'react';
import image1 from'../assets/alworking.gif';

const About:React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-4 mt-4 px-2 about-section">
     
      <div
        className="card"
        style={{ backgroundColor: '#2c2c2e', color: 'white', borderColor: '#f0ad4e', padding: '15px' }}
      >
            <div className='d-flex justify-content-center'>
      <img src={image1} className='imgal' alt="billiard app algorith" style={{marginBottom:'20px'}}/>
      </div>
         <h5 className='mb-3 mx-4'>About This App</h5>
        <p>
          The <strong>Billiard Club App</strong> is designed to make billiard games more organized and enjoyable.
          It helps you keep track of wins and losses, while ensuring every player gets a fair chance to compete.
        </p>
        
        {isExpanded ? (
          <>
            <p>
            The app features a well-structured algorithm that ensures all players will play against one another, 
            with no same opponent appearing consecutively. It includes a weighting system that pairs winners 
            more frequently after everyone has had a chance to play.
            </p>
            <p>
              It is flexible: players can be added or removed at any time without affecting the algorithm's capacity to
              evenly match players. Whether you’re hosting a friendly billiard tournament or tracking regular games at
              your club, this app simplifies player management and provides an engaging way to stay on top of the
              competition!
            </p>
          </>
        ) : (
          <p>
            The app features a well-structured algorithm that guarantees all players will play with one another at
            least once, while allowing flexibility in player additions or removals.
          </p>
        )}
        <button
          onClick={toggleReadMore}
          style={{ marginTop: '10px', backgroundColor: '#f0ad4e', color: 'black', border: 'none', padding: '5px 10px' }}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
}

export default About;
