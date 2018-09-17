import { connect } from 'react-redux';
import { doResolveUri, selectClaimsByUri, selectResolvingUris, selectBalance } from 'lbry-redux';
import { doNavigate } from 'redux/actions/navigation';
import {
  selectPublishFormValues,
  selectIsStillEditing,
  selectMyClaimForUri,
  selectIsResolvingPublishUris,
  selectWinningClaims
} from 'redux/selectors/publish';
import {
  doResetThumbnailStatus,
  doClearPublish,
  doUpdatePublishForm,
  doPublish,
  doPrepareEdit,
} from 'redux/actions/publish';
import PublishPage from './view';

const select = state => {
  const isStillEditing = selectIsStillEditing(state);
  const myClaimForUri = selectMyClaimForUri(state);
  const publishState = selectPublishFormValues(state);
  const { uri } = publishState;



  const { claimForShortUri, claimForUriWithChannel } = selectWinningClaims(state);

  let winningBidForClaimUri;
  let winndingBidForClaimWithChannel;
  if (claimForUriWithChannel) {
    winndingBidForClaimWithChannel = claimForUriWithChannel.effective_amount;
  }
  if (claimForShortUri) {
    winningBidForClaimUri = claimForShortUri.effective_amount;
  }

  return {
    ...publishState,
    // The winning claim for a short lbry uri
    claimForShortUri,
    claimForUriWithChannel,
    winningBidForClaimUri,
    winndingBidForClaimWithChannel,
    // My previously published claims under this short lbry uri
    myClaimForUri,
    // If I clicked the "edit" button, have I changed the uri?
    // Need this to make it easier to find the source on previously published content
    isStillEditing,
    balance: selectBalance(state),
    isResolvingUris: selectIsResolvingPublishUris(state),
  };
};

const perform = dispatch => ({
  updatePublishForm: value => dispatch(doUpdatePublishForm(value)),
  clearPublish: () => dispatch(doClearPublish()),
  resolveUri: uri => dispatch(doResolveUri(uri)),
  publish: params => dispatch(doPublish(params)),
  navigate: path => dispatch(doNavigate(path)),
  prepareEdit: (claim, uri) => dispatch(doPrepareEdit(claim, uri)),
  resetThumbnailStatus: () => dispatch(doResetThumbnailStatus()),
});

export default connect(
  select,
  perform
)(PublishPage);
