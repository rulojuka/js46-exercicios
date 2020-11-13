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
        tweets: store.getState().tweets.data
      })
    })

    store.dispatch(TweetsThunkActions.carregaTweets())
  }

  abreModal = tweetQueVaiProModal => this.setState({ tweetAtivoNoModal: tweetQueVaiProModal })

  fechaModal = () => this.setState({ tweetAtivoNoModal: {} });

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
          onClickNaAreaDeConteudo={() => this.abreModal(tweetInfo)}
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
