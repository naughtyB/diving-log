import React from 'react';
import { connect } from 'react-redux';
import { message, Spin, Timeline, Tooltip, Icon } from 'antd';
import { doGetUserLog, doDeleteUserLog } from '../../../../redux/action/userLog.js'
import { doChangeUserLoginState } from '../../../../redux/action/user.js'
import moment from 'moment';
import './index.css';

export class AppContentLog extends React.Component{
  constructor(props){
    super(props);
    this.handleClickLog = this.handleClickLog.bind(this);
    this.handleEditLog = this.handleEditLog.bind(this);
  }
  handleClickLog(logId){
    this.props.history.push({
      pathname: '/logDetail',
      hash: 'logId=' + logId
    })
  }
  handleEditLog(logId){
    this.props.history.push({
      pathname: '/releaseLog',
      hash: 'type=modify&&logId=' + logId
    })
  }
  handleDeleteLog(logId){
    this.props.onDeleteUserLog(logId,() => {
      message.info('删除成功')
      this.props.onGetUserLog(()=>{},()=>{},()=>{
        message.info('未登录，请先登录');
        this.props.onChangeUserLoginState(false);
        this.props.history.push({
          pathname: '/login'
        })
      })
    },() => {
      message.info('error')
    },() => {
      message.info('未登录，请先登录');
      this.props.onChangeUserLoginState(false);
      this.props.history.push({
        pathname: '/login'
      })
    })
  }
  componentWillMount(){
    this.props.onGetUserLog(()=>{},()=>{},()=>{
      message.info('未登录，请先登录');
      this.props.onChangeUserLoginState(false);
      this.props.history.push({
        pathname: '/login'
      })
    })
  }
  render(){
    return (
      <Spin spinning={this.props.isGettingUserLog}>
        <h2 style={{lineHeight: '60px', marginLeft: '66px', marginBottom: '20px'}}>日志历程</h2>
        <Timeline style={{padding: '0 66px 0'}} >
          {this.props.userLog.length > 0 ? this.props.userLog.sort((a,b) => {
            return Number(moment(b.date, 'YYYY-MM-DD').format('x')) - Number(moment(a.date, 'YYYY-MM-DD').format('x'))
          }).map((item, index) => {
            return (
              <Timeline.Item className="timeline-log" key={index}>
                <Tooltip title="点击查看详情">
                  <span onClick={()=>this.handleClickLog(item._id)} style={{color: '#1890ff', cursor: 'pointer'}}>{item.title}</span>
                </Tooltip>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{fontSize: '15px'}}>{item.date}</span>
                &nbsp;&nbsp;
                <Icon type="edit" style={{cursor: 'pointer'}} onClick={()=>this.handleEditLog(item._id)}/>
                &nbsp;&nbsp;
                <Icon type="delete" style={{cursor: 'pointer'}} onClick={() => this.handleDeleteLog(item._id)}/>
              </Timeline.Item>
            )
          }) : ''}
          {
            this.props.userLog.length > 0 ? (
              <Timeline.Item color="green">
                {moment(this.props.userLog[0]['user'].createTime, 'x').format('YYYY-MM-DD')}加入了 Let's Diving
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
    isGettingUserLog: state.userLog.isGettingUserLog,
    userLog: state.userLog.userLog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserLog: (successCallback, errorCallback, unloginCallback) => dispatch(doGetUserLog(successCallback, errorCallback, unloginCallback)),
    onChangeUserLoginState: (loginState) => dispatch(doChangeUserLoginState(loginState)),
    onDeleteUserLog: (logId, successCallback, errorCallback, unloginCallback) => dispatch(doDeleteUserLog(logId, successCallback, errorCallback, unloginCallback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContentLog);