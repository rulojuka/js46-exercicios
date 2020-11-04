import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'

class HomePage extends Component {
  constructor(){
    super()
    this.state={
      novoTweet: "",
      tweets: []
    }
  }

  adicionaTweet = (infosDoEvento) => {
    infosDoEvento.preventDefault()
    if( this.state.novoTweet.length > 0 ){
      this.setState({
        tweets: [this.state.novoTweet, ...this.state.tweets ],
        novoTweet: ""
      })
    }
  }

  renderTweets = (tweets) => {
    if(this.state.tweets.length > 0){
      return this.state.tweets.map( (tweetInfo,index) => {
        return <Tweet
          texto={tweetInfo}
          key={tweetInfo + index}/>
      })
    }
    else{
      return <h3>Crie um novo tweet!</h3>
    }
  }

  render() {
    return (
      <Fragment>
        <Cabecalho>
            <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <form
                    className="novoTweet"
                    onSubmit={ this.adicionaTweet }>
                        <div className="novoTweet__editorArea">
                            <span className={
                              `novoTweet__status
                              ${
                                this.state.novoTweet.length > 140
                                ? 'novoTweet__status--invalido'
                                : ''
                              }
                              `
                            }>{ this.state.novoTweet.length }/140</span>
                            <textarea
                              className="novoTweet__editor"
                              placeholder="O que está acontecendo?"
                              value={this.state.novoTweet}
                              onChange={(event)=>this.setState({ "novoTweet": event.target.value })}
                              ></textarea>
                        </div>
                        <button
                        type="submit"
                        className="novoTweet__envia"
                        disabled={ this.state.novoTweet.length > 140 || this.state.novoTweet.length === 0 }
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
                     { this.renderTweets(this.state.tweets) }
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default HomePage;
