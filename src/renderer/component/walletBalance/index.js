import { connect } from 'react-redux';
import { selectBalance } from 'gmc-redux';
import WalletBalance from './view';

const select = state => ({
  balance: selectBalance(state),
});

export default connect(select, null)(WalletBalance);
