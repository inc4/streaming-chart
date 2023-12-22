import btc from '../../assets/btc.png';
import {useEffect, useRef, useState} from 'react';

const TopPanel = ({price}) => {
  const prevPriceRef = useRef(0);

  const [lowestPrice, setLowestPrice] = useState(price);
  const [highestPrice, setHighestPrice] = useState(price);

  useEffect(() => {
    prevPriceRef.current = price;

    if (price > highestPrice) {
      setHighestPrice(price);
    }
    if (price < lowestPrice || !lowestPrice) {
      setLowestPrice(price);
    }
  }, [price]);

  const isDown = price < prevPriceRef.current;

  return (
    <div className="top-panel">
      <img src={btc} alt="bitcoin" className="top-panel__btc"/>
      <span className={`top-panel__price ${isDown ? 'top-panel__price_red' : ''}`}>
        {!isDown ? (
          <svg width="8" height="10" viewBox="0 0 8 10" xmlns="http://www.w3.org/2000/svg" >
            <path d="M8 5.551L4 2.643 0 5.551V2.908L4 0l4 2.908V5.55zM8 10L4 7.092 0 10V7.357l4-2.908 4 2.908V10z" fillRule="evenodd"></path>
          </svg>
        ) : (
          <svg width="8" height="10" viewBox="0 0 8 10" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4.449L4 7.357 0 4.449v2.643L4 10l4-2.908V4.45zM8 0L4 2.908 0 0v2.643l4 2.908 4-2.908V0z" fillRule="evenodd"></path>
          </svg>
        )}
        {price.toLocaleString()}
        <div className="top-panel__info">
          <span>H: </span>
          <span className="green">{highestPrice.toLocaleString()}</span>
          ·
          <span>L:</span>
          <span className="red">{lowestPrice.toLocaleString()}</span>
        </div>
      </span>
    </div>
  )
};

export default TopPanel;
