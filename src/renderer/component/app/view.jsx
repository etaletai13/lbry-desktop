// @flow
import React from 'react';
import Router from 'component/router/index';
import Theme from 'component/theme';
import ModalRouter from 'modal/modalRouter';
import ReactModal from 'react-modal';
import throttle from 'util/throttle';
import SideBar from 'component/sideBar';
import Header from 'component/header';
import { openContextMenu } from '../../util/contextMenu';

type Props = {
  alertError: (string | {}) => void,
  recordScroll: number => void,
  currentStackIndex: number,
  currentPageAttributes: { path: string, scrollY: number },
  pageTitle: ?string,
};

class App extends React.PureComponent<Props> {
  constructor() {
    super();
    this.mainContent = undefined;
    (this: any).scrollListener = this.scrollListener.bind(this);
  }

  componentWillMount() {
    const { alertError } = this.props;

    // TODO: create type for this object
    // it lives in jsonrpc.js
    document.addEventListener('unhandledError', (event: any) => {
      alertError(event.detail);
    });
  }

  componentDidMount() {
    const mainContent = document.getElementById('content');
    this.mainContent = mainContent;

    if (this.mainContent) {
      this.mainContent.appendChild(document.createElement('scrollbar'));

      document
        .getElementsByTagName('scrollbar')[0]
        .appendChild(document.createElement('scrollbarTrack'));

      /*
      // Apparently gives full document height
      document.body.scrollHeight
      document.body.offsetHeight
      document.documentElement.scrollHeight
      */

      /*
        Full page height...needs page to finish loading
        document.getElementsByClassName("main")[0].scrollHeight

        Window height
        document.body.scrollHeight
      */

      // this.mainContent.addEventListener('scroll', throttle(this.scrollListener, 750));
      this.mainContent.addEventListener('scroll', this.scrollListener); //
    }

    ReactModal.setAppElement('#window'); // fuck this
  }

  componentWillReceiveProps(props: Props) {
    const { pageTitle } = props;
    this.setTitleFromProps(pageTitle);
  }

  componentDidUpdate(prevProps: Props) {
    const { currentStackIndex: prevStackIndex } = prevProps;
    const { currentStackIndex, currentPageAttributes } = this.props;

    if (this.mainContent && currentStackIndex !== prevStackIndex && currentPageAttributes) {
      this.mainContent.scrollTop = currentPageAttributes.scrollY || 0;
    }
  }

  componentWillUnmount() {
    if (this.mainContent) {
      this.mainContent.removeEventListener('scroll', this.scrollListener);
    }
  }

  setTitleFromProps = (title: ?string) => {
    window.document.title = title || 'LBRY';
  };

  scrollListener() {
    const { recordScroll } = this.props;

    const ratio = [
      document.body.scrollHeight / document.getElementsByClassName('main')[0].scrollHeight,
      document.getElementsByTagName('scrollbar')[0].clientWidth / document.body.scrollWidth
    ];

    const scrollbarDraggerHeight = Math.round(ratio[0] * document.getElementsByTagName('scrollbar')[0].clientHeight);
    const scrollableHeight = document.getElementsByClassName('main')[0].scrollHeight - document.body.scrollHeight;

    const scrollRatio = scrollableHeight / scrollbarDraggerHeight;

    if (this.mainContent) {
      const scrollAmount = this.mainContent.scrollTop / scrollRatio;

      document.getElementsByTagName('scrollbartrack')[0].style.height = `${scrollbarDraggerHeight}px`;

      document.getElementsByTagName('scrollbartrack')[0].style.transform =
        scrollAmount > 0 ? `translateY(${scrollAmount}px)` : `translateY(0)`;

      throttle(recordScroll(this.mainContent.scrollTop), 750);
      // recordScroll(this.mainContent.scrollTop);
    }
  }

  mainContent: ?HTMLElement;

  render() {
    return (
      <div id="window" onContextMenu={e => openContextMenu(e)}>
        <Theme />
        <Header />
        <main className="page">
          <SideBar />
          <div className="content" id="content">
            <Router />
            <ModalRouter />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
