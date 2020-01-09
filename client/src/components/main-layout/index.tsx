import React, { ReactNode } from 'react';
import './index.less';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

interface Props {
  children?: ReactNode;
}

function MainLayout(props: Props) {
  return (
    <Layout className="layout">
      <Header className="header">
        <Link to="/">
          <div className="logo">Mocker Xl</div>
        </Link>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">我的项目</Menu.Item>
          <Menu.Item key="2">日志</Menu.Item>
          <Menu.Item key="3">关于</Menu.Item>
        </Menu>
      </Header>
      <Content className="content">{props.children}</Content>
    </Layout>
  );
}

export default MainLayout;
