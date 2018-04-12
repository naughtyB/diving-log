import React from 'react';
import { Avatar, Icon, Affix, Card, Spin, Tag, message } from 'antd'; 
import { doGetLogDetail, doPraiseComment, doDeleteComment, doPraiseLog, doStoreLog, doCancelStoreLog } from '../../../redux/action/logDetail'
import { doChangeVisible } from '../../../redux/action/reply'
import { doChangeUserLoginState } from '../../../redux/action/user';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import moment from 'moment';
import './index.css';

let transformHash = (hash) => {
  let hashData={};
  hash.slice(1).split("&").forEach((item,index)=>{
      let arr=item.split("=");
      hashData[arr[0]]=decodeURIComponent(arr[1]);
  });
  return hashData;
};

let transformTime = (time) => {
  return time.getFullYear() + "/" + (time.getMonth() + 1) + "/" + time.getDate() + " " + (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) + ":" + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()) + ":" + (time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds());
}

export class AppContentLogDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      praise: [],
      delete: [],
      isLogPraised: false,
      isLogStored: false
    }
    this.handlePraiseComment = this.handlePraiseComment.bind(this);
    this.handleReply = this.handleReply.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.handlePraiseLog = this.handlePraiseLog.bind(this);
    this.handleStoreLog = this.handleStoreLog.bind(this);
    this.handleCancelStore = this.handleCancelStore.bind(this);
  }
  componentWillMount(){
    let hash = transformHash(this.props.location.hash);
    this.props.onGetLogDetail(hash['logId'], () => {
      this.setState({
        praise: [],
        delete: [],
        isLogPraised: false,
        isLogStored: false
      })
    })
  }
  handleCancelStore(logId){
    let data = {
      logId
    }
    this.props.onCancelStoreLog(JSON.stringify(data),()=>{
      this.setState((preState) => {
        return {
          isLogStored: false
        }
      })
      message.info("取消收藏成功")
    },()=>{
      message.info('收藏失败')
    },()=>{
      message.info('未登录，请先登录');
      this.props.onChangeVisible(false);
      this.props.onChangeUserLoginState(false);
      this.props.history.push({
        pathname: '/login'
      })
    })
  }
  handleStoreLog(logId){
    let data = {
      logId
    }
    this.props.onStoreLog(JSON.stringify(data),()=>{
      this.setState((preState) => {
        return {
          isLogStored: true
        }
      })
      message.info('收藏成功')
    },()=>{
      message.info('收藏失败')
    },()=>{
      message.info('未登录，请先登录');
      this.props.onChangeVisible(false);
      this.props.onChangeUserLoginState(false);
      this.props.history.push({
        pathname: '/login'
      })
    })
  }
  handleDeleteComment(commentId, index){
    this.props.onDeleteComment(JSON.stringify({
      commentId
    }),() => {
      this.setState((preState) => {
        return {
          delete: [...preState.delete, index]
        }
      })
      message.info('删除成功')
    },()=>{
      message.info('删除失败')
    },()=>{
      message.info('未登录，请先登录');
      this.props.onChangeVisible(false);
      this.props.onChangeUserLoginState(false);
      this.props.history.push({
        pathname: '/login'
      })
    })
  }
  handlePraiseLog(logId){
    let data = {
      logId
    }
    this.props.onPraiseLog(JSON.stringify(data),()=>{
      this.setState((preState) => {
        return {
          isLogPraised: true
        }
      })
    },()=>{
      message.info('点赞失败')
    },()=>{
      message.info('未登录，请先登录');
      this.props.onChangeVisible(false);
      this.props.onChangeUserLoginState(false);
      this.props.history.push({
        pathname: '/login'
      })
    })
  }
  handlePraiseComment(commentId, index){
    let data = {
      commentId
    }
    this.props.onPraiseComment(JSON.stringify(data),()=>{
      this.setState((preState) => {
        return {
          praise: [...preState.praise, index]
        }
      })
    },()=>{
      message.info('点赞失败')
    },()=>{
      message.info('未登录，请先登录');
      this.props.onChangeVisible(false);
      this.props.onChangeUserLoginState(false);
      this.props.history.push({
        pathname: '/login'
      })
    })
  }
  handleReply(userReplyedData, logId){
    this.props.onChangeVisible(true, userReplyedData, logId, () => {
      let hash = transformHash(this.props.location.hash);
      this.props.onGetLogDetail(hash['logId'])
    }, () => {
      message.info("错误")
    }, () => {
      this.props.onChangeUserLoginState(false);
      message.info('未登录，请先登录');
      this.props.history.push({
        pathname: '/login'
      })
    });
  }
  render(){
    const { isGettingDetail, data } = this.props;
    let userId = Cookies.get("userId")
    if(data && data.date && !isGettingDetail){
      let time = new Date();
      time.setTime(data.createTime)
      return (
        <div className="app-content-logDetail" style={{width: '1110px', margin: '0 auto'}}>
          <div style={{width: '757px'}}>
            <Affix offsetTop={180} style={{ position: 'absolute', left: '1100px', top: '180px', zIndex: 1001}}>
              <Card title="潜水日志基本信息" style={{ width: 300 }}>
                <p>日期：{data.date}</p>
                <p>潜水时间：{data.timeIn + " "}-{" " + data.timeOut}</p>
                <p>地点：{data.location}</p>
                <p>潜点：{data.diveSite}</p>
                <p>气量：{"(开始)"+data.start}bar - {data.end}bar{"(结束)"}</p>
                <p>能见度：{data.visibility}米</p>
                <p>高痒：{data.nitrox}%</p>
                <p>空气温度：{data.airTemperature}℃</p>
                <p>水下温度：{data.bottomTemperature}℃</p>
                <p>配重: {data.weight}kg</p>
                <p>相机：{data.camera}</p>
              </Card>
            </Affix>
            <h2 style={{fontSize: '25px', fontWeight: '700', lineHeight: '100px', borderBottom: '1px solid #CCC'}}>{data.title}</h2>
            <div style={{display: 'flex', marTop: '16px', marginBottom: '16px', borderBottom: '1px solid #CCC'}}>
              <div style={{width: '45px'}}>
                <Avatar size="large"  src={data.user.imgUrl || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />
              </div>
              <div style={{flex: '1 1', padding: '0 11px 0'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span>
                    <span style={{color: 'rgb(34,34,34)', fontSize: '13px', fontWeight: '700'}}>{data.user.name}<Tag style={{marginLeft: '5px'}} color="#108ee9">楼主</Tag><Tag style={{marginLeft: '5px'}} color="#108ee9">潜水日志详细介绍</Tag></span>
                  </span>
                  <span style={{display: 'flex', alignItems: 'center', marginLeft: '20px'}}>
                    {transformTime(time)}
                  </span>
                </div>
                <div className="app-content-logDetail-comment-content" dangerouslySetInnerHTML={{__html: data.detail}} style={{marginTop: '25px', color: 'rgb(34,34,34)', fontSize: '14px', lineHeight: '19px'}}></div>
                <div style={{margin: '34px 0 25px', height:'34px', display: 'flex', flexDirection: 'row-reverse'}}>
                  <div className="reply" onClick={() => this.handleReply(data.user, data._id)} style={{height: '34px', padding: '8px 10px', cursor: 'pointer', fontSize: '16px', opacity:'0.7', color:'rgb(78, 78, 78)', lineHeight: '15px', fontSize: '18px'}}>
                    <Icon type="reply" style={{marginRight: '5px'}}/>回复
                  </div>
                  <div className={((data.store && data.store.includes(userId)) || this.state.isLogStored ) ? 'isStored' : 'isNotStored' } style={{height: '34px', padding: '8px 10px', cursor: 'pointer'}}>
                    <Icon type="star" style={{fontSize: '19px'}}  onClick={()=>{
                        if((data.store && data.store.includes(userId)) || this.state.isLogStored){
                          this.handleCancelStore(data._id);
                        }
                        else{
                          this.handleStoreLog(data._id)
                        }
                      }}/>
                  </div>
                  <div className={((data.praise && data.praise.includes(userId)) || this.state.isLogPraised ) ? 'isPraised' : 'isNotPraised' } style={{height: '34px', padding: '8px 10px', cursor: 'pointer'}}>
                    <Icon type="heart" style={{fontSize: '16px'}} onClick={()=>{
                        if((data.praise && data.praise.includes(userId)) || this.state.isLogPraised){
                          message.info('您已经点过赞了')
                        }
                        else{
                          this.handlePraiseLog(data._id)
                        }
                      }
                    }/>
                  </div>
                  <div style={{lineHeight: '31px', fontSize: '17px'}}>{(data.praise ? data.praise.length : 0) + (this.state.isLogPraised ? 1 : 0)} 赞</div>
                </div>
              </div>
            </div>
            {
              (data.comment && data.comment.length > 0) ? data.comment.map((item, index) => {
                let time = new Date();
                time.setTime(item.createTime);
                return (
                  <div key={index} style={{display: this.state.delete.includes(index) ? 'none' : 'flex', marTop: '16px', marginBottom: '16px', borderBottom: '1px solid #CCC'}}>
                    <div style={{width: '45px'}}>
                      <Avatar  size="large"  src={item.user.imgUrl || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} icon="user" />
                    </div>
                    <div style={{flex: '1 1', padding: '0 11px 0'}}>
                      <div style={{display: 'flex'}}>
                        <span style={{color: 'rgb(34,34,34)', fontSize: '13px', fontWeight: '700'}}>
                          {item.user.name}<Tag style={{marginLeft: '5px', display: data.user._id === item.user._id ? 'inline-block' : 'none'}} color="#108ee9">楼主</Tag>
                        </span>
                        <span style={{display: 'flex', alignItems: 'center', flex: '1 1', flexDirection: 'row-reverse'}}>
                          <span style={{color: '#08c', marginLeft: '5px'}}>{item.userReplyed.name || ''}</span><Avatar src={item.userReplyed.imgUrl || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} style={{marginLeft: '5px'}} size="small"/><Icon type="replyToOther"/>
                        </span>
                        <span style={{display: 'flex', alignItems: 'center', marginLeft: '20px'}}>
                          {transformTime(time)}
                        </span>
                      </div>
                      <div className="app-content-logDetail-comment-content" dangerouslySetInnerHTML={{__html: item.content}} style={{marginTop: '25px', color: 'rgb(34,34,34)', fontSize: '14px', lineHeight: '19px'}}></div>
                      <div style={{margin: '34px 0 25px', height:'34px', display: 'flex', flexDirection: 'row-reverse'}}>
                        <div className="reply" onClick={() => this.handleReply(item.user, item.log)} style={{height: '34px', padding: '8px 10px', cursor: 'pointer', fontSize: '16px', opacity:'0.7', color:'rgb(78, 78, 78)', lineHeight: '15px', fontSize: '18px'}}>
                          <Icon type="reply" style={{marginRight: '5px'}}/>回复
                        </div>
                        <div className="delete" onClick={() => this.handleDeleteComment(item._id, index)} style={{display:item.user._id === userId ? 'block' : 'none' ,height: '34px', padding: '8px 10px', cursor: 'pointer', fontSize: '18px', lineHeight: '20px'}}>
                          <Icon type="delete"/>
                        </div>
                        <div onClick={()=>{
                            if((item.praise && item.praise.includes(userId)) || this.state.praise.includes(index)){
                              message.info('您已经点过赞了')
                            }
                            else{
                              this.handlePraiseComment(item._id, index)
                            }
                          }} className={((item.praise && item.praise.includes(userId)) || this.state.praise.includes(index)) ? "isPraised" : "isNotPraised"} style={{height: '34px', padding: '8px 10px', cursor: 'pointer'}}>
                          <Icon type="heart" style={{fontSize: '16px'}}/>
                        </div>
                        <div style={{lineHeight: '31px', fontSize: '17px'}}>{(item.praise ? item.praise.length : 0) + (this.state.praise.includes(index)? 1 : 0)} 赞</div>
                      </div>
                    </div>
                  </div>
                )
              }) : ''
            }
          </div>
        </div>
      )
    }
    else{
      return (
        <Spin spinning={isGettingDetail}>
          <div style={{height: '300px', width: '100%'}}></div>
        </Spin>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.logDetail.data,
    isGettingDetail: state.logDetail.isGettingDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetLogDetail: (logId, successCallback, errorCallback) => dispatch(doGetLogDetail(logId, successCallback, errorCallback)),
    onChangeVisible: (visible, userReplyedData, logId, successCallback, errorCallback, unloginCallback) => dispatch(doChangeVisible(visible, userReplyedData, logId, successCallback, errorCallback, unloginCallback)),
    onChangeUserLoginState: (loginState) => dispatch(doChangeUserLoginState(loginState)),
    onPraiseComment: (praiseData, successCallback, errorCallback, unloginCallback)=>dispatch(doPraiseComment(praiseData, successCallback, errorCallback, unloginCallback)),
    onDeleteComment: (deleteData, successCallback, errorCallback, unloginCallback)=>dispatch(doDeleteComment(deleteData, successCallback, errorCallback, unloginCallback)),
    onPraiseLog: (praiseData, successCallback, errorCallback, unloginCallback)=>dispatch(doPraiseLog(praiseData, successCallback, errorCallback, unloginCallback)),
    onStoreLog: (storeData, successCallback, errorCallback, unloginCallback) => dispatch(doStoreLog(storeData, successCallback, errorCallback, unloginCallback)),
    onCancelStoreLog: (storeData, successCallback, errorCallback, unloginCallback) => dispatch(doCancelStoreLog(storeData, successCallback, errorCallback, unloginCallback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContentLogDetail);