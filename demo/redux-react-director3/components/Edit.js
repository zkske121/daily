import React, { Component } from 'react'
import { Select, Radio, Checkbox, Button, DatePicker, InputNumber, Form, Cascader, Icon, Input } from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;

class Edit extends Component {
  componentDidMount() {
    let initState = {
      eat: true,
      sleep: true,
      beat: true
    };

    const {isAdd} = this.props;

    const user = this.props.userList.find(user => user.uId == this.props.userId);
    
    !isAdd && user && (initState = Object.assign({}, user));

    initState.sex += '';

    this.props.form.setFieldsValue(initState);
  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }

      const {addUser, fetchPosts, setHash, updateUser} = this.props.actions;
      const {isAdd, userId: uId} = this.props;
      const promise = fetchPosts(values);

      promise.then(res => {
        if(isAdd) {
          addUser(res)
        } else {
          updateUser(Object.assign(res, {uId}));
        }

        setHash('list');
      });

    });
  }

  checkBirthday(rule, value, callback) {
    if (value && value.getTime() >= Date.now()) {
      callback(new Error('你不可能在未来出生吧!'));
    } else {
      callback();
    }
  }

  checkPhone(rule, value, callback) {
    if (!/\d{11}/.test(value)) {
      callback(new Error('请输入正确的手机号码!'));
    } else {
      callback();
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { isAdd } = this.props;

    const nameProps = getFieldProps('name', {
      rules:[
        {required: true, message:'请输入姓名'}
      ]
    });

    const sexProps = getFieldProps('sex', {
      rules: [
        { required: true, message: '请选择性别' },
      ],
    });

    const birthdayProps = getFieldProps('birthday', {
      rules: [
        {
          required: true,
          type: 'date',
          message: '你的生日是什么呢?',
        }, {
          validator: this.checkBirthday,
        },
      ],
    });

    const phoneNumberProps = getFieldProps('phone', {
      rules: [{ validator: this.checkPhone }],
    });

    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    return (
      <Form horizontal form={this.props.form} >
        <FormItem 
          {...formItemLayout}
          label='姓名：'>
          <Input {...nameProps} placeholder='请输入姓名' /> 
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="性别：">
          <RadioGroup {...sexProps}>
            <Radio value='1'>男</Radio>
            <Radio value='0'>女</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="生日：">
          <DatePicker {...birthdayProps} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="手机号码：">
          <Input {...phoneNumberProps} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="兴趣爱好：">
          <Checkbox {...getFieldProps('eat', {
            valuePropName: 'checked',
          })}>吃饭</Checkbox>
          <Checkbox {...getFieldProps('sleep', {
            valuePropName: 'checked',
          })}>睡觉</Checkbox>
          <Checkbox {...getFieldProps('beat', {
            valuePropName: 'checked',
          })}>打豆豆</Checkbox>
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 7 }} >
          <Button type="primary" onClick={this.handleSubmit.bind(this)}>{isAdd ? '新增' : '修改'}</Button>
          &nbsp;&nbsp;&nbsp;
          {isAdd && <Button type="ghost" onClick={this.handleReset.bind(this)} >重置</Button>}
        </FormItem>
      </Form>
    );
  }
}

Edit = createForm()(Edit);
export default Edit;