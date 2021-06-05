export {Api}
class Api {
    constructor({address,token}) {
      this.address = address;
      this.token = token;
    }
    _checkStatus(result){
      if (result.ok) {
        return result.json()
    } else {
        return Promise.reject(`Ошибка: ${result.status}`)
    }
    }
    getUserInfo(){
      return fetch(`${this.address}/users/me`, {
        method:'GET',
          headers: {
            authorization: this.token
          }
        })
        .then(result => {
          return this._checkStatus(result)
      })
    }


    updateUser({name,about}) {
      return fetch(`${this.address}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name,about})
      })    
      .then(result => {
        return this._checkStatus(result)
      });
  }
  
  updateAvatar(data) {
    return fetch(`${this.address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {avatar:data}
      )
    })    
    .then(result => {
      return this._checkStatus(result)
          });
}


getInitialCards(){
      return fetch(`${this.address}/cards`, {
        method:'GET',
          headers: {
            authorization: this.token
          }
        })
        .then(result => {
          return this._checkStatus(result)
      })
      .then(
        data =>
          data.map(e => {
            e.isMine = e.owner._id === "a335225deae10b0eeb469615";
            return e;
          })
      )
    }

    addCard({ name,link}){
      return fetch(`${this.address}/cards`, {
        method:'POST',
          headers: {
            authorization: this.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name,link})
        })
        .then(result => {
          return this._checkStatus(result)
      })
    }

    deleteCard(id) {
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-24/cards/${id}`, {
          method: 'DELETE',
          headers: {
              authorization: '43b98874-8a2f-4742-91c1-202875e69e98',
              'Content-Type': 'application/json'
          },
      })
          .then(result => {
            return this._checkStatus(result)
          })
  }
  addLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-24/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
            authorization: '43b98874-8a2f-4742-91c1-202875e69e98',
            'Content-Type': 'application/json'
        },
    })
        .then(result => {
          return this._checkStatus(result)
        })
  }

  removeLike(id) {
  return fetch(`https://mesto.nomoreparties.co/v1/cohort-24/cards/likes/${id}`,{
      method: 'DELETE',
      headers: {
          authorization: '43b98874-8a2f-4742-91c1-202875e69e98',
          'Content-Type': 'application/json'
      },
  })
      .then(result => {
        return this._checkStatus(result)
      })
  }
  like (cardId, isLiked) {
    return isLiked ? this.removeLike(cardId) : this.addLike(cardId);
  }
}
  
