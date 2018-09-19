import { connect } from 'react-redux';
import { doHideNotification } from 'gmc-redux';
import ModalSocialShare from './view';

const perform = dispatch => ({
  closeModal: () => dispatch(doHideNotification()),
});

export default connect(
  null,
  perform
)(ModalSocialShare);
