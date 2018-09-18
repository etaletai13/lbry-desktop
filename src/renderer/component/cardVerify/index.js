import { connect } from 'react-redux';
import { selectUserEmail } from 'lbryinc';
import CardVerify from './view';

const select = state => ({
  email: selectUserEmail(state),
});

const perform = dispatch => ({});

export default connect(
  select,
  perform
)(CardVerify);
