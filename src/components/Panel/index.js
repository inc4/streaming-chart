import coin from '../../assets/coin.png';
import {useState} from 'react';
import RangeInput from '../RangeInput';

const up = 'up';
const down = 'down';

const Panel = ({ price = 0 }) => {
  const [switchKey, setSwitchKey] = useState(up);
  const [amount, setAmount] = useState('10');
  const [multiplier, setMultiplier] = useState(500);

  const handleAmount = (value) => {
    if (/^\d+$/.test(value) || !value) {
      setAmount(value);
    }
  };

  const handleMultiplier = (e) => {
    const {value} = e.target;

    if (/^\d+$/.test(value)) {
      setMultiplier(value > 1000 ? 1000 : value);
    }
  };

  const divide = () => setAmount((state) => state / 2);
  const multiply = () => setAmount((state) => state * 2);

  return (
    <div className="panel">
      <p className="label">
        WILL THE PRICE GO UP OR DOWN?
      </p>
      <div className="switcher">
        <button
          className={`switcher_item ${switchKey === up ? 'switch_up' : ''}`}
          onClick={() => setSwitchKey(up)}
        >
          <svg width="8" height="10" viewBox="0 0 8 10" xmlns="http://www.w3.org/2000/svg" >
            <path d="M8 5.551L4 2.643 0 5.551V2.908L4 0l4 2.908V5.55zM8 10L4 7.092 0 10V7.357l4-2.908 4 2.908V10z" fillRule="evenodd"></path>
          </svg>
          Up
        </button>
        <button
          className={`switcher_item ${switchKey === down ? 'switch_down' : ''}`}
          onClick={() => setSwitchKey(down)}
        >
          <svg width="8" height="10" viewBox="0 0 8 10" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4.449L4 7.357 0 4.449v2.643L4 10l4-2.908V4.45zM8 0L4 2.908 0 0v2.643l4 2.908 4-2.908V0z" fillRule="evenodd"></path>
          </svg>
          Down
        </button>
      </div>
      <p className="label">wager</p>
      <div className="input-wrapper">
        <img src={coin} alt="coin" className="coin" />
        <span className="dollar">$</span>
        <input
          type="text"
          className="input"
          value={amount}
          placeholder="0"
          onChange={(e) => handleAmount(e.target.value)}
        />
        <div className="input-buttons">
          <button className="input-button" onClick={divide}>1/2</button>
          <button className="input-button" onClick={multiply}>x2</button>
        </div>
      </div>
      <p className="label">PAYOUT MULTIPLIER</p>
      <div className="multiplier-wrapper">
        <div className="input-wrapper input-wrapper_multiplier">
          <span className="input-wrapper-left">x</span>
          <input
            type="text"
            className="input"
            value={+multiplier}
            onChange={handleMultiplier}
          />
        </div>
        <div className="multiplier-wrapper__right">
          <p className="multiplier-wrapper__label">Bust Price:</p>
          <p className="multiplier-wrapper__price">{(price / multiplier).toFixed(2)}</p>
        </div>
      </div>
      <RangeInput
        min={1}
        max={1000}
        value={multiplier}
        onChange={setMultiplier}
      />
      <div className="range-legend">
        <p>
          x1 · <span className="range-legend__green">Safe</span>
        </p>
        <p>
          <span className="range-legend__red">Wild</span> · x1000
        </p>
      </div>
      <button className={`submit ${switchKey === down ? 'submit_down' : ''}`}>
        place bet
      </button>
    </div>
  )
};

export default Panel;
