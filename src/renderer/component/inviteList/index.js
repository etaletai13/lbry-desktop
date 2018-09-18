import { connect } from 'react-redux';
import { selectUserInvitees, selectUserInviteStatusIsPending } from 'lbryinc';
import InviteList from './view';

const select = state => ({
  invitees: selectUserInvitees(state),
  isPending: selectUserInviteStatusIsPending(state),
});

const perform = dispatch => ({});

export default connect(
  select,
  perform
)(InviteList);
