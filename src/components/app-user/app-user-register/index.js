import React from 'react';
import { Form, Input, Icon, Button, message, Select } from 'antd';
import { connect } from 'react-redux';
import { doChangeUserRegisterFields, doSubmitRegister } from '../../../redux/action/user';
import './index.css';
import Cookies from 'js-cookie';
const FormItem = Form.Item;
const Option = Select.Option;


export class AppUserRegister extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
  }
  componentWillMount(){
    this.props.onChangeUserRegisterFields({
      username: {
        value: ''
      },
      password: {
        value: ''
      },
      confirm: {
        value: ''
      },
      name: {
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
  checkConfirm(rule, value, callback){
    const form = this.props.form;
    const repeatPassword = form.getFieldValue('confirm');
    if(repeatPassword){
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  checkPassword(rule, value, callback){
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入必须一致');
    } else {
      callback();
    }
  }
  handleSubmit(){
    this.props.form.validateFields(["username", "password", "confirm" ,"name", "securityQuestion", "securityAnswer"],(errors,values)=>{
      if(!errors && !this.props.isRegistering){
        this.props.onSubmitRegister(values["username"], values["password"], values["name"], values["securityQuestion"], values["securityAnswer"], () => {
          message.info('注册成功并已自动登录');
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
      <Form className="app-user-register">
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
            validateFirst:true,
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
            validateFirst:true,
          rules: [
            { required: true, message: '请再次输入密码' },
            { validator: this.checkPassword }
          ]
          })(
            <Input style={{height: '40px'}} prefix={<Icon type="lock" style={{ fontSize: 13}} />} type="password" placeholder="请再次输入密码" />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('name', {
            validateFirst:true,
            rules: [
                { required: true, message: '请输入昵称' },
                { pattern:/[\u4e00-\u9fa5a-zA-Z0-9\-_]{4,30}/,message:"昵称为4-30个字,且不包含出_和-以外的字符"}
            ]
          })(
            <Input style={{height: '40px'}} className="app-user-register-username-input" prefix={<Icon type="user" style={{ fontSize: 13}} />} type="username" placeholder="昵称" />
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
            className="app-user-register-submit-input"
            loading={this.props.isRegistering}
            onClick={this.handleSubmit}
          >
            注册
          </Button>
          <span className="app-user-register-hadUsername" onClick={()=>this.props.history.push({pathname: '/login'})}>已有帐号，登录</span>
        </div>
      </Form>               
    )
  }
}

const option = {
  onFieldsChange(props, changedFields) {
    props.onChangeUserRegisterFields(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.registerFields.username
      }),
      password: Form.createFormField({
        ...props.registerFields.password
      }),
      confirm: Form.createFormField({
        ...props.registerFields.confirm
      }),
      name: Form.createFormField({
        ...props.registerFields.name
      }),
      securityQuestion: Form.createFormField({
        ...props.registerFields.securityQuestion
      }),
      securityAnswer: Form.createFormField({
        ...props.registerFields.securityAnswer
      })
    };
  }
}

const mapStateToProps = (state) => {
  return {
    isRegistering: state.user.isRegistering,
    registerFields: state.user.registerFields
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeUserRegisterFields: (registerFieldsChanged) => dispatch(doChangeUserRegisterFields(registerFieldsChanged)),
    onSubmitRegister: (username, password, name, securityQuestion, securityAnswer, successCallback) => dispatch(doSubmitRegister(username, password, name, securityQuestion, securityAnswer, successCallback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create(option)(AppUserRegister));

