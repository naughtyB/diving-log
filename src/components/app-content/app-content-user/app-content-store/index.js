import React from 'react';
import { connect } from 'react-redux';
import { Spin, Timeline, Tooltip, Icon, message } from 'antd';
import { doGetUserStore, doCancelStoreLog } from '../../../../redux/action/userStore';
import { doChangeUserLoginState } from '../../../../redux/action/user.js'
import moment from 'moment';
import './index.css';

export class AppContentStore extends React.Component{
  constructor(props){
    super(props);
    this.handleClickLog = this.handleClickLog.bind(this);
    this.handleCancelStore = this.handleCancelStore.bind(this);
  }
  componentWillMount(){
    this.props.onGetUserStore()
  }
  handleClickLog(logId){
    this.props.history.push({
      pathname: '/logDetail',
      hash: 'logId=' + logId
    })
  }
  handleCancelStore(logId){
    let data = {
      logId
    }
    this.props.onCancelStoreLog(JSON.stringify(data), () => {
      message.info('取消收藏成功');
      this.props.onGetUserStore();
    },() => {
      message.info('失败')
    },()=>{
      message.info('未登录，请先登录');
      this.props.onChangeUserLoginState(false);
      this.props.history.push({
        pathname: '/login'
      })
    });
  }
  render(){
    return (
      <Spin spinning={this.props.isGettingUserStore}>
        <h2 style={{lineHeight: '60px', marginLeft: '66px', marginBottom: '20px'}}>我的收藏</h2>
        
        <Timeline style={{padding: '0 66px 0'}} >
          <Timeline.Item>
            <Tooltip title="点击寻找潜水日志去收藏">
              <span style={{color: '#1890ff', cursor: 'pointer'}} onClick={()=>this.props.history.push({pathname: '/logWorld'})}>前往潜水日志世界收藏</span>
            </Tooltip>
          </Timeline.Item>
          {this.props.userStore.length > 0 ? this.props.userStore.sort((a,b) => {
            return Number(b.createTime) - Number(a.createTime)
          }).map((item, index) => {
            return (
              <Timeline.Item className="timeline-log" key={index}>
                <Tooltip title="点击查看详情">
                  <span onClick={()=>this.handleClickLog(item.log._id)} style={{color: '#1890ff', cursor: 'pointer'}}>{item.log.title}</span>
                </Tooltip>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{fontSize: '15px'}}>{moment(item.createTime, 'x').format('YYYY-MM-DD HH:mm:ss')}</span>
                &nbsp;&nbsp;
                <Tooltip title="取消收藏"> 
                  <Icon type="delete" style={{cursor: 'pointer'}} onClick={()=>this.handleCancelStore(item.log._id)}/>
                </Tooltip>
              </Timeline.Item>
            )
          }) : ''}
          {
            this.props.userCreateTime ? (
              <Timeline.Item color="green">
                加入了 Let's Diving 并开始收藏 &nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{fontSize: '15px'}}>{moment(this.props.userCreateTime, 'x').format('YYYY-MM-DD')}</span>
              </Timeline.Item>
            ) : ''
          }
        </Timeline>
      </Spin>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isGettingUserStore: state.userStore.isGettingUserStore,
    userStore: state.userStore.userStore,
    userCreateTime: state.userStore.userCreateTime
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeUserLoginState: (loginState) => dispatch(doChangeUserLoginState(loginState)),
    onGetUserStore: (successCallback, errorCallback, unloginCallback) => dispatch(doGetUserStore(successCallback, errorCallback, unloginCallback)),
    onCancelStoreLog: (storeData, successCallback, errorCallback, unloginCallback) => dispatch(doCancelStoreLog(storeData, successCallback, errorCallback, unloginCallback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContentStore);