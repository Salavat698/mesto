export default class UserInfo{
    constructor(data) {
      this.data = data;   
      this.userName = document.querySelector(this.data.name);
      this.userCommit = document.querySelector(this.data.commit); 
    }
  
    getUserInfo() {
      return {name: this.userName.textContent, commit: this.userCommit.textContent}
    }
  
    setUserInfo(values) {
      this.userName.textContent= values.name;
      this.userCommit.textContent = values.work;
    }
  }
  