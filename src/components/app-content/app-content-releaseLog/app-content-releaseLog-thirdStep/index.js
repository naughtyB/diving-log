import React from 'react';
import { Button } from 'antd';
import BraftEditor from 'braft-editor';
import { doChangeDetailRecord, doChangeStep } from '../../../../redux/action/releaseLog';
import moment from 'moment';
import { connect } from 'react-redux';
import 'braft-editor/dist/braft.css';
import './index.css';

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
  handleChange(detailRecord){
    this.props.onChangeDetailRecord(detailRecord)
  }
  handleBack(){
    this.props.onChangeStep(1)
  }
  handleSubmit(){
    console.log(this.props)
  }
  render(){
    const editorProps = {
      height: 1000,
      contentId: this.state.contentId,
      contentFormat: 'html',
      initialContent: '',
      onChange: this.handleChange,
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
          <BraftEditor {...editorProps}/>
        </div>
        <div className="app-content-releaseLog-thirdStep-action">
          <Button type="primary" onClick={this.handleBack} style={{marginRight: '10px'}}>上一步</Button>
          <Button type="primary" onClick={this.handleSubmit}>创建</Button>
        </div>
      </div> 
    )
  }
}

const mapStateToProps = (state) => {
  return {
    detailRecord: state.releaseLog.detailRecord
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeDetailRecord: (detailRecord) => dispatch(doChangeDetailRecord(detailRecord)),
    onChangeStep: (step) => dispatch(doChangeStep(step))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContentReleaseLogThirdStep);