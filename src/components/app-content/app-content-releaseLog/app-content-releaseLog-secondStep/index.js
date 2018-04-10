import React from 'react';
import { Form, DatePicker, Button, TimePicker, Input, Row, Col,  Radio } from 'antd';
import './index.css';
import { connect } from 'react-redux';
import { doChangeBasiCFields, doChangeStep } from '../../../../redux/action/releaseLog'
const RadioGroup = Radio.Group;


const formItemLayout = {
  labelCol: {
    sm: { span: 9 }
  },
  wrapperCol: {
    sm: { span: 15}
  },
};

const FormItem = Form.Item;

export class AppContentReleaseLogSecondStep extends React.Component{
  constructor(props){
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }
  handleBack(){
    this.props.onChangeStep(0);
  }
  handleNext(){
    this.props.form.validateFields(["date", "title", "timeIn", "timeOut", "location", "diveSite", "start", "end", "visibility", "nitrox", "airTemperature", "bottomTemperature", "weight", "camera", "isSecret"],(errors,values)=>{
      if(!errors){
        this.props.onChangeStep(2);
      }
    })
  }
  render(){
    const form = this.props.form;
    const { getFieldDecorator } = form;
    return(
      <div>
        <div className="app-content-releaseLog-secondStep-content">
          <Form style={{width: '60%', margin: '0 auto'}}>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem {...formItemLayout} label="潜水时间">
                  {getFieldDecorator('date',{
                    rules: [
                      {required: true, message: '请选择潜水日志时间'}
                    ]
                  })(
                    <DatePicker/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="主题">
                  {getFieldDecorator('title',{
                    rules: [
                      {required: true, message: '请填写主题'}
                    ]
                  })(
                    <Input type="text"/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem {...formItemLayout} label="入水时间">
                  {getFieldDecorator('timeIn',{
                    rules: [
                      {required: true, message: '请选择入水时间'}
                    ]
                  })(
                    <TimePicker/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="出水时间">
                  {getFieldDecorator('timeOut',{
                    rules: [
                      {required: true, message: '请选择出水时间'}
                    ]
                  })(
                    <TimePicker/>
                  )}
              </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem {...formItemLayout} label="地点">
                  {getFieldDecorator('location',{
                    rules: [
                      {required: true, message: '请填写地点'}
                    ]
                  })(
                    <Input type="text"/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="潜点">
                  {getFieldDecorator('diveSite',{
                    rules: [
                      {required: true, message: '请填写潜点'}
                    ]
                  })(
                    <Input type="text"/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem {...formItemLayout} label="开始气量">
                  {getFieldDecorator('start',{
                    rules: [
                      {required: true, message: '请填写开始气量'}
                    ]
                  })(
                    <Input type="text" addonAfter="bar"/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="结束气量">
                  {getFieldDecorator('end',{
                    rules: [
                      {required: true, message: '请填写结束气量'}
                    ]
                  })(
                    <Input type="text" addonAfter="bar"/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem {...formItemLayout} label="能见度">
                  {getFieldDecorator('visibility',{
                    rules: [
                      {required: true, message: '请填写能见度'}
                    ]
                  })(
                    <Input type="text" addonAfter="M米"/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="高痒">
                  {getFieldDecorator('nitrox',{
                    rules: [
                      {required: true, message: '请填写结束气量'}
                    ]
                  })(
                    <Input type="text" addonAfter='%'/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem {...formItemLayout} label="空气温度">
                  {getFieldDecorator('airTemperature',{
                    rules: [
                      {required: true, message: '请填写能见度'}
                    ]
                  })(
                    <Input type="text" addonAfter="℃"/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="水下温度">
                  {getFieldDecorator('bottomTemperature',{
                    rules: [
                      {required: true, message: '请填写结束气量'}
                    ]
                  })(
                    <Input type="text" addonAfter="℃"/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem {...formItemLayout} label="配重">
                  {getFieldDecorator('weight',{
                    rules: [
                      {required: true, message: '请填写配重'}
                    ]
                  })(
                    <Input type="text" addonAfter="kg"/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem {...formItemLayout} label="相机">
                  {getFieldDecorator('camera',{
                    rules: [
                      {required: true, message: '请选择相机'}
                    ]
                  })(
                    <RadioGroup>
                      <Radio value="广角">广角</Radio>
                      <Radio value="微距">微距</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem {...formItemLayout} label="是否公开">
                  {getFieldDecorator('isSecret',{
                    rules: [
                      {required: true, message: '请选择相机'}
                    ]
                  })(
                    <RadioGroup>
                      <Radio value="common">公开</Radio>
                      <Radio value="secret">私密</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="app-content-releaseLog-secondStep-action" style={{textAlign: 'right'}}>
          <Button type="primary" onClick={this.handleBack} style={{marginRight: '10px'}}>上一步</Button>
          <Button type="primary" onClick={this.handleNext}>下一步</Button>
        </div>
      </div>
    )
  }
}

const option = {
  onFieldsChange(props, changedFields) {
    props.onChangeBasiCFields(changedFields);
  },
  mapPropsToFields(props) {
    return {
      date: Form.createFormField({
        ...props.basicFields.date
      }),
      title: Form.createFormField({
        ...props.basicFields.title
      }),
      timeIn: Form.createFormField({
        ...props.basicFields.timeIn
      }),
      timeOut: Form.createFormField({
        ...props.basicFields.timeOut
      }),
      location: Form.createFormField({
        ...props.basicFields.location
      }),
      diveSite: Form.createFormField({
        ...props.basicFields.diveSite
      }),
      start: Form.createFormField({
        ...props.basicFields.start
      }),
      end: Form.createFormField({
        ...props.basicFields.end
      }),
      visibility: Form.createFormField({
        ...props.basicFields.visibility
      }),
      nitrox: Form.createFormField({
        ...props.basicFields.nitrox
      }),
      airTemperature: Form.createFormField({
        ...props.basicFields.airTemperature
      }),
      bottomTemperature: Form.createFormField({
        ...props.basicFields.bottomTemperature
      }),
      weight: Form.createFormField({
        ...props.basicFields.weight
      }),
      camera: Form.createFormField({
        ...props.basicFields.camera
      }),
      isSecret: Form.createFormField({
        ...props.basicFields.isSecret
      })
    };
  }
}

const mapStateToProps = (state) => {
  return {
    basicFields: state.releaseLog.basicFields
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeBasiCFields: (fieldsChanged) => dispatch(doChangeBasiCFields(fieldsChanged)),
    onChangeStep: (step) => dispatch(doChangeStep(step))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create(option)(AppContentReleaseLogSecondStep));