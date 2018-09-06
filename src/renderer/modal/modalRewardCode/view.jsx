// @flow
import React from 'react';
import { Form, FormRow, FormField } from 'component/common/form';
import { Modal } from 'modal/modal';
import Button from 'component/button';

type Props = {};

class ModalWalletEncrypt extends React.PureComponent<Props> {
  state = {
    rewardCode: '',
  };

  render() {
    const { closeModal } = this.props;

    const { rewardCode } = this.state;

    return (
      <Modal
        isOpen
        contentLabel={__('Encrypt Wallet')}
        type="confirm"
        confirmButtonLabel={__('Encrypt Wallet')}
        abortButtonLabel={__('Cancel')}
        onConfirmed={() => console.log('hi')}
        onAborted={closeModal}
      >
        <FormRow>
          <FormField label={__('Code')} placeholder="0123abc" value={rewardCode} />
        </FormRow>
        <div className="card__actions">
          <Button
            button="link"
            label={__('Learn more')}
            href="https://lbry.io/faq/wallet-encryption"
          />
        </div>
        {failMessage && <div className="error-text">{__(failMessage)}</div>}
      </Modal>
    );
  }
}

export default ModalWalletEncrypt;
