import React, { useState } from 'react';

function RangeInputs({ id }) {
    const [inputs, setInputs] = useState([]);

    const addInput = () => {
      setInputs([...inputs, '']);
    };
  
    const handleInputChange = (index, value) => {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
    };
  
    return (
      <div>
        <button onClick={addInput}>Add Input</button>
        {inputs.map((input, index) => (
          <input
            key={index}
            type="text"
            onClick={() => handleInputChange(index, /* New value */)}
            value={input}
            readOnly
          />
        ))}
      </div>
    );
}

export default RangeInputs;
