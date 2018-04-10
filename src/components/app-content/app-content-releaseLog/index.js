import React from 'react';
import { connect } from 'react-redux';
import { Steps } from 'antd';
import AppContentReleaseLogFirstStep from './app-content-releaseLog-firstStep/index';
import AppContentReleaseLogSecondStep from './app-content-releaseLog-secondStep/index';
import AppContentReleaseLogThirdStep from './app-content-releaseLog-thirdStep/index';
import './index.css';
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
    step: state.releaseLog.step
  }
}



export default connect(mapStateToProps)(AppContentReleaseLog);