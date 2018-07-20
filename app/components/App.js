const firebase = require('nativescript-plugin-firebase');

module.exports = {
  data() {
    return {
      isLogin: false,
    };
  },
  template: `
    <Page class="page" loaded="pageLoaded" actionBarHidden="true"> 
      <StackLayout>      
        <Label class="p-20" textWrap=true text="This is a hello world application, tap the button if you dare"/>
      
        <Button class="btn btn-primary" @tap="ontap" :text="(isLogin ? '로그아웃' : '로그인')"/>
      </StackLayout>
    </Page>
  `,
  created: function () {
    firebase.getCurrentUser().then(user => {
      this.isLogin = true;
    }).catch(error => {
      this.$router.push('/login');
    })
  },
  methods: {
    ontap: () => {
      (this.isLogin ? logout() : login())
    },
    logout: () => {
      // this.surprise = !this.surprise
      console.log('logout!!');
      firebase.logout().then(() => {
        this.$router.push('/login');
      });
    },
    login: () => {
      console.log('login!!');
      this.$router.push('/login');
    }
  }
};
