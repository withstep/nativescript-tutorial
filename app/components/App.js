const dialogs = require('ui/dialogs');
const firebase = require("nativescript-plugin-firebase");
const firebaseWebApi = require("nativescript-plugin-firebase/app");
firebaseWebApi.initializeApp({
  persist: false
});
const bookingCollection = firebaseWebApi.firestore().collection("booking");

const LoadingIndicator = require("nativescript-loading-indicator-new").LoadingIndicator;

const loader = new LoadingIndicator();

// optional options
// android and ios have some platform specific options
var options = {
  message: 'Loading...',
  progress: 0.65,
  android: {
    indeterminate: true,
    cancelable: false,
    max: 100,
    progressNumberFormat: "%1d/%2d",
    progressPercentFormat: 0.53,
    progressStyle: 1,
    secondaryProgress: 1
  },
  ios: {
    details: "Additional detail note!",
    square: false,
    margin: 10,
    dimBackground: true,
    color: "#4B9ED6",
  }
};


var _thisdate = function (nowdate) {
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
  
  yyyy = theYear;

  mm = theMonth + 1;
  mm = String(mm).length === 1 ? '0' + mm : mm.toString()

  dd = theDate;
  dd = String(dd).length === 1 ? '0' + dd : dd.toString()

  return {
      thisweek: thisWeek,
      thisyear: yyyy,
      thismonth: mm,
      thisdate: yyyy + '-' + mm + '-' + dd
  }
}

module.exports = {
  data() {
    return {
      nowdate: new Date(),
      week: [],
      year: '',
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
          <StackLayout width="60%">
            <Label id="thisYear">{{ year }}</Label>
            <Label id="thisMonth">{{ month }}</Label>
          </StackLayout>
          <Button width="40%" class="btn btn-default" @tap="nextWeek">Next</Button>
        </FlexboxLayout>

        <GridLayout class="week" columns="*,*,*,*,*,*,*" rows="40,40">
            <Label row="0" col="0" backgroundColor="#ed1c24">일</Label>
            <Label row="0" col="1" backgroundColor="#f36f21">월</Label>
            <Label row="0" col="2" backgroundColor="#ffcb08">화</Label>
            <Label row="0" col="3" backgroundColor="#8dc63f">수</Label>
            <Label row="0" col="4" backgroundColor="#00aeef">목</Label>
            <Label row="0" col="5" backgroundColor="#283891">금</Label>
            <Label row="0" col="6" backgroundColor="#662d91">토</Label>

            <StackLayout v-for="(value, index) in week" :key="index" row="1" v-bind:col="index" @tap="onWeekTap(value.date)" class="weekday" v-bind:class="{ active : value.date === date }"><Label>{{ value.day }}</Label></StackLayout>
          </GridLayout> 

          <GridLayout class="clock" columns="*,*,*,*" rows="60,60,60,60">
            
            <StackLayout row="0" col="0" @tap="setMinute('50')" v-bind:class="{ active : minute === '50' }" verticalAlignment="center"><Label>50</Label></StackLayout>
            <StackLayout row="0" col="1" @tap="setMinute('55')" v-bind:class="{ active : minute === '55' }" verticalAlignment="center"><Label>55</Label></StackLayout>
            <StackLayout row="0" col="2" @tap="setMinute('00')" v-bind:class="{ active : minute === '00' }" verticalAlignment="center"><Label>0</Label></StackLayout>
            <StackLayout row="0" col="3" @tap="setMinute('05')" v-bind:class="{ active : minute === '05' }" verticalAlignment="center"><Label>5</Label></StackLayout>
            
            <StackLayout row="1" col="0" @tap="setMinute('45')" v-bind:class="{ active : minute === '45' }" verticalAlignment="center"><Label>45</Label></StackLayout>
            <StackLayout class="hour" row="1" col="1" colSpan="2" rowSpan="2">
              
              <GridLayout columns="*,*,*,*" rows="*,*,*,*">

                  <StackLayout row="0" col="0" @tap="setHour('10')" v-bind:class="{ active : hour === '10' }" verticalAlignment="center"><Label>10</Label></StackLayout>
                  <StackLayout row="0" col="1" @tap="setHour('11')" v-bind:class="{ active : hour === '11' }" verticalAlignment="center"><Label>11</Label></StackLayout>
                  <StackLayout row="0" col="2" @tap="setHour('12')" v-bind:class="{ active : hour === '12' }" verticalAlignment="center"><Label>12</Label></StackLayout>
                  <StackLayout row="0" col="3" @tap="setHour('01')" v-bind:class="{ active : hour === '01' }" verticalAlignment="center"><Label>1</Label></StackLayout>

                  <StackLayout row="1" col="0" @tap="setHour('09')" v-bind:class="{ active : hour === '09' }" verticalAlignment="center"><Label>9</Label></StackLayout>
                  <StackLayout row="1" col="1" colSpan="2" rowSpan="2" verticalAlignment="center">
                    <Button height="100%" class="btn btn-primary" @tap="onSubmit">예약신청</Button>
                  </StackLayout>
                  <StackLayout row="1" col="3" @tap="setHour('02')" v-bind:class="{ active : hour === '02' }" verticalAlignment="center"><Label>2</Label></StackLayout>

                  <StackLayout row="2" col="0" @tap="setHour('08')" v-bind:class="{ active : hour === '08' }" verticalAlignment="center"><Label>8</Label></StackLayout>
                  <StackLayout row="2" col="3" @tap="setHour('03')" v-bind:class="{ active : hour === '03' }" verticalAlignment="center"><Label>3</Label></StackLayout>

                  <StackLayout row="3" col="0" @tap="setHour('07')" v-bind:class="{ active : hour === '07' }" verticalAlignment="center"><Label>7</Label></StackLayout>
                  <StackLayout row="3" col="1" @tap="setHour('06')" v-bind:class="{ active : hour === '06' }" verticalAlignment="center"><Label>6</Label></StackLayout>
                  <StackLayout row="3" col="2" @tap="setHour('05')" v-bind:class="{ active : hour === '05' }" verticalAlignment="center"><Label>5</Label></StackLayout>
                  <StackLayout row="3" col="3" @tap="setHour('04')" v-bind:class="{ active : hour === '04' }" verticalAlignment="center"><Label>4</Label></StackLayout>

              </GridLayout>

            </StackLayout>
            <StackLayout row="1" col="3" @tap="setMinute('10')" v-bind:class="{ active : minute === '10' }" verticalAlignment="center"><Label>10</Label></StackLayout>

            <StackLayout row="2" col="0" @tap="setMinute('40')" v-bind:class="{ active : minute === '40' }" verticalAlignment="center"><Label>40</Label></StackLayout>
            <StackLayout row="2" col="3" @tap="setMinute('15')" v-bind:class="{ active : minute === '15' }" verticalAlignment="center"><Label>15</Label></StackLayout>

            <StackLayout row="3" col="0" @tap="setMinute('35')" v-bind:class="{ active : minute === '35' }" verticalAlignment="center"><Label>35</Label></StackLayout>
            <StackLayout row="3" col="1" @tap="setMinute('30')" v-bind:class="{ active : minute === '30' }" verticalAlignment="center"><Label>30</Label></StackLayout>
            <StackLayout row="3" col="2" @tap="setMinute('25')" v-bind:class="{ active : minute === '25' }" verticalAlignment="center"><Label>25</Label></StackLayout>
            <StackLayout row="3" col="3" @tap="setMinute('20')" v-bind:class="{ active : minute === '20' }" verticalAlignment="center"><Label>20</Label></StackLayout>
          </GridLayout>
        </StackLayout>
        <StackLayout height="80">
          <Button class="btn btn-primary" @tap="logout" text="로그아웃"/>
        </StackLayout>
      </FlexboxLayout>
    </Page>
  `,
  created: function () {
    var date = _thisdate(this.nowdate);
    this.week = date.thisweek;
    this.year = date.thisyear;
    this.month = date.thismonth;
    this.date = date.thisdate;
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
      var date = _thisdate(d);

      this.week = date.thisweek;
      this.year = date.thisyear;
      this.month = date.thismonth;
    },
    nextWeek: function () {
      var d = this.nowdate;
      d.setDate( d.getDate() + 7 );
      var date = _thisdate(d);

      this.week = date.thisweek;
      this.year = date.thisyear;
      this.month = date.thismonth;
    },
    onWeekTap: function (date) {
      var d = new Date(date);
      var theYear = d.getFullYear();
      var theMonth = d.getMonth() + 1;
      mm = (String(theMonth).length == 1 ? '0' + theMonth : theMonth);
      this.date = date;
      this.year = theYear;
      this.month = mm;
    },
    setHour: function (hour) {
      this.hour = hour;
    },
    setMinute: function (minute) {
      this.minute = minute;
    },
    onSubmit: function () {
      var $vm = this;
      var query = bookingCollection
                    .where('date', '==', $vm.date)
                    .where('hour', '==', $vm.hour)
                    .where('minute', '==', $vm.minute);
  
      var date = new Date($vm.date);
      var yyyy = date.getFullYear();
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      var hour = $vm.hour;
      var minute = $vm.minute;

      if ( ! hour ) {
        dialogs.alert({
          title: '예약 등록 오류',
          message: '시간이 선택되지 않았습니다.',
          okButtonText: '확인'
        }); 
        return false;
      }

      if ( ! minute ) {
        dialogs.alert({
          title: '예약 등록 오류',
          message: '분이 선택되지 않았습니다.',
          okButtonText: '확인'
        }); 
        return false;
      }

      loader.show(options); // options is optional

      query.get()
           .then(function (querySnapshot) {
             if (querySnapshot.docSnapshots.length > 5) {
                
                loader.hide();
                
                dialogs.alert({
                  title: '예약 등록 오류',
                  message: '같은 시간에 예약이 5건을 넘길 수 없습니다.',
                  okButtonText: '확인'
                });

             } else {
                firebase.getCurrentUser()
                .then(function (user) { 
                  bookingCollection.add({
                    user: user,
                    date: $vm.date,
                    hour: $vm.hour,
                    minute: $vm.minute
                  }).then(function (documentRef) {

                    loader.hide();

                    dialogs.alert({
                      title: '예약 등록 확인',
                      message: yyyy + '년 ' + mm + '월 ' + dd + '일 ' + hour + '시 ' + minute + '분에 예약이 되었습니다.',
                      okButtonText: '확인'
                    });                    
                  }).catch(function (error) {
                    $vm.$router.push('/login');
                  });
                })
                .catch(function (error) { 
                  loader.hide();
                  
                  dialogs.alert({
                    title: '예약 등록 오류',
                    message: error,
                    okButtonText: '확인'
                  });
                });
             }
           });
      
    }
  }
};
