import React, { Component } from 'react'
import { Form, Input, Button, Tooltip, Icon, Checkbox, Radio, Select, Upload} from 'antd'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class Add extends Component {
	render() {
		const formItemLayout = {
		      labelCol: { span: 6 },
		      wrapperCol: { 
		      	span: 14,
		      	offset:1
		      },
		    };

		return (	
				<Form horizontal style={{marginTop:100}} onSubmit = {this.props.fetch}  >
			        <FormItem
			          {...formItemLayout}
			          label="Organization: ">
			          <Select defaultValue="Architecture-架构" style={{ width: 180 }}>
		                <Option value="Architecture-架构">Architecture-架构</Option>
		                <Option value="Filght-机票">Filght-机票</Option>
		                <Option value="FinanceService-金融服务">FinanceService-金融服务</Option>
		                <Option value="Fin-金融平台">Fin-金融平台</Option>
		                <Option value="Hotel-酒店">Hotel-酒店</Option>
		              </Select>
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="ServicesType: ">
			          <Select defaultValue=".NET" style={{ width: 180 }}>
		                <option value=".NET" >.NET</option>
		                <option value="JAVA">JAVA</option>
		                <option value="NodeJS">NodeJS</option>
		                <option value="Python">Python</option>
		                <option value="PHP">PHP</option>
		              </Select>
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="APPName: ">
			          <Select defaultValue="ForexRestAPI + APPID :0000278" style={{ width: 220 }}>
		                <option value="ForexRestAPI + APPID :0000278" >ForexRestAPI + APPID :0000278</option>
		              </Select>
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="上传契约文件: ">
			          <Upload >
			              <Button type="ghost">
			                <Icon type="upload" /> 点击上传
			              </Button>
		              </Upload>
			        </FormItem>
			        <FormItem wrapperCol={{ span: 16, offset: 7 }} style={{ marginTop: 24 }} size='large'>
			          <Button type="primary" htmlType="submit">生成契约文档</Button>
			        </FormItem>
			    </Form>
			);
	}
}