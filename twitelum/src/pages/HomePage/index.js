import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import { TweetService } from '../../services/TweetService';
import Helmet from 'react-helmet'
import { Modal } from "../../components/Modal";

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      novoTweet: "",
      tweets: [],
      tweetAtivoNoModal: {},
    }
  }

  abreModal = tweetQueVaiProModal => {
    this.setState({
      tweetAtivoNoModal: tweetQueVaiProModal
    }, () => {
      console.log(this.state.tweetAtivoNoModal);
    });
  };

  fechaModal = () => this.setState({ tweetAtivoNoModal: {} });

  adicionaTweet = (infosDoEvento) => {
    infosDoEvento.preventDefault()

    if (this.state.novoTweet.length > 0) {
      TweetService.adiciona(this.state.novoTweet)
        .then((tweetVindoDoServidor) => {
          this.setState({
            tweets: [tweetVindoDoServidor, ...this.state.tweets],
            novoTweet: ""
          })
        })
    }
  }

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

  componentDidMount() {
    TweetService.busca()
      .then((tweets) => {
        this.setState({
          tweets
        })
      })
  }

  removeTweet(idTweetQueVaiSerRemovido) {
    TweetService.remove(idTweetQueVaiSerRemovido)
      .then((response) => {
        console.log(response)
        const listaDeTweetsAtualizada = this.state.tweets.filter((tweet) => tweet._id !== idTweetQueVaiSerRemovido)
        this.setState({
          tweets: listaDeTweetsAtualizada
        })
        this.fechaModal()
      })
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>
            Twitelum - ({`${this.state.tweets.length}`})
          </title>
        </Helmet>
        <Cabecalho>
          <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <form
                className="novoTweet"
                onSubmit={this.adicionaTweet}>
                <div className="novoTweet__editorArea">
                  <span className={
                    `novoTweet__status
                              ${this.state.novoTweet.length > 140
                      ? 'novoTweet__status--invalido'
                      : ''
                    }
                              `
                  }>{this.state.novoTweet.length}/140</span>
                  <textarea
                    className="novoTweet__editor"
                    placeholder="O que está acontecendo?"
                    value={this.state.novoTweet}
                    onChange={(event) => this.setState({ "novoTweet": event.target.value })}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="novoTweet__envia"
                  disabled={this.state.novoTweet.length > 140 || this.state.novoTweet.length === 0}
                >Tweetar</button>
              </form>
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <div className="tweetsArea">
                {this.renderTweets(this.state.tweets)}
              </div>
            </Widget>
          </Dashboard>
        </div>
        <Modal
          isAberto={Boolean(this.state.tweetAtivoNoModal._id)}
          onFechando={this.fechaModal}
        >
          {() => (
            this.renderTweets([this.state.tweetAtivoNoModal])
          )}
        </Modal>
      </Fragment>
    );
  }
}

export default HomePage;
