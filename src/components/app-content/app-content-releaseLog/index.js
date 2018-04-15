import React from 'react';
import { connect } from 'react-redux';
import { Steps, message } from 'antd';
import AppContentReleaseLogFirstStep from './app-content-releaseLog-firstStep/index';
import AppContentReleaseLogSecondStep from './app-content-releaseLog-secondStep/index';
import AppContentReleaseLogThirdStep from './app-content-releaseLog-thirdStep/index';
import { doChangeUserLoginState } from '../../../redux/action/user'
import { doChangeCenter, doChangeMarker, doChangeStep, doChangeBasiCFields, doChangeDetailRecord } from '../../../redux/action/releaseLog'
import { doGetLogDetail } from '../../../redux/action/logDetail'
import './index.css';
import Cookies from 'js-cookie'; 
import fetch from 'isomorphic-fetch';
import moment from 'moment';
const Step = Steps.Step;

let transformHash = (hash) => {
  let hashData={};
  hash.slice(1).split("&").forEach((item,index)=>{
      let arr=item.split("=");
      hashData[arr[0]]=decodeURIComponent(arr[1]);
  });
  return hashData;
};

export class AppContentReleaseLog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      shouldModifyContent : false
    }
    this.onChangeShouldModifyContent = this.onChangeShouldModifyContent.bind(this);
  }
  onChangeShouldModifyContent(bool){
    this.setState({
      shouldModifyContent: bool
    })
  }
  componentWillMount(){
    if(!this.props.loginState){
      fetch('/server/autoLogin', {
        method: 'post',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include'
      }).then(res => {
        return res.json()
      }).then(res => {
        if(!res.err){
          this.props.onChangeUserLoginState(true);
          Cookies.set('username', res.userData['username']);
          Cookies.set('userId',res.userData['userId']);
        }
        else{
          this.props.history.push({
            pathname: '/login'
          })
          message.info('检测到您未登录  请先登录')
        }
      })
    }
    this.props.onChangeStep(0);
    let hash = transformHash(this.props.location.hash);
    if(hash['type'] === 'add'){
      this.props.onChangeBasiCFields({
        date: {
          value: null
        },
        title: {
          value: ''
        },
        timeIn: {
          value: null
        },
        timeOut: {
          value: null
        },
        location: {
          value: ''
        },
        diveSite: {
          value: ''
        },
        start: {
          value: ''
        },
        end: {
          value: ''
        },
        visibility: {
          value: ''
        },
        nitrox: {
          value: ''
        },
        airTemperature: {
          value: ''
        },
        bottomTemperature: {
          value: ''
        },
        weight: {
          value: ''
        },
        camera: {
          value: ''
        },
        isSecret: {
          value: ''
        }
      });
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          this.props.onChangeCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          this.props.onChangeMarker({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        })
      }
    }
    else if(hash['type'] === 'modify'){
      this.props.onGetLogDetail(hash['logId'], (logDetail) => {
        let fields = {};
        for (let [key, value] of Object.entries(logDetail)) {
          if(key === 'timeIn' || key === 'timeOut'){
            fields[key] = {
              value: moment(value, 'HH:mm:ss')
            }
          }
          else if(key === 'date'){
            fields[key] = {
              value: moment(value, 'YYYY-MM-DD')
            }
          }
          else{
            fields[key] = {
              value: value
            }
          }
        }
        this.props.onChangeBasiCFields(fields);
        this.props.onChangeCenter({
          lat: Number(logDetail.marker.lat),
          lng: Number(logDetail.marker.lng)
        });
        this.props.onChangeMarker({
          lat: Number(logDetail.marker.lat),
          lng: Number(logDetail.marker.lng)
        });
        this.props.onChangeDetailRecord(logDetail.detail)
        this.setState({
          shouldModifyContent: true
        })
      }, () => {
        message.info('error')
      }, () => {
        this.props.history.push({
          pathname: '/login'
        })
        message.info('检测到您未登录  请先登录');
        this.props.onChangeUserLoginState(false);
      })
    }
  }
  componentWillUpdate(nextProps){
    let hash = transformHash(this.props.location.hash);
    if(this.props.location && transformHash(this.props.location.hash)['type'] !== 'add' && transformHash(nextProps.location.hash)['type'] === 'add'){
      this.props.onChangeStep(0);
      this.props.onChangeBasiCFields({
        date: {
          value: null
        },
        title: {
          value: ''
        },
        timeIn: {
          value: null
        },
        timeOut: {
          value: null
        },
        location: {
          value: ''
        },
        diveSite: {
          value: ''
        },
        start: {
          value: ''
        },
        end: {
          value: ''
        },
        visibility: {
          value: ''
        },
        nitrox: {
          value: ''
        },
        airTemperature: {
          value: ''
        },
        bottomTemperature: {
          value: ''
        },
        weight: {
          value: ''
        },
        camera: {
          value: ''
        },
        isSecret: {
          value: ''
        }
      });
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          this.props.onChangeCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          this.props.onChangeMarker({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        })
      }
    }
  }
  render() {
    let type = transformHash(this.props.location.hash)['type'];
    const steps = [{
      title: type === 'add' ? '选择潜水日志的定位' : '修改潜水日志的定位',
      content: <AppContentReleaseLogFirstStep history={this.props.history} location = {this.props.location}/>
    }, {
      title: type === 'add' ? '填写潜水日志基本信息' : '修改潜水日志基本信息',
      content: <AppContentReleaseLogSecondStep history={this.props.history} location = {this.props.location}/>
    }, {
      title: type === 'add' ? '填写潜水日志详细记录' : '修改潜水日志详细记录',
      content: <AppContentReleaseLogThirdStep history={this.props.history} location = {this.props.location} onChangeShouldModifyContent={this.onChangeShouldModifyContent} shouldModifyContent = {this.state.shouldModifyContent}/>
    }]
    return (
      <div className="app-content-releaseLog">
        <Steps current={this.props.step}>
          {steps.map(item => <Step key={item.title} title={item.title}/>)}
        </Steps>
        {steps[this.props.step]['content']}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    step: state.releaseLog.step,
    loginState: state.releaseLog.loginState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeUserLoginState: (loginState) => dispatch(doChangeUserLoginState(loginState)),
    onChangeBasiCFields: (fieldsChanged) => dispatch(doChangeBasiCFields(fieldsChanged)),
    onChangeCenter: (center) => dispatch(doChangeCenter(center)),
    onChangeMarker: (marker) => dispatch(doChangeMarker(marker)),
    onChangeStep: (step) => dispatch(doChangeStep(step)),
    onGetLogDetail: (logId, successCallback, errorCallback, unloginCallback) => dispatch(doGetLogDetail(logId, successCallback, errorCallback, unloginCallback)),
    onChangeDetailRecord: (detailRecord) => dispatch(doChangeDetailRecord(detailRecord))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(AppContentReleaseLog);