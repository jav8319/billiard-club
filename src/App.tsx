import React from 'react';
import BilliardClubApp from './pages/Home';
import Footer from './components/Footer';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div className="bodydiv">
      <Header />
      <BilliardClubApp />
      <Footer />
    </div>
  );
};

export default App;
