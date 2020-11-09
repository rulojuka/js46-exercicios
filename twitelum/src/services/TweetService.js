export const TweetService = {
  adiciona(conteudo) {
    const URL = `https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`
    const objeto = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ conteudo })
    }
    return fetch(URL, objeto)
      .then((respostaDoServer) => {
        return respostaDoServer.json()
      })
  },

  busca() {
    const URL = `https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`
    return fetch(URL)
      .then(response => response.json())
  }
}