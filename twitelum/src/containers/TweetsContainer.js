import React, { Component, Fragment } from 'react';
import Tweet from '../components/Tweet'
import { ReactReduxContext } from 'react-redux'
import { TweetsThunkActions } from '../store/ducks/tweets';
import { Modal } from '../components/Modal';

class TweetsContainer extends Component {
  static contextType = ReactReduxContext

  constructor() {
    super()
    this.state = {
      tweets: [],
      tweetAtivoNoModal: {},
    }
  }

  componentDidMount() {
    const store = this.context.store
    store.subscribe(() => {
      this.setState({
        tweets: store.getState().tweets.data,
        tweetAtivoNoModal: store.getState().tweets.activeDataItem
      })
    })

    store.dispatch(TweetsThunkActions.carregaTweets())
  }

  abreModal = idDoTweetQueVaiProModal => {
    const store = this.context.store;
    store.dispatch(TweetsThunkActions.setTweetAtivo(idDoTweetQueVaiProModal));
  };

  fechaModal = () => {
    const store = this.context.store;
    store.dispatch(TweetsThunkActions.unsetTweetAtivo());
  };

  renderTweets = (tweets) => {
    if (tweets.length > 0) {
      return tweets.map((tweetInfo) => {
        return <Tweet
          texto={tweetInfo.conteudo}
          key={tweetInfo._id}
          usuario={tweetInfo.usuario}
          id={tweetInfo._id}
          likeado={tweetInfo.likeado}
          totalLikes={tweetInfo.totalLikes}
          removivel={tweetInfo.removivel}
          removeHandler={(event) => this.removeTweet(tweetInfo._id)}
          onClickNaAreaDeConteudo={() => this.abreModal(tweetInfo._id)}
          likeHandler={() => this.likeHandler(tweetInfo._id)}
        />
      })
    }
    else {
      return <h3>Crie um novo tweet!</h3>
    }
  }

  removeTweet(idTweetQueVaiSerRemovido) {
    this.context.store
      .dispatch(TweetsThunkActions.remove(idTweetQueVaiSerRemovido))
      .then(() => {
        this.fechaModal();
      });
  }

  likeHandler = idDoTweet => {
    this.context.store.dispatch(TweetsThunkActions.like(idDoTweet));
  };


  render() {
    return (
      <Fragment>
        <div className="tweetsArea">
          {this.renderTweets(this.state.tweets)}
        </div>
        <Modal
          isAberto={Boolean(this.state.tweetAtivoNoModal._id)}
          onFechando={this.fechaModal}
        >
          {() => (this.renderTweets([this.state.tweetAtivoNoModal]))}
        </Modal>
      </Fragment>
    );
  }
}

export default TweetsContainer;
