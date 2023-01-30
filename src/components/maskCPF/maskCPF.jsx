import React from 'react';
import InputMask from 'react-input-mask';

const onlyNumbers = str => str.replace(/[^0-9]/g, '');

const MaskedCpfOnlyNumbers = ({ value, onChange, name, mask, errors }) => {
  function handleChange(event) {
    onChange({
      ...event,
      target: {
        ...event.target,
        name,
        value: onlyNumbers(event.target.value),
      },
    });
  }

  return (
    <InputMask
      className="modalEditUser__inputDefault"
      placeholder="___.___.___-__"
      name={name}
      mask={mask}
      value={value}
      onChange={handleChange}
    />
  );
};

export default MaskedCpfOnlyNumbers;
