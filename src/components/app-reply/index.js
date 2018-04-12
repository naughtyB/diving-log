import React from 'react';
import BraftEditor from 'braft-editor';
import { Button, Icon, Avatar } from 'antd';
import { connect } from 'react-redux';
import { doChangeVisible, doCreateComment, doChangeReplyContent } from '../../redux/action/reply'
import './index.css';

export class AppReply extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      contentId: new Date().getTime()
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(content){
    this.props.onChangeReplyContent(content);
    console.log(this.props.replyContent)
  }
  handleClose(){
    this.props.onChangeVisible(false);
  }
  handleSubmit(){
    let timer = null;
    let off = true;
    timer = setInterval(() => {
      if(this.props.replyContent && !/\<p\>\<\/p\>/.test(this.props.replyContent) && off){
        off = false;
        clearInterval(timer);
        let commentData = {
          logId: this.props.logId,
          userReplyedId: this.props.userReplyedData._id,
          content: this.props.replyContent
        }
        this.props.onCreateComment(JSON.stringify(commentData), this.props.successCallback, this.props.errorCallback, this.props.unloginCallback)
      }
    }, 100)
  }
  componentWillUpdate(nextProps){
    if(this.props.visible !== nextProps.visible || this.props.logId !== nextProps.logId || this.props.userReplyedData._id !== nextProps.userReplyedData._id){
      this.editorInstance.setContent('', 'html')
    }
  }
  render(){
    const { userReplyedData, isCreatingComment } = this.props;
    const editorProps = {
      height: 154,
      contentId: this.state.contentId,
      contentFormat: 'html',
      initialContent: '',
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
      <div className="app-reply" style={{position: 'fixed', bottom: 0, left: 0, right: 0, margin:" 0 auto" ,zIndex: 1000, width: '1110px', height: this.props.visible ? '284px' : '0', backgroundColor: 'transparent'}}>
        <div style={{position: 'relative', width: '757px', backgroundColor: 'rgb(233,233,233)', border: '1px solid #CCC', padding: '6px 5px 0', borderRadius: '5px'}}>
          <Icon onClick={this.handleClose} type="down" style={{position: 'absolute', top: '12px', right: '5px', fontSize: '20px', color: '#777', cursor: 'pointer'}}/>
          <p style={{height: '30px', marginBottom: '5px', lineHeight: '30px', display: 'flex', alignItems: 'center'}}>
            <Icon type="replyToOther"/><Avatar src={userReplyedData.imgUrl || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} style={{marginLeft: '5px'}} size="small"/><span style={{color: '#08c', marginLeft: '5px'}}>{userReplyedData.name || ''}</span>
          </p>
          <BraftEditor style={{backgroundColor: 'white'}} {...editorProps} ref={instance => this.editorInstance = instance}/>
          <p style={{margin: '5px 0 5px'}}>
            <Button type="primary" loading={isCreatingComment} onClick={this.handleSubmit}>回复</Button>
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    visible: state.reply.visible,
    userReplyedData: state.reply.userReplyedData,
    logId: state.reply.logId,
    replyContent: state.reply.replyContent,
    isCreatingComment: state.reply.isCreatingComment,
    successCallback: state.reply.successCallback,
    errorCallback: state.reply.errorCallback,
    unloginCallback: state.reply.unloginCallback
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeVisible: (visible, userReplyedData, logId) => dispatch(doChangeVisible(visible, userReplyedData, logId)),
    onCreateComment: (commentData, successCallback, errorCallback, unloginCallback) => dispatch(doCreateComment(commentData, successCallback, errorCallback, unloginCallback)),
    onChangeReplyContent: (replyContent) => dispatch(doChangeReplyContent(replyContent))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppReply);