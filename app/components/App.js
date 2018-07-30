const firebase = require('nativescript-plugin-firebase');

module.exports = {
  data() {
    return {
      isLogining: false,
    };
  },
  template: `
  <Page class="page" loaded="pageLoaded" actionBarHidden="true"> 
    <StackLayout>      

      <FlexboxLayout class="controller">
        <Button width="40%" class="btn btn-default">Prev</Button>
        <Label width="60%" id="nowMonth" class="nowMonth">11</Label>
        <Button width="40%" class="btn btn-default">Next</Button>
      </FlexboxLayout>

      <GridLayout class="week" columns="*,*,*,*,*,*,*" rows="30,30">
          <Label row="0" col="0" backgroundColor="red">일</Label>
          <Label row="0" col="1" backgroundColor="orange">월</Label>
          <Label row="0" col="2" backgroundColor="yellow">화</Label>
          <Label row="0" col="3" backgroundColor="green">수</Label>
          <Label row="0" col="4" backgroundColor="skyblue">목</Label>
          <Label row="0" col="5" backgroundColor="blue">금</Label>
          <Label row="0" col="6" backgroundColor="purple">토</Label>

          <StackLayout row="1" col="0"><Label>1</Label></StackLayout>
          <StackLayout row="1" col="1"><Label>2</Label></StackLayout>
          <StackLayout row="1" col="2"><Label>3</Label></StackLayout>
          <StackLayout row="1" col="3"><Label>4</Label></StackLayout>
          <StackLayout row="1" col="4"><Label>5</Label></StackLayout>
          <StackLayout row="1" col="5"><Label>6</Label></StackLayout>
          <StackLayout row="1" col="6"><Label>7</Label></StackLayout>
        </GridLayout> 

        <GridLayout class="clock" columns="*,*,*,*" rows="50,50,50,50">
          
          <StackLayout row="0" col="0"><Label>50</Label></StackLayout>
          <StackLayout row="0" col="1"><Label>55</Label></StackLayout>
          <StackLayout row="0" col="2"><Label>0</Label></StackLayout>
          <StackLayout row="0" col="3"><Label>5</Label></StackLayout>
          
          <StackLayout row="1" col="0"><Label>45</Label></StackLayout>
          <StackLayout row="1" col="1" colSpan="2" rowSpan="2">
            <GridLayout columns="*,*,*,*" rows="25,25,25,25">
                <StackLayout row="0" col="0"><Label>10</Label></StackLayout>
                <StackLayout row="0" col="1"><Label>11</Label></StackLayout>
                <StackLayout row="0" col="2"><Label>12</Label></StackLayout>
                <StackLayout row="0" col="3"><Label>1</Label></StackLayout>

                <StackLayout row="1" col="0"><Label>9</Label></StackLayout>
                <StackLayout row="1" col="1" colSpan="2" rowSpan="2">
                  <Button>예약</Button>
                </StackLayout>
                <StackLayout row="1" col="3"><Label>2</Label></StackLayout>

                <StackLayout row="2" col="0"><Label>8</Label></StackLayout>
                <StackLayout row="2" col="3"><Label>3</Label></StackLayout>

                <StackLayout row="3" col="0"><Label>7</Label></StackLayout>
                <StackLayout row="3" col="1"><Label>6</Label></StackLayout>
                <StackLayout row="3" col="2"><Label>5</Label></StackLayout>
                <StackLayout row="3" col="3"><Label>4</Label></StackLayout>
            </GridLayout>
          </StackLayout>
          <StackLayout row="1" col="3"><Label>10</Label></StackLayout>

          <StackLayout row="2" col="0"><Label>40</Label></StackLayout>
          <StackLayout row="2" col="3"><Label>15</Label></StackLayout>

          <StackLayout row="3" col="0"><Label>35</Label></StackLayout>
          <StackLayout row="3" col="1"><Label>30</Label></StackLayout>
          <StackLayout row="3" col="2"><Label>25</Label></StackLayout>
          <StackLayout row="3" col="3"><Label>20</Label></StackLayout>
        </GridLayout>

        <Button class="btn btn-primary" @tap="logout" text="로그아웃"/>
      </StackLayout>
    </Page>
  `,
  created: function () {
    firebase.getCurrentUser().then(user => {
      if (user.uid) {
        this.isLogining = true;
      }
    }).catch(error => {
      this.$router.push('/login');
    });
  },
  methods: {
    logout: function () {
      if ( this.isLogining ) {
        firebase.logout();
        this.$router.push('/login');
      }
    }
  }
};
