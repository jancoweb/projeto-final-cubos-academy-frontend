import React from 'react';
import InputMask from 'react-input-mask';

class MaskedPhoneOnlyNumbers extends React.Component {
  render() {
    return (
      <InputMask
        {...this.props}
        className="modalEditUser__inputDefault"
        mask="99 9 9999-9999"
        placeholder="(DD) 9 9472-8888"
      />
    );
  }
}

export default MaskedPhoneOnlyNumbers;
