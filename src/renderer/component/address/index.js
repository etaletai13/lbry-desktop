import { connect } from 'react-redux';
import { doNotify } from 'gmc-redux';
import Address from './view';

export default connect(null, {
  doNotify,
})(Address);
