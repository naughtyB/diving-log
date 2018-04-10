import React from 'react';
import { connect } from 'react-redux';
import { Steps, message } from 'antd';
import AppContentReleaseLogFirstStep from './app-content-releaseLog-firstStep/index';
import AppContentReleaseLogSecondStep from './app-content-releaseLog-secondStep/index';
import AppContentReleaseLogThirdStep from './app-content-releaseLog-thirdStep/index';
import { doChangeUserLoginState } from '../../../redux/action/user'
import { doChangeCenter, doChangeMarker, doChangeStep } from '../../../redux/action/releaseLog'
import './index.css';
import Cookies from 'js-cookie'; 
import fetch from 'isomorphic-fetch';
const Step = Steps.Step;

const steps = [{
  title: '选择潜水日志的定位',
  content: <AppContentReleaseLogFirstStep/>
}, {
  title: '填写潜水日志基本信息',
  content: <AppContentReleaseLogSecondStep/>
}, {
  title: '潜水日志详细记录',
  content: <AppContentReleaseLogThirdStep/>
}]

export class AppContentReleaseLog extends React.Component{
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
    this.props.onChangeStep(0)
  }
  render() {
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
    onChangeCenter: (center) => dispatch(doChangeCenter(center)),
    onChangeMarker: (marker) => dispatch(doChangeMarker(marker)),
    onChangeStep: (step) => dispatch(doChangeStep(step))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(AppContentReleaseLog);