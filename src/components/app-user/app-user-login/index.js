import React from 'react';
import { Form, Input, Icon, Button, Checkbox, message } from 'antd';
import { doChangeUserLoginFields, doSubmitLogin } from '../../../redux/action/user';
import { connect } from 'react-redux';
import './index.css';
import Cookies from 'js-cookie';
const FormItem = Form.Item;

export class AppUserLogin extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
    this.props.onChangeUserLoginFields({
      username: {
        value: ''
      },
      password: {
        value: ''
      }
    })
    Cookies.remove('username');
    Cookies.remove('userId');
  }
  handleSubmit(){
    this.props.form.validateFields(["username","password"],(errors,values)=>{
      if(!errors && !this.props.isLogging){
        this.props.onSubmitLogin(values["username"],values["password"], () => {
          message.info('登录成功');
          this.props.history.push({pathname: '/'})
        })
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="app-user-login">
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            validateFirst:true,
            rules: [
              { required: true, message: '请输入帐号!'},
              { pattern:/^[a-zA-Z0-9]+$/,message:"帐号只能包含英文字母和数字"},
              { min:6, message:"帐号的最低长度为6位"}
            ]
            })(
              <Input className="app-user-login-username" prefix={<Icon  type="mobile" style={{ fontSize: 13}} />} type="text" placeholder="帐号" />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            validateFirst:true,
          rules: [
            { required: true, message: '请输入密码' },
            { pattern:/[a-zA-Z0-9\-_]{4,30}/,message:"密码为4-30个字符,且不包含除_和-以外的字符"}
          ]
          })(
            <Input className="app-user-login-password" prefix={<Icon type="lock" style={{ fontSize: 13}} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem style={{marginBottom: '10px'}}>
          {getFieldDecorator('autoLogin', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>自动登录</Checkbox>
          )}
          <span className="app-user-login-forgetPassword" onClick={()=>this.props.history.push({pathname: '/resetPassword'})}>忘记密码</span>
        </FormItem>
        <Button
          type="primary"
          htmlType="submit"
          className="app-user-login-submit"
          loading={this.props.isLogging}
          onClick={this.handleSubmit}
        >
          登录
        </Button>
        <p><span className="app-user-login-register" onClick={()=>this.props.history.push({pathname: '/register'})}>注册新账号</span></p>
      </Form>  
    )
  }
}

const option = {
  onFieldsChange(props, changedFields) {
    props.onChangeUserLoginFields(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.loginFields.username
      }),
      password: Form.createFormField({
        ...props.loginFields.password
      })
    };
  }
}

const mapStateToProps = (state) => {
  return {
    loginFields : state.user.loginFields,
    isLogging : state.user.isLogging
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    onChangeUserLoginFields: (fieldsChanged) => dispatch(doChangeUserLoginFields(fieldsChanged)),
    onSubmitLogin: (username, password, successCallback) => dispatch(doSubmitLogin(username, password, successCallback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create(option)(AppUserLogin));