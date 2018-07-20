const firebase = require('nativescript-plugin-firebase');
const dialogs = require('ui/dialogs');
module.exports = {
    data() {
      return {
        email: 'dingdong2310@naver.com',
        password: 'eldehd@1026',
        confirm_password: 'eldehd@1026',
      };
    },
    template: `
        <Page class="page" loaded="pageLoaded" actionBarHidden="false">
            <ActionBar class="action-bar" title="회원가입">
            <NavigationButton android.systemIcon="ic_menu_back" text="뒤로" @tap="back"></NavigationButton>
            </ActionBar>
            <FlexboxLayout class="signin">
                <StackLayout class="form">
                    <StackLayout class="input-field">
                    <TextField class="input" hint="Email" keyboardType="email" autocorrect="false"  returnKeyType="next" v-model="email"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>
                
                    <StackLayout class="input-field">
                    <TextField class="input" hint="Password" secure="true" autocorrect="false" returnKeyType="next" v-model="password"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout class="input-field">
                    <TextField class="input" hint="Confirm Password" secure="true" autocorrect="false" returnKeyType="done" v-model="confirm_password"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>
                
                    <Button text="회원가입" class="btn btn-primary" @tap="signup"></Button>
                </StackLayout>
            </FlexboxLayout>
        </page>
    `,
    methods: {
      signup: function () {

        if (this.password != this.confirm_password) {
          dialogs.alert({
            title: "비밀번호 오류",
            message: "비밀번호가 맞지 않습니다."
          });
        }

        firebase.createUser({
          email: this.email,
          password: this.password
        }).then(
          user => {
            dialogs.alert({
              title: "계정 생성 완료",
              message: "축하 합니다. 계정이 생성되었습니다.\r\n이메일 : " + user.email,
              okButtonText: "확인"
            });
            this.$router.push('/login');
          },
          errorMessage => {
            dialogs.alert({
              title: "계정 생성 오류",
              message: errorMessage,
              okButtonText: "확인"
            })
          }
        )
      },
      back: function () {
        this.$router.go(-1)
      }
    }
  };