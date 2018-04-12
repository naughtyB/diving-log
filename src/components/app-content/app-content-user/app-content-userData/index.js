import React from 'react';
import { Form, Input, Icon, Radio, Button,message, Spin,Upload } from 'antd';
import { connect } from 'react-redux';
import { doChangeUserDataFields, doGetUserData, doSubmitUserData } from '../../../../redux/action/userData.js'
const FormItem = Form.Item; 
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    sm: { span: 8 }
  },
  wrapperCol: {
    sm: { span: 16 }
  },
};

export class AppContentUserData extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      uploadStyle: {
        backgroundImage: '',
        backgroundSize: '100% 100%'
      },
      opacity: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleMouseEnterFile = this.handleMouseEnterFile.bind(this);
    this.handleMouseLeaveFile = this.handleMouseLeaveFile.bind(this);
    this.normFile = this.normFile.bind(this);
  }
  componentWillMount(){
    this.props.onGetUserData((imgUrl)=>{
      this.setState({
        uploadStyle: {
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: '100% 100%'
        },
        opacity: 0
      })
    },()=>{},()=>{
      message.info('未登录 请先登录')
      this.props.history.push({
        pathname: '/login'
      })
    })
  }
  handleSubmit(){
    this.props.form.validateFields(["name","sex","imgUrl"],(errors,values)=>{
      if(!errors && !this.props.isSubmittingData){
        let fileList = this.props.form.getFieldValue('imgUrl');
        let data = {
          name: values['name'],
          sex: values['sex'],
          imgUrl: fileList[fileList.length - 1]['response']['url']
        }
        console.log(data)
        this.props.onSubmitUserData(JSON.stringify(data),()=>{
          message.info('成功')
        },()=>{
          message.info('失败')
        },()=>{
          message.info('为链接')
        })
      }
    })
  }
  handleFileChange(info){
    if(info.file.response && info.file.response.url){
      this.setState({
        uploadStyle: {
          backgroundImage: `url(${info.file.response.url})`,
          backgroundSize: '100% 100%'
        },
        opacity: 0
      })
    }
  }
  handleMouseEnterFile(){
    this.setState({
      opacity: 1
    })
  }
  handleMouseLeaveFile(){
    if(this.state.uploadStyle.backgroundImage){
      this.setState({
        opacity: 0
      })
    }
  }
  normFile(e){
    return e.fileList ? e.fileList : [];
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Spin spinning={this.props.isGettingData} className="app-content-user-data-fields">
        <div>
          <Form style={{width: '30%'}}>
            <FormItem
              {...formItemLayout} 
              label='昵称'
            >
              {getFieldDecorator('name', {
                validateFirst: true,
                rules: [
                  { required: true, message: '请输入昵称' },
                  { pattern:/[\u4e00-\u9fa5a-zA-Z0-9\-_]{4,30}/,message:"昵称为4-30个字,且不包含出_和-以外的字符"}
                ]
                })(
                    <Input type="text"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout} 
              label="性别"
            >
              {getFieldDecorator('sex')(
                <RadioGroup>
                  <Radio value="secret">保密</Radio>
                  <Radio value="male">男</Radio>
                  <Radio value="female">女</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout} 
              label='头像'
            >
              <div className="dropbox">
                {getFieldDecorator('imgUrl', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                  rules: [{
                    validator: (rule, value, callback) => {
                      if(value.length === 0){
                        callback('请选择图片')
                      }
                      callback()
                    }
                  }]
                })(
                  <Upload.Dragger 
                    name="file" 
                    action="/upload"
                    style={{padding: 0}}
                    showUploadList={false}
                    onChange={this.handleFileChange}
                    style={{...this.state.uploadStyle, marginTop: '-15px', marginBottom: '-15px'}}
                  >
                    <div className="upload-content" style={{opacity: this.state.opacity, backgroundColor: this.state.opacity === 0 ? "" : "rgba(200, 200, 200, 0.5)",padding: '30px 0'}} onMouseEnter={this.handleMouseEnterFile} onMouseLeave={this.handleMouseLeaveFile}>
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox"/>
                      </p>
                      <p className="ant-upload-text">点击选择头像</p>
                      <p className="ant-upload-hint">上传完毕之后请保存</p>
                    </div>
                  </Upload.Dragger>
                )}
              </div>
            </FormItem>
            <Button
              type="primary"
              htmlType="submit"
              style={{marginLeft: '110px'}}
              loading={this.props.isSubmittingData}
              onClick={this.handleSubmit}
            >
              保存
            </Button>                
          </Form>
        </div>
      </Spin>
    )
  }
}

const options = {
  onFieldsChange(props, changedFields) {
    props.onChangeUserDataFields(changedFields);
  },
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        ...props.userDataFields.name
      }),
      sex: Form.createFormField({
        ...props.userDataFields.sex
      }),
      imgUrl: Form.createFormField({
        ...props.userDataFields.imgUrl
      })
    };
  }
}

const mapStateToProps = (state) => {
  return {
    userDataFields: state.userData.userDataFields,
    isGettingData: state.userData.isGettingData,
    isSubmittingData: state.userData.isSubmittingData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserData: (successCallback, errorCallback, unloginCallback) => dispatch(doGetUserData(successCallback, errorCallback, unloginCallback)),
    onChangeUserDataFields: (fieldsChanged) => dispatch(doChangeUserDataFields(fieldsChanged)),
    onSubmitUserData: (userData, successCallback, errorCallback, unloginCallback) => dispatch(doSubmitUserData(userData, successCallback, errorCallback, unloginCallback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create(options)(AppContentUserData));