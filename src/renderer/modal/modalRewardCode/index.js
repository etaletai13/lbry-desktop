import { connect } from 'react-redux';
import { doHideNotification } from 'lbry-redux';
import ModalRewardCode from './view';

const select = state => ({});

const perform = dispatch => ({
  closeModal: () => dispatch(doHideNotification()),
});

export default connect(
  select,
  perform
)(ModalRewardCode);
