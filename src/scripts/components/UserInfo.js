export default class UserInfo{
    constructor(data) {
      this.data = data;   
      this.userName = document.querySelector(this.data.name);
      this.userCommit = document.querySelector(this.data.about); 
      this.userAvatar = document.querySelector(this.data.avatar);
    }
  
    getUserInfo() {
      return {
        name: this.userName.textContent, 
        about: this.userCommit.textContent,
        avatar: this.userAvatar.values}
    }
  
    setUserInfo(values) {
      if(values.name && values.about && values.avatar){
        this.userName.textContent= values.name;
        this.userCommit.textContent = values.about;
        this.userAvatar.src = values.avatar;
      }else{
        console.log(`Беда:${values}`)
      }
   
    }
    setUserAvatar(userLink) {
      this.userAvatar.src = userLink;
    };
  
  }
  