import React, { ReactNode, useState, useEffect } from 'react';
import './index.less';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

const { Header, Content } = Layout;

interface Props {
  children?: ReactNode;
}

function MainLayout(props: Props) {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  useEffect(() => {
    setSelectedKeys([location.pathname.split('/')[1]]);
  }, [location]);
  return (
    <Layout className="layout">
      <Header className="header">
        <Link to="/">
          <div className="logo">Mocker Xl</div>
        </Link>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={selectedKeys}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="dashboard">
            <Link to="/dashboard">
              <Icon type="home" />
              我的项目
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="2">日志</Menu.Item> */}
          <Menu.Item key="helpdoc">
            <Link to="/helpdoc">
              <Icon type="book" />
              使用帮助
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="content">{props.children}</Content>
    </Layout>
  );
}

export default MainLayout;
