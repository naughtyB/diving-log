import React from 'react';
import { Button, message } from 'antd';
import BraftEditor from 'braft-editor';
import { withRouter } from 'react-router-dom';
import { doChangeDetailRecord, doChangeStep, doAddLog, doModifyLog } from '../../../../redux/action/releaseLog';
import { connect } from 'react-redux';
import 'braft-editor/dist/braft.css';
import './index.css';
let transformHash = (hash) => {
  let hashData={};
  hash.slice(1).split("&").forEach((item,index)=>{
      let arr=item.split("=");
      hashData[arr[0]]=decodeURIComponent(arr[1]);
  });
  return hashData;
};


export class AppContentReleaseLogThirdStep extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      contentId: new Date().getTime()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    if(transformHash(this.props.location.hash)['type'] === 'add'){
      this.editorInstance.setContent('', 'html')
    }
    if(transformHash(this.props.location.hash)['type'] === 'modify' && this.props.shouldModifyContent){
      this.props.onChangeShouldModifyContent(false);
      this.setState({
        contentId: new Date().getTime()
      })
    }
  }
  handleChange(detailRecord){
    this.props.onChangeDetailRecord(detailRecord)
  }
  handleBack(){
    this.props.onChangeStep(1)
  }
  handleSubmit(){
    let basicFields = this.props.basicFields;
    let json = {
      date: basicFields.date.value.format('YYYY-MM-DD'),
      timeIn: basicFields.timeIn.value.format('HH:mm:ss'),
      timeOut: basicFields.timeOut.value.format('HH:mm:ss'),
      location: basicFields.location.value,
      diveSite: basicFields.diveSite.value,
      start: basicFields.start.value,
      end: basicFields.start.value,
      visibility: basicFields.visibility.value,
      nitrox: basicFields.visibility.value,
      airTemperature: basicFields.airTemperature.value,
      bottomTemperature: basicFields.bottomTemperature.value,
      weight: basicFields.weight.value,
      camera: basicFields.camera.value,
      isSecret: basicFields.isSecret.value,
      title: basicFields.title.value,
      detail: this.props.detailRecord,
      marker: this.props.marker
    }
    let hash = transformHash(this.props.location.hash);
    if(hash['type'] === 'add'){
      this.props.onAddLog(JSON.stringify(json), () => {
        message.info('创建日志成功');
        //wqdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        this.props.history.push({
          pathname: '/user/log'
        });
      }, () => {
        message.error('服务器发生错误 请重新提交')
      }, () => {
        message.warn('您未登录  请先登录')
      })
    }
    else if(hash['type'] === 'modify'){
      this.props.onModifyLog(JSON.stringify({...json, logId: hash['logId']}),() => {
        message.info('修改日志成功');
        //wqdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        this.props.history.push({
          pathname: '/user/log'
        });
      }, () => {
        message.error('服务器发生错误 请重新提交')
      }, () => {
        message.warn('您未登录  请先登录')
      })
    }
  }
  render(){
    let type = transformHash(this.props.location.hash)['type'];
    const editorProps = {
      height: 1000,
      contentId: this.state.contentId,
      contentFormat: 'html',
      initialContent: this.props.detailRecord,
      onChange: this.handleChange,
      controls: [
        'undo', 'redo', 'split','text-color', 'bold', 'italic', 'underline', 'emoji', 'media', 'clear'
      ],
      media: {
        video: false,
        audio: false,
        uploadFn(param){
          const serverURL = '/upload'
          const xhr = new XMLHttpRequest()
          const fd = new FormData()
        
          // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
          console.log(param.libraryId)
        
          const successFn = (response) => {
            // 假设服务端直接返回文件上传后的地址
            // 上传成功后调用param.success并传入上传后的文件地址
            param.success({
              url: JSON.parse(xhr.responseText)['url']
            })
          }
        
          const progressFn = (event) => {
            // 上传进度发生变化时调用param.progress
            param.progress(event.loaded / event.total * 100)
          }
        
          const errorFn = (response) => {
            // 上传发生错误时调用param.error
            param.error({
              msg: 'unable to upload.'
            })
          }
        
          xhr.upload.addEventListener("progress", progressFn, false)
          xhr.addEventListener("load", successFn, false)
          xhr.addEventListener("error", errorFn, false)
          xhr.addEventListener("abort", errorFn, false)
        
          fd.append('file', param.file)
          xhr.open('POST', serverURL, true)
          xhr.send(fd)
        
        }
      }
    }
    return (
      <div>
        <div className="app-content-releaseLog-thirdStep-content">
          <BraftEditor {...editorProps} ref={instance => this.editorInstance = instance}/>
        </div>
        <div className="app-content-releaseLog-thirdStep-action">
          <Button type="primary" onClick={this.handleBack} style={{marginRight: '10px'}}>上一步</Button>
          <Button type="primary" onClick={this.handleSubmit} loading={this.props.isAddingLog}>{type === 'add' ? '创建' : '修改'}</Button>
        </div>
      </div> 
    )
  }
}

const mapStateToProps = (state) => {
  return {
    detailRecord: state.releaseLog.detailRecord,
    basicFields: state.releaseLog.basicFields,
    marker: state.releaseLog.marker,
    isAddingLog: state.releaseLog.isAddingLog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeDetailRecord: (detailRecord) => dispatch(doChangeDetailRecord(detailRecord)),
    onChangeStep: (step) => dispatch(doChangeStep(step)),
    onAddLog: (logData, successCallback, errorCallback, unloginCallback) => dispatch(doAddLog(logData, successCallback, errorCallback, unloginCallback)),
    onModifyLog: (logData, successCallback, errorCallback, unloginCallback) => dispatch(doModifyLog(logData, successCallback, errorCallback, unloginCallback))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContentReleaseLogThirdStep));