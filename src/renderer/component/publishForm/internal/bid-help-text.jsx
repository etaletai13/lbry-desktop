// @flow
import * as React from 'react';
import Button from 'component/button';
import { buildURI } from 'lbry-redux';
import type { Claim } from 'types/claim';

type Props = {
  uri: ?string,
  isResolvingUri: boolean,
  winningBidForClaimUri: ?number,
  myClaimForUri: ?Claim,
  isStillEditing: boolean,
  onEditMyClaim: (any, string) => void,
};

class BidHelpText extends React.PureComponent<Props> {
  render() {
    const {
      uri,
      isResolvingUri,
      winningBidForClaimUri,
      myClaimForUri,
      onEditMyClaim,
      isStillEditing,
      winndingBidForClaimWithChannel
    } = this.props;

    if (!uri) {
      return __('Create a URL for this content.');
    }

    if (isStillEditing) {
      return __(
        'You are currently editing this claim. If you change the URL, you will need to reselect a file.'
      );
    }

    if (isResolvingUri) {
      return __('Checking the winning claim amount...');
    }

    if (myClaimForUri) {
      const editUri = buildURI({
        contentName: myClaimForUri.name,
        claimId: myClaimForUri.claim_id,
      });

      return (
        <React.Fragment>
          {__('You already have a claim at')}
          {` ${uri} `}
          <Button
            button="link"
            label="Edit it"
            onClick={() => onEditMyClaim(myClaimForUri, editUri)}
          />
          <br />
          {__('Publishing will update your existing claim.')}
        </React.Fragment>
      );
    }
    
    if (!winningBidForClaimUri && !winndingBidForClaimWithChannel) {
      return __('Any amount will give you the winning bid.');
    }
    
    const generateTakeOverMessage = (amount, uri) => {
      return `${__('A deposit greater than')} ${amount} ${__('is needed to win')} ${uri}`
    }
    
    let content;
    if (winndingBidForClaimWithChannel) {
      content = `Winning bid is ${winndingBidForClaimWithChannel}`
    }
    
    // <div>
    //   {__('However, you can still get')}{' '}
    //   {(winndingBidForClaimWithChannel && winningBidForClaimUri) ? __('these URLs for any amount')}
    // </div>
    return (
      <React.Fragment>
        {winningBidForClaimUri && (
          <div>{generateTakeOverMessage(winningBidForClaimUri, uri)}</div>
        )}
        {winndingBidForClaimWithChannel && (
          <div>{generateTakeOverMessage(winndingBidForClaimWithChannel, "uri with channel")}</div>
        )}

      </React.Fragment>
    )
  }
}

export default BidHelpText;
