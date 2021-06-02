export default class UserInfo{
    constructor(data) {
      this.data = data;   
      this.userName = document.querySelector(this.data.name);
      this.userCommit = document.querySelector(this.data.about); 
      this.userAvatar = document.querySelector(this.data.avatar);
    }
  
    getUserInfo() {
      return {name: this.userName.textContent, about: this.userCommit.textContent}
    }
  
    setUserInfo(values) {
      this.userName.textContent= values.name;
      this.userCommit.textContent = values.about;
      this.userAvatar.src = values.avatar;
    }
    setUserAvatar(userLink) {
      this.userAvatar.src = userLink;
    };
  
  }
  