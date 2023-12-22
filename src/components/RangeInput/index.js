const RangeInput = ({min, max, value, onChange}) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  };
  return (
    <input
      type="range"
      className="styled-slider"
      value={value}
      step={1}
      max={max}
      min={min}
      onInput={handleChange}
    />
  )
};

export default RangeInput;
