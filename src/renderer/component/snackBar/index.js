import { connect } from 'react-redux';
import { selectSnack, doHideNotification } from 'gmc-redux';
import SnackBar from './view';

const perform = dispatch => ({
  removeSnack: () => dispatch(doHideNotification()),
});

const select = state => ({
  snack: selectSnack(state),
});

export default connect(select, perform)(SnackBar);
