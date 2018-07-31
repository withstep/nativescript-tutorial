const firebase = require("nativescript-plugin-firebase");
const firebaseWebApi = require("nativescript-plugin-firebase/app");
firebaseWebApi.initializeApp({
  persist: false
});
const bookingCollection = firebaseWebApi.firestore().collection("booking");

var _thisweek = function (nowdate) {
  var currentDay = nowdate;  
  var theYear = currentDay.getFullYear();
  var theMonth = currentDay.getMonth();
  var theDate  = currentDay.getDate();
  var theDayOfWeek = currentDay.getDay();
  
  var thisWeek = new Array;
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
}

var _thismonth = function (nowdate) {
  var currentDay = nowdate;
  var theMonth = currentDay.getMonth()+1;

  theMonth = (String(theMonth).length == 1 ? '0' + theMonth : String(theMonth));

  return theMonth;
}

var _thisdate = function (nowdate) {
  var currentDay = nowdate;
  var theDate = '';
  var yyyy = currentDay.getFullYear();
  var mm = Number(currentDay.getMonth()) + 1;
  var dd = currentDay.getDate();
  mm = String(mm).length === 1 ? '0' + mm : mm.toString();
  dd = String(dd).length === 1 ? '0' + dd : dd.toString();

  theDate = yyyy + '-' + mm + '-' + dd;
  return theDate;
}

module.exports = {
  data() {
    return {
      nowdate: new Date(),
      week: [],
      month: '',
      date: '',
      hour: '',
      minute: '',
    };
  },
  template: `
  <Page class="page" loaded="pageLoaded" actionBarHidden="true"> 
    <FlexboxLayout class="wrapper">      
      <StackLayout class="container">

        <FlexboxLayout class="controller">
          <Button width="40%" class="btn btn-default" @tap="prevWeek">Prev</Button>
          <Label width="60%" id="thisMonth" class="thisMonth">{{ month }}</Label>
          <Button width="40%" class="btn btn-default" @tap="nextWeek">Next</Button>
        </FlexboxLayout>

        <GridLayout class="week" columns="*,*,*,*,*,*,*" rows="40,40">
            <Label row="0" col="0" backgroundColor="red">일</Label>
            <Label row="0" col="1" backgroundColor="orange">월</Label>
            <Label row="0" col="2" backgroundColor="yellow">화</Label>
            <Label row="0" col="3" backgroundColor="green">수</Label>
            <Label row="0" col="4" backgroundColor="skyblue">목</Label>
            <Label row="0" col="5" backgroundColor="blue">금</Label>
            <Label row="0" col="6" backgroundColor="purple">토</Label>

            <StackLayout v-for="(value, index) in week" :key="index" row="1" v-bind:col="index" @tap="onWeekTap(value.date)" class="weekday" v-bind:class="{ active : value.date === date }"><Label>{{ value.day }}</Label></StackLayout>
          </GridLayout> 

          <GridLayout class="clock" columns="*,*,*,*" rows="50,50,50,50">
            
            <StackLayout row="0" col="0" @tap="setMinute('50')" v-bind:class="{ active : minute === '50' }"><Label>50</Label></StackLayout>
            <StackLayout row="0" col="1" @tap="setMinute('55')" v-bind:class="{ active : minute === '55' }"><Label>55</Label></StackLayout>
            <StackLayout row="0" col="2" @tap="setMinute('00')" v-bind:class="{ active : minute === '00' }"><Label>0</Label></StackLayout>
            <StackLayout row="0" col="3" @tap="setMinute('05')" v-bind:class="{ active : minute === '05' }"><Label>5</Label></StackLayout>
            
            <StackLayout row="1" col="0" @tap="setMinute('45')" v-bind:class="{ active : minute === '45' }"><Label>45</Label></StackLayout>
            <StackLayout row="1" col="1" colSpan="2" rowSpan="2">
              
              <GridLayout class="hour" columns="*,*,*,*" rows="*,*,*,*">
                  <StackLayout row="0" col="0" @tap="setHour('10')" v-bind:class="{ active : hour === '10' }"><Label>10</Label></StackLayout>
                  <StackLayout row="0" col="1" @tap="setHour('11')" v-bind:class="{ active : hour === '11' }"><Label>11</Label></StackLayout>
                  <StackLayout row="0" col="2" @tap="setHour('12')" v-bind:class="{ active : hour === '12' }"><Label>12</Label></StackLayout>
                  <StackLayout row="0" col="3" @tap="setHour('01')" v-bind:class="{ active : hour === '01' }"><Label>1</Label></StackLayout>

                  <StackLayout row="1" col="0" @tap="setHour('09')" v-bind:class="{ active : hour === '09' }"><Label>9</Label></StackLayout>
                  <StackLayout row="1" col="1" colSpan="2" rowSpan="2">
                    <Button height="100%" class="btn btn-primary" @tap="onSubmit">예약확정</Button>
                  </StackLayout>
                  <StackLayout row="1" col="3" @tap="setHour('02')" v-bind:class="{ active : hour === '02' }"><Label>2</Label></StackLayout>

                  <StackLayout row="2" col="0" @tap="setHour('08')" v-bind:class="{ active : hour === '08' }"><Label>8</Label></StackLayout>
                  <StackLayout row="2" col="3" @tap="setHour('03')" v-bind:class="{ active : hour === '03' }"><Label>3</Label></StackLayout>

                  <StackLayout row="3" col="0" @tap="setHour('07')" v-bind:class="{ active : hour === '07' }"><Label>7</Label></StackLayout>
                  <StackLayout row="3" col="1" @tap="setHour('06')" v-bind:class="{ active : hour === '06' }"><Label>6</Label></StackLayout>
                  <StackLayout row="3" col="2" @tap="setHour('05')" v-bind:class="{ active : hour === '05' }"><Label>5</Label></StackLayout>
                  <StackLayout row="3" col="3" @tap="setHour('04')" v-bind:class="{ active : hour === '04' }"><Label>4</Label></StackLayout>
              </GridLayout>

            </StackLayout>
            <StackLayout row="1" col="3" @tap="setMinute('10')" v-bind:class="{ active : minute === '10' }"><Label>10</Label></StackLayout>

            <StackLayout row="2" col="0" @tap="setMinute('40')" v-bind:class="{ active : minute === '40' }"><Label>40</Label></StackLayout>
            <StackLayout row="2" col="3" @tap="setMinute('15')" v-bind:class="{ active : minute === '15' }"><Label>15</Label></StackLayout>

            <StackLayout row="3" col="0" @tap="setMinute('35')" v-bind:class="{ active : minute === '35' }"><Label>35</Label></StackLayout>
            <StackLayout row="3" col="1" @tap="setMinute('30')" v-bind:class="{ active : minute === '30' }"><Label>30</Label></StackLayout>
            <StackLayout row="3" col="2" @tap="setMinute('25')" v-bind:class="{ active : minute === '25' }"><Label>25</Label></StackLayout>
            <StackLayout row="3" col="3" @tap="setMinute('20')" v-bind:class="{ active : minute === '20' }"><Label>20</Label></StackLayout>
          </GridLayout>
        </StackLayout>
        <StackLayout height="80">
          <Button class="btn btn-primary" @tap="logout" text="로그아웃"/>
        </StackLayout>
      </FlexboxLayout>
    </Page>
  `,
  created: function () {
    // firebase.getCurrentUser()
    //   .then(function (user) { 
    //     this.user = user;
    //   })
    //   .catch(function (error) { console.log("Trouble in paradise: " + error) });
    this.week = _thisweek(this.nowdate);
    this.month = _thismonth(this.nowdate);
    this.date = _thisdate(this.nowdate);
  },
  update () {
    this.$nextTick (function () {
      firebase.init({
        onAuthStateChanged: function (data) {
          if (!data.loggedIn) {
            this.$router.push('/login');
          }
        }
      });
    });
  },
  methods: {
    logout: function () {
      firebase.logout();
      this.$router.push('/login');
    },
    prevWeek: function () {
      var d = this.nowdate;
      d.setDate( d.getDate() - 7 );

      this.week = _thisweek(d);
      this.month = _thismonth(d);
    },
    nextWeek: function () {
      var d = this.nowdate;
      d.setDate( d.getDate() + 7 );

      this.week = _thisweek(d);
      this.month = _thismonth(d);
    },
    onWeekTap: function (date) {
      this.date = date;
    },
    setHour: function (hour) {
      this.hour = hour;
    },
    setMinute: function (minute) {
      this.minute = minute;
    },
    onSubmit: function () {
      var $vm = this;
      firebase.getCurrentUser()
      .then(function (user) { 
        bookingCollection.add({
            user: user,
            date: $vm.date,
            hour: $vm.hour,
            minute: $vm.minute
        }).then(function (documentRef) {
          console.log(`ID: ${documentRef.id}`);
        });
      })
      .catch(function (error) { console.log("Trouble in paradise: " + error) });
    }
  }
};
