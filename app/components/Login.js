const firebase = require('nativescript-plugin-firebase');
const dialogs = require('ui/dialogs');

module.exports = {
    data() {
      return {
        email: 'dingdong2310@gmail.com',
        password: 'eldehd@1026',
      };
    },
    template: `
      <Page class="page" loaded="pageLoaded" actionBarHidden="true">
          <FlexboxLayout class="wrapper signin">
            <StackLayout class="container form">
                <StackLayout class="input-field">
                <TextField class="input" hint="Email" keyboardType="email" autocorrect="false"  returnKeyType="next" v-model="email"></TextField>
                <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
            
                <StackLayout class="input-field">
                <TextField class="input" hint="Password" secure="true" autocorrect="false" returnKeyType="done" v-model="password"></TextField>
                <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
            
                <Button text="로그인" class="btn btn-primary" @tap="login"></Button>
            </StackLayout>
            <StackLayout @tap="account" class="m-10" style="height: 100px;">
              <Label>
                <FormattedString>
                  <Span text="회원가입하지 않으셨다면?  "></Span>
                  <Span text="회원가입"></Span>
                </FormattedString>
              </Label>
            </StackLayout>
          </FlexboxLayout>
        </page>
    `,
    methods: {
      login: function () {
        if (!this.email) {
          dialogs.alert({
            title: '로그인 오류',
            message: '이메일을 입력해 주세요.',
            okButtonText: '확인'
          });
        }

        if (!this.password) {
          dialogs.alert({
            title: '로그인 오류',
            message: '비밀번호를 입력해 주세요.',
            okButtonText: '확인'
          });
        }

        firebase.login(
          {
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
              email: this.email,
              password: this.password
            }
          })
          .then(result => { 
            var data = JSON.stringify(result); 
            console.log(data);
            this.$router.push('/home');
          })
          .catch(error => {
            dialogs.alert({
              title: '로그인 오류',
              messge: error,
              okButtonText: '확인'
            });
          });
      },
      account: function() {
        this.$router.push('/account');
      }
    }
  };