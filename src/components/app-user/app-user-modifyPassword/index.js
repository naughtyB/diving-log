import React from 'react';
import { Form, Input, Button, Icon, message, Select } from 'antd';
import { connect } from 'react-redux';
import { doChangeUserResetPasswordFields, doSubmitResetPassword } from '../../../redux/action/user.js';
import './index.css';
import Cookies from 'js-cookie';
const FormItem = Form.Item; 
const Option = Select.Option;

export class AppHeaderUserResetPassword extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
  }
  componentWillMount(){
    this.props.onChangeUserResetPasswordFields({
      username:{
        value: ''
      },
      password: {
        value: ''
      },
      confirm: {
        value: ''
      },
      securityAnswer: {
        value: ''
      },
      securityQuestion: {
        value: undefined
      }
    })
    Cookies.remove('username');
    Cookies.remove('userId');
  }
  checkPassword(rule, value, callback){
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入必须一致');
    } else {
      callback();
    }
  }
  checkConfirm(rule, value, callback){
    const form = this.props.form;
    const repeatPassword = form.getFieldValue('confirm');
    if(repeatPassword){
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleSubmit(){
    this.props.form.validateFields(["username", "password", "confirm" , "securityQuestion", "securityAnswer"],(errors,values)=>{
      if(!errors && !this.props.isResettingPassword){
        this.props.onSubmitResetPassword(values["username"], values["password"], values["securityQuestion"], values["securityAnswer"], () => {
          message.info('重置密码成功并已自动登录');
          this.props.history.push({
            pathname: '/'
          })
        })
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="app-user-reset-password">
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            validateFirst:true,
            rules: [
              { required: true, message: '请输入帐号!'},
              { pattern:/^[a-zA-Z0-9]+$/,message:"帐号只能包含英文字母和数字"},
              { min:6, message:"帐号的最低长度为6位"}
            ]
            })(
              <Input style={{height: '40px'}} prefix={<Icon  type="mobile" style={{ fontSize: 13}} />} type="text" placeholder="帐号" />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            validateFirst: true,
            rules: [
              { required: true, message: '请输入密码' },
              { pattern:/[a-zA-Z0-9\-_]{4,30}/,message:"密码为4-30个字符,且不包含除_和-以外的字符"},
              { validator: this.checkConfirm }
            ]
            })(
              <Input style={{height: '40px'}} prefix={<Icon type="lock" style={{ fontSize: 13}} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('confirm', {
            validateFirst: true,
            rules: [
              { required: true, message: '请再次输入密码' },
              { validator: this.checkPassword }
            ]
            })(
              <Input style={{height: '40px'}} prefix={<Icon type="lock" style={{ fontSize: 13}} />} type="password" placeholder="请再次输入密码" />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('securityQuestion', {
            validateFirst:true,
            rules: [
              { required: true, message: '请选择密保问题' }
            ]
          })(
            <Select placeholder="请选择密保问题">
              <Option key="1" value="我的父亲的名字">我的父亲的名字</Option>
              <Option key="2" value="我的母亲的名字">我的母亲的名字</Option>
              <Option key="3" value="我的小学老师的名字">我的小学老师的名字</Option>
              <Option key="4" value="我的初中老师的名字">我的初中老师的名字</Option>
            </Select>
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('securityAnswer', {
            validateFirst:true,
            rules: [
              { required: true, message: '请填写密保答案' }
            ]
          })(
            <Input style={{height: '40px'}} className="app-user-register-username-input" prefix={<Icon type="securityAnswer" style={{ fontSize: 13, color: '#ccc' }} />} type="text" placeholder="密保答案" />
          )}
        </FormItem>                    
        <div>
          <Button
            type="primary"
            htmlType="submit"
            className="app-user-reset-password-submit-input"
            loading={this.props.isResettingPassword}
            onClick={this.handleSubmit}
          >
            确认修改
          </Button>
          <span className="app-user-reset-password-hadMobileNumber" onClick={()=>this.props.history.push({pathname: '/login'})}>已有帐号，登录</span>
        </div>
      </Form>
    )     
  }
}

const options = {
  onFieldsChange(props, changedFields) {
    props.onChangeUserResetPasswordFields(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.resetPasswordFields.username
      }),
      password: Form.createFormField({
        ...props.resetPasswordFields.password
      }),
      confirm: Form.createFormField({
        ...props.resetPasswordFields.confirm
      }),
      securityQuestion: Form.createFormField({
        ...props.resetPasswordFields.securityQuestion
      }),
      securityAnswer: Form.createFormField({
        ...props.resetPasswordFields.securityAnswer
      })
    };
  }
}

const mapStateToProps = (state) => {
  return {
    isResettingPassword: state.user.isResettingPassword,
    resetPasswordFields: state.user.resetPasswordFields
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeUserResetPasswordFields: (resetPasswordFieldsChanged) => dispatch(doChangeUserResetPasswordFields(resetPasswordFieldsChanged)),
    onSubmitResetPassword: (username, password, securityQuestion, securityAnswer, successCallback) => dispatch(doSubmitResetPassword(username, password, securityQuestion, securityAnswer, successCallback))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Form.create(options)(AppHeaderUserResetPassword));