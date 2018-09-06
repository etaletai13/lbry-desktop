import React from 'react';
import { connect } from 'react-redux';
import RewardTile from './view';
import { modals, doNotify } from 'lbry-redux';

const perform = dispatch => ({
  openRewardCodeModal: () => dispatch(doNotify({ id: modals.REWARD_CODE })),
});

export default connect(
  null,
  null
)(RewardTile);
