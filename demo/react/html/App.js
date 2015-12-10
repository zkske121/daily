var App = React.createClass({
				getInitialState: function() {
					return {
						list: Immutable.fromJS(this.props.dataArr)	
					}
				},
				//对数据的状态进行变更
				toggleChecked: function(event) {
					var checked = event.target.checked;
					var index  = event.target.getAttribute('data-index');
					var list = this.state.list.setIn([index, 'checked'], checked);

					this.setState({list: list});
				},
				render: function() {
					//将数组的数据渲染出来
					return (
						<ul>
							{
								this.state.list.map(function(data, index) {
									return <ListItem data={data}
											index = {index} key={data.get('name')}
											toggleChecked = {this.toggleChecked}
											/>
								}.bind(this))
							}
						</ul>
					)
				}
			});
			
			//代表每一个子组件
			var ListItem = React.createClass({
				mixins: [React.addons.PureRenderMixin],
//				shouldComponentUpdate: function(nextProps, nextState) {
//					return this.props.data !== nextProps.data;
//				},
				render: function() {
					var data = this.props.data;
					var index = this.props.index;
					
					//checkbox选择框是一个受限组件，用数据来决定它是否选中
					return (
						<li>
							<input type="checkbox" data-index = {index} checked={data.get('checked')} onChange={this.props.toggleChecked} />
							<span>{data.get('name')}</span>
						</li>
					)
				}
			});
			
			var dataArr = [];
			for(var i = 0; i < 2000; i++) {
				var checked = Math.random() < 0.5;
				dataArr.push({
					name: i,
					checked: checked
				})
			}
			
			perf = React.addons.Perf;
			React.render(<App dataArr={dataArr} />, document.body);