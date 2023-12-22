import React, {useCallback, useEffect, useState} from 'react';
import ChartJS from './components/ChartJS';
import Panel from './components/Panel';
import TopPanel from './components/TopPanel';

const App = () => {
  const [price, setPrice] = useState(0);

  const handlePrice = useCallback((value) => {
    setPrice(value)
  }, []);

  return (
    <div className="container">
      <div className="wrapper">
        <TopPanel price={price}/>
        <ChartJS handlePrice={handlePrice}/>
      </div>
      <Panel price={price}/>
    </div>
  );
};

export default App;
