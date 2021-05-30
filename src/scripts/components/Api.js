export {Api}
class Api {
    constructor({address,token}) {
      this.address = address;
      this.token = token;
    }
    user(){
      return fetch(`${this.address}/users/me`, {
        method:'GET',
          headers: {
            authorization: this.token
          }
        })
        .then(result => {
          if (result.ok) {
              return result.json()
          } else {
              return Promise.reject(`Ошибка: ${result.status}`)
          }
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
                if (result.ok) {
                    return result.json()
                } else {
                    return Promise.reject(`Ошибка: ${result.status}`)
                }
            });
  }


    cards(){
      return fetch(`${this.address}/cards`, {
        method:'GET',
          headers: {
            authorization: this.token
          }
        })
        .then(result => {
          if (result.ok) {
              return result.json()
          } else {
              return Promise.reject(`Ошибка: ${result.status}`)
          }
          
      })
      .then(
        data =>
          data.map(e => {
            e.isMine = e.owner._id === "a335225deae10b0eeb469615";
            return e;
          })
      )
    }

    postCards({ name,link}){
      return fetch(`${this.address}/cards`, {
        method:'POST',
          headers: {
            authorization: this.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name,link})
        })
        .then(result => {
          if (result.ok) {
              return result.json()
          } else {
              return Promise.reject(`Ошибка: ${result.status}`)
          }
      })
    }

    deleteCards(id) {
      return fetch(`${this.address}/cards/${id}`, {
          method: 'DELETE',
          headers: {
              authorization: this._token,
          },
      })
          .then(result => {
              if (result.ok) {
                  return result.json()
              } else {
                  return Promise.reject(`Ошибка: ${result.status}`)
              }
          })
  }
    


  }