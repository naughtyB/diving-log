import React from 'react';
import { Avatar, Icon, Affix, Card, Spin } from 'antd'; 
import { doGetLogDetail } from '../../../redux/action/logDetail'
import { connect } from 'react-redux';
import './index.css';

let transformHash = (hash) => {
  let hashData={};
  hash.slice(1).split("&").forEach((item,index)=>{
      let arr=item.split("=");
      hashData[arr[0]]=decodeURIComponent(arr[1]);
  });
  return hashData;
};

export class AppContentLogDetail extends React.Component{
  componentWillMount(){
    let hash = transformHash(this.props.location.hash);
    this.props.onGetLogDetail(hash['logId'])
  }
  render(){
    const { isGettingDetail, data } = this.props;
    if(data && data.date){
      return (
        <div className="app-content-logDetail" style={{width: '1110px', margin: '0 auto'}}>
          <div style={{width: '757px'}}>
            <Affix offsetTop={180} style={{ position: 'absolute', left: '1100px', top: '180px'}}>
              <Card title="潜水日志基本信息" style={{ width: 300 }}>
                <p>日期：{data.date}</p>
                <p>入水时间：{data.timeIn}</p>
                <p>出水时间：{data.timeOut}</p>
                <p>地点：{data.location}</p>
                <p>潜点：{data.diveSite}</p>
                <p>开始气量：{data.start}bar</p>
                <p>结束气量：{data.end}bar</p>
                <p>能见度：{data.visibility}米</p>
                <p>高痒：{data.nitrox}%</p>
                <p>空气温度：{data.airTemperature}℃</p>
                <p>水下温度：{data.bottomTemperature}℃</p>
                <p>配重: {data.weight}kg</p>
                <p>相机：{data.camera}</p>
              </Card>
            </Affix>
            <h2 style={{fontSize: '25px', fontWeight: '700', lineHeight: '100px', borderBottom: '1px solid #CCC'}}>{data.title}</h2>
            <div style={{display: 'flex', marTop: '16px', borderBottom: '1px solid #CCC'}}>
              <div style={{width: '45px'}}>
                <Avatar size="large"  style={{ backgroundColor: '#87d068' }} icon="user" />
              </div>
              <div style={{flex: '1 1', padding: '0 11px 0'}}>
                <div style={{display: 'flex', flexDirection: 'space-between'}}>
                  <span style={{color: 'rgb(34,34,34)', fontSize: '13px', fontWeight: '700'}}>bender</span>
                </div>
                <div style={{marginTop: '25px', color: 'rgb(34,34,34)', fontSize: '14px', lineHeight: '19px'}}>
                  <p style={{marginBottom: '0', color: 'rgb(34,34,34)', fontSize: '14px', lineHeight: '19px'}}>学react小白一枚，现在有个</p>
                </div>
                <div style={{margin: '34px 0 25px', height:'34px', display: 'flex', flexDirection: 'row-reverse'}}>
                  <div className="reply" style={{height: '34px', padding: '8px 10px', cursor: 'pointer', fontSize: '16px', opacity:'0.7', color:'rgb(78, 78, 78)', lineHeight: '19px', fontSize: '18px'}}>
                    回复
                  </div>
                  <div className="isPraised" style={{height: '34px', padding: '8px 10px', cursor: 'pointer'}}>
                    <Icon type="heart" style={{fontSize: '16px'}} />
                  </div>
                </div>
              </div>
            </div>
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
    onGetLogDetail: (logId, successCallback, errorCallback) => dispatch(doGetLogDetail(logId, successCallback, errorCallback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContentLogDetail);