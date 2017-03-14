import React, { PropTypes } from 'react'
import { connect } from 'dva'
import '../css/index.less'
import Login from './routes/login'
import { Layout, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import DblMenu from './components/DblMenu';

class App extends React.Component {
  constructor(props, context) {
    super(props)
    this.state = {
      collapsed: false,
      login: false 
    }
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  onOk(){
    this.setState({
      login: true 
    })
  }

  render() {
    return (this.state.login?
      <Layout id="components-layout-demo-custom-trigger">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <DblMenu className="menu"/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>:<Login onOk={::this.onOk} />
    );
  }
}

export default connect(({app}) => ({app}))(App)