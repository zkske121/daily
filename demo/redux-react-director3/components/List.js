import React, { Component } from 'react'
import { Form, Row, Col, Input, Button, Select, Table, Icon} from 'antd'
import { getSort, getMutipSort } from '../utils/custom'

const FormItem = Form.Item;
const {Option} = Select;
const sortConfig = {
  name: getSort((a, b) => a.name < b.name),
  sex: getSort((a, b) => a.sex && !b.sex),
  birthday: getSort((a, b) => a.birthday < b.birthday)
}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.userList
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.userList
    })
  }

	searchHandle(e) {
		e.stopPropagation();
		e.preventDefault();

    let {name, sex} = this.props.form.getFieldsValue();

    const res = this.props.userList.filter(row => {
      if(name != void 0 && name.length && row.name.indexOf(name) == -1) return false;

      if(sex != 2 && row.sex != sex) return false;

      return true;
    });

    this.setState({
      data: res
    });
	}

  sortHandle(values) {
    if(!values.length) {
      this.setState({
        data: this.state.data.sort(getSort((a, b) => a.uId < b.uId))
      });

      return;
    }

    const sorts = values.map(key => sortConfig[key]);

    const res = this.state.data.sort(getMutipSort(sorts));

    this.setState({
      data: res
    });
  }

	render() {
    const {setHash, deleteUser} = this.props.actions;
    const { getFieldProps } = this.props.form;
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
				<Row type="flex" justify="space-between">
          <Col>
            <Select multiple style={{width: 260}} placeholder='按条件排序' onChange={this.sortHandle.bind(this)}>
              <Option key='name'>姓名</Option>
              <Option key='birthday'>出生年月</Option>
              <Option key='sex'>性别</Option>
            </Select>
          </Col>
					<Col>
						<Form inline onSubmit={this.searchHandle.bind(this)}>
			        <FormItem label="姓名">
			          <Input {...getFieldProps('name')} />
			        </FormItem>
			        <FormItem label='性别' >
                <Select {...getFieldProps('sex', {
                  initialValue: '2'
                })}>
                  <Option value="1">男</Option>
                  <Option value="0">女</Option>
                  <Option value="2">无</Option>
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

List = Form.create()(List);

export default List;

