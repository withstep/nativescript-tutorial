const firebase = require('nativescript-plugin-firebase');

module.exports = {
  data() {
    return {
      isLogining: false,
      nowdate: new Date(),
    };
  },
  template: `
  <Page class="page" loaded="pageLoaded" actionBarHidden="true"> 
    <FlexboxLayout class="wrapper">      
      <StackLayout class="container">

        <FlexboxLayout class="controller">
          <Button width="40%" class="btn btn-default">Prev</Button>
          <Label width="60%" id="thisMonth" class="thisMonth">{{ thismonth }}</Label>
          <Button width="40%" class="btn btn-default">Next</Button>
        </FlexboxLayout>

        <GridLayout class="week" columns="*,*,*,*,*,*,*" rows="40,40">
            <Label row="0" col="0" backgroundColor="red">일</Label>
            <Label row="0" col="1" backgroundColor="orange">월</Label>
            <Label row="0" col="2" backgroundColor="yellow">화</Label>
            <Label row="0" col="3" backgroundColor="green">수</Label>
            <Label row="0" col="4" backgroundColor="skyblue">목</Label>
            <Label row="0" col="5" backgroundColor="blue">금</Label>
            <Label row="0" col="6" backgroundColor="purple">토</Label>

            <StackLayout v-for="(value, index) in thisweek" :key="index" row="1" v-bind:col="index" @tap="onWeekTap(value.date)"><Label>{{ value.day }}</Label></StackLayout>
          </GridLayout> 

          <GridLayout class="clock" columns="*,*,*,*" rows="80,80,80,80">
            
            <StackLayout row="0" col="0"><Label>50</Label></StackLayout>
            <StackLayout row="0" col="1"><Label>55</Label></StackLayout>
            <StackLayout row="0" col="2"><Label>0</Label></StackLayout>
            <StackLayout row="0" col="3"><Label>5</Label></StackLayout>
            
            <StackLayout row="1" col="0"><Label>45</Label></StackLayout>
            <StackLayout row="1" col="1" colSpan="2" rowSpan="2">
              
              <GridLayout class="hour" columns="*,*,*,*" rows="*,*,*,*">
                  <StackLayout row="0" col="0"><Label>10</Label></StackLayout>
                  <StackLayout row="0" col="1"><Label>11</Label></StackLayout>
                  <StackLayout row="0" col="2"><Label>12</Label></StackLayout>
                  <StackLayout row="0" col="3"><Label>1</Label></StackLayout>

                  <StackLayout row="1" col="0"><Label>9</Label></StackLayout>
                  <StackLayout row="1" col="1" colSpan="2" rowSpan="2">
                    <Button height="100%">예약</Button>
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
        </StackLayout>
        <StackLayout height="80">
          <Button class="btn btn-primary" @tap="logout" text="로그아웃"/>
        </StackLayout>
      </FlexboxLayout>
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
  computed: {
    thisweek: () => {
      var currentDay = new Date();  
      var theYear = currentDay.getFullYear();
      var theMonth = currentDay.getMonth();
      var theDate  = currentDay.getDate();
      var theDayOfWeek = currentDay.getDay();
      
      var thisWeek = [];
      for(var i=0; i<7; i++) {
        var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
        var yyyy = resultDay.getFullYear();
        var mm = Number(resultDay.getMonth()) + 1;
        var dd = resultDay.getDate();
      
        mm = String(mm).length === 1 ? '0' + mm : mm.toString();
        dd = String(dd).length === 1 ? '0' + dd : dd.toString();
      
        thisWeek[i] = {
          date: yyyy + '-' + mm + '-' + dd,
          day: dd
        };
      }

      return thisWeek;
    },
    thismonth: () => {
      var currentDay = new Date();
      var mm = currentDay.getMonth()+1;
      var theMonth = (String(mm).length == 1 ? '0' + mm : mm.toString());

      return theMonth;
    }
  },
  methods: {
    onWeekTap: date => {
      console.log(date);
    },
    logout: () => {
      if ( this.isLogining ) {
        firebase.logout();
        this.$router.push('/login');
      }
    }
  }
};
