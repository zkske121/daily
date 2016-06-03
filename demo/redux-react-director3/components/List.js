import React, { Component } from 'react'
import { Form, Row, Col, Input, Button, Select, Table, Icon} from 'antd'

const FormItem = Form.Item;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.userList
    }
  }

	handleSubmit(e) {
		e.stopPropagation();
		e.preventDefault();
	}

	render() {
    const {setHash, deleteUser} = this.props.actions;

    const columns = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '性别',
        key: 'sex',
        render: (text, record) => (record.sex == '1' ? '男' : '女')
      }, {
        title: '出生年月',
        key: 'birthday',
        render: (text, record) => {
          const date = record.birthday;
          return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        }
      }, {
        title: '爱好',
        key: 'hobby',
        render: (text, record) => {
          const hobby = {
            eat: '吃饭',
            sleep: '睡觉',
            beat: '打豆豆'
          };
          const res = [];

          Object.keys(hobby).forEach(v => {
            if(record[v]) res.push(hobby[v]);
          });

          return <span>
            {res.length ? res.reduce((p, n) => `${p} ${n}`) : ''}
          </span>;
        }
      }, {
        title: '手机号码',
        key: 'phone',
        dataIndex: 'phone',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
              <a href="javascript:void 0;" style={{marginRight: 10}} onClick={setHash.bind(null, `edit/${record.uId}`)}>编辑</a>
              <a href="javascript:void 0;" onClick={deleteUser.bind(null, record.uId)}>删除</a>
            </span>
        )
      }];

      const {data} = this.state;
      const pagination = {
        total: data.length,
        onShowSizeChange(current, pageSize) {
          console.log('Current: ', current, '; PageSize: ', pageSize);
        },
        onChange(current) {
          console.log('Current: ', current);
        },
      };

		return (
			<div>
				<Row >
					<Col>
						<Form inline onSubmit={this.handleSubmit}>
					        <FormItem
					          label="姓名: ">
					          <Input />
					        </FormItem>
					        <FormItem label='性别: '>
                    <Select defaultValue="2">
                      <Select.Option value="1">男</Select.Option>
                      <Select.Option value="0">女</Select.Option>
                      <Select.Option value="2">无</Select.Option>
                    </Select>
					        </FormItem>
					        <Button type="primary" htmlType="submit" style={{marginRight: 20}}>搜索</Button>
					      </Form>
					</Col>
				</Row>
				<Row style={{marginTop: 20}}>
					<Col>
						<Table  columns={columns} dataSource={data} pagination = {pagination}/>
					</Col>
				</Row>
			</div>
			);
	}
}

export default List;

