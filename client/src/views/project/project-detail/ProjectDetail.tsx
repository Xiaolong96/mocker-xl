/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import {
  Icon,
  Button,
  Tag,
  Table,
  message,
  Switch,
  Descriptions,
  Drawer,
  Form,
  Row,
  Col,
  Input,
  Collapse,
  Popconfirm,
} from 'antd';
import Spots from 'components/spots';
import { queryProject, updateProject } from 'services/project';
import { Project } from 'typings/project';
import './index.less';
import { ColumnProps } from 'antd/lib/table';
import { Api } from 'typings/api';
import { FormComponentProps } from 'antd/lib/form';
import { deleteApi } from 'services/api';
import config from '../../../config/index';
import ProjectList from './components/ProjectList';

const { Panel } = Collapse;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  // paddingRight: 24,
  border: 0,
  width: '940px',
  overflow: 'hidden',
};

interface TableApi {
  id: string;
  name: string;
  method: string;
  url: string;
  delay: number;
  desc: string;
  key: number;
}

interface FormProps extends FormComponentProps {
  [propName: string]: any; // 要传进来的属性
}

function ProjectDetail(props: any) {
  const history = useHistory();
  const headRef = useRef<HTMLDivElement>(null);

  const methodColor = {
    get: '#87d068',
    post: '#2db7f5',
    put: '#108ee9',
    delete: '#f50',
    patch: '#722ed1',
  };

  const initProject: Project = {
    projectId: '',
    proxy: {
      target: '',
    },
    baseUrl: '',
    desc: '',
    name: '',
    apis: [],
    createTime: '',
    modifiedTime: '',
  };
  const [curId, setCurId] = useState<string>('');
  const [project, setProject] = useState<Project>(initProject);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const query = useCallback(async () => {
    if (!curId) return;
    try {
      const param = {
        projectId: curId,
      };
      const rs = await queryProject(param);
      if (rs) {
        setProject(rs);
      }
    } catch (error) {
      console.log(error);
    }
  }, [curId]);

  const delApi = async (apiId: string) => {
    if (!apiId) return;
    try {
      const param = {
        apiId,
      };
      const rs = await deleteApi(param);
      if (rs) {
        query();
        message.success('删除成功');
      }
    } catch (error) {
      console.log(error);
      message.success(`删除失败: ${error}`);
    }
  };

  // 取消删除
  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log(e);
  };

  function handleScroll() {
    const head = headRef.current as HTMLDivElement;
    const app = document.getElementsByClassName('App')[0] as HTMLElement;
    if (app.scrollTop >= 76) {
      head.style.paddingTop = '16px';
      head.style.paddingBottom = '16px';
    }
    if (app.scrollTop < 48) {
      head.style.paddingTop = '30px';
      head.style.paddingBottom = '30px';
    }
  }

  const copyUrl = (record: TableApi) => {
    console.log(record);
    const path = `${config.host}:${config.port}/mock/${project.projectId +
      project.baseUrl +
      record.url}`;
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', path);
    document.body.appendChild(input);
    input.select();
    // input.setSelectionRange(0, 9999); // 在ios下使用
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      message.success(`${path} copied! 🎉`);
    }
    document.body.removeChild(input);
  };

  // 表格

  const columns: ColumnProps<TableApi>[] = [
    {
      title: '接口名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '方法',
      dataIndex: 'method',
      key: 'method',
      align: 'center',
      ellipsis: true,
      render: (text: string) => (
        <Tag color={methodColor[text as keyof typeof methodColor]}>{text}</Tag>
      ),
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '延时',
      dataIndex: 'delay',
      key: 'delay',
      align: 'center',
      ellipsis: true,
      render: (text: number) => <span>{`${text} ms`}</span>,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      ellipsis: true,
      render: (text, record) => (
        <>
          <Icon
            title="复制接口地址"
            className="opera-btn"
            type="copy"
            onClick={() => {
              copyUrl(record);
            }}
          />
          <Icon
            title="编辑"
            className="opera-btn"
            type="edit"
            onClick={() => {
              history.push(`/api/edit/${record.id}`);
            }}
          />
          <Popconfirm
            title="Are you sure delete this api?"
            onConfirm={() => {
              delApi(record.id);
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Icon title="删除" className="opera-btn" type="delete" />
          </Popconfirm>
        </>
      ),
    },
  ];

  const data: TableApi[] = project.apis.map((item: Api, idx: number) => {
    return {
      id: item._id,
      name: item.name,
      method: item.options.method,
      url: item.url,
      delay: item.options.delay,
      desc: item.desc || '- -',
      key: idx,
    };
  });

  // 跳转接口创建页
  const goCreate = () => {
    props.history.push(`/api/create?project=${curId}`);
  };

  // 抽屉
  const showDrawer = () => {
    setDrawerVisible(true);
  };
  const onDrawerClose = () => {
    setDrawerVisible(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    props.form.validateFields(async (err: any, fieldsValue: any) => {
      if (!err) {
        console.log(fieldsValue);
        const { baseUrl, desc, name, target, cookie, status } = fieldsValue;
        const param: Partial<Project> = {
          projectId: project.projectId,
          baseUrl: `/${baseUrl}`,
          desc: desc || name,
          name,
          proxy: {
            target: target ? `http://${target}` : '',
            cookie: cookie || '',
            status: status ? 1 : 0,
          },
        };
        try {
          const rs = await updateProject(param);
          if (rs) {
            message.success('项目保存成功');
            query();
            setDrawerVisible(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  useEffect(() => {
    query();
    (document.getElementsByClassName('App')[0] as HTMLElement).addEventListener(
      'scroll',
      handleScroll
    );
    return () => {
      (document.getElementsByClassName(
        'App'
      )[0] as HTMLElement).removeEventListener('scroll', handleScroll);
    };
  }, [query]);

  const { getFieldDecorator } = props.form;

  return (
    <div className="project-container">
      <ProjectList setCurId={setCurId} {...props} />
      <div className="project-detail">
        <div ref={headRef} className="project-detail-header">
          <Spots />
          <div className="header-info">
            <h2>{project.name}</h2>
            <p>{project.desc}</p>
          </div>
          <div className="proxy-switch">
            {/* <p>代理开关</p>
          <Switch size="small" onChange={() => {}} /> */}
            <Button type="primary" icon="setting" onClick={showDrawer}>
              设置
            </Button>
          </div>
        </div>
        <div className="project-detail-content">
          <div className="baseInfo">
            <Spots />
            <p className="tag">
              <span>Mock 地址</span>
              {`${config.host}:${config.port}/mock/${project.projectId}${project.baseUrl}`}
            </p>
            <p className="tag">
              <span>Project ID</span>
              {project.projectId}
            </p>
            {/* <p className="tag">
            <span>代理地址</span>
            {project.proxy.target || '您还没有设置哦～'}
          </p> */}
            <div className="opera">
              <Button type="primary" icon="plus" onClick={goCreate}>
                创建接口
              </Button>
            </div>
          </div>

          <div className="proxy-info">
            <Descriptions title="代理信息" column={2}>
              <Descriptions.Item label="target">
                {project.proxy.target || '您还没有设置哦～'}
              </Descriptions.Item>
              <Descriptions.Item label="代理状态">
                {project.proxy.status == 0 ? (
                  <Tag color="#f25252">关</Tag>
                ) : (
                  <Tag color="#00cd7e">开</Tag>
                )}
              </Descriptions.Item>
            </Descriptions>
            <p className="mb-10 ant-descriptions-item-label">cookie:</p>
            <Collapse
              bordered={false}
              // defaultActiveKey={['1']}
              expandIcon={({ isActive }) => (
                <Icon type="caret-right" rotate={isActive ? 90 : 0} />
              )}
            >
              <Panel
                header={
                  <p style={{ maxWidth: '100%' }} className="ellipsis">
                    {project.proxy.cookie || '--'}
                  </p>
                }
                key="1"
                style={customPanelStyle}
              >
                <span className="cookie">{project.proxy.cookie || '--'}</span>
              </Panel>
            </Collapse>
          </div>

          <div className="api-list">
            <Table<TableApi>
              size="middle"
              columns={columns}
              expandedRowRender={record => (
                <div>
                  <p>
                    <b className="mr-20">接口名称: </b>
                    {`${record.name}`}
                  </p>
                  <p>
                    <b className="mr-20">url: </b>
                    {`${record.url}`}
                  </p>
                  <p>
                    <b className="mr-20">描述: </b>
                    {`${record.desc}`}
                  </p>
                </div>
              )}
              dataSource={data}
            />
          </div>
          <div style={{ height: '40px' }} />
        </div>

        <Drawer
          title="项目设置"
          width={720}
          onClose={onDrawerClose}
          visible={drawerVisible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="项目名称">
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: '名称不能为空',
                      },
                      {
                        pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\-_.]{0,30}$/,
                        message:
                          '仅支持汉字、英文字母、数字、下划线(_)、连字符(-)、点(.)',
                      },
                    ],
                    initialValue: project.name,
                  })(<Input maxLength={30} placeholder="project" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="项目基础URL">
                  {getFieldDecorator('baseUrl', {
                    rules: [
                      {
                        required: true,
                        message: '基础URL不能为空',
                      },
                      {
                        pattern: /^[a-zA-Z]*$/,
                        message: '格式为大小写英文字母',
                      },
                    ],
                    initialValue: project.baseUrl.substr(1),
                  })(
                    <Input
                      addonBefore="/"
                      maxLength={30}
                      placeholder="example"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="项目描述">
                  {getFieldDecorator('desc', {
                    initialValue: project.desc,
                  })(<Input.TextArea rows={4} placeholder="请输入项目描述" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="代理状态">
                  {getFieldDecorator('status', {
                    valuePropName: 'checked',
                    initialValue: project.proxy.status == 1,
                  })(<Switch size="default" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="项目代理URL">
                  {getFieldDecorator('target', {
                    rules: [
                      {
                        pattern: /^((https?:\/\/)?(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/,
                        message: '格式不正确',
                      },
                    ],
                    initialValue: project.proxy.target.substr(7),
                  })(
                    <Input
                      addonBefore="http://"
                      maxLength={255}
                      placeholder="www.abc.com"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="cookie">
                  {getFieldDecorator('cookie', {
                    initialValue: project.proxy.cookie,
                  })(<Input.TextArea rows={5} placeholder="cookie" />)}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'center',
              }}
            >
              <Button htmlType="submit" type="primary">
                保存
              </Button>
            </Form.Item>
            {/* <div
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={onDrawerClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </div> */}
          </Form>
        </Drawer>

        <Link to="/project/create">
          <div className="add">
            <Icon type="plus" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Form.create<FormProps>({})(ProjectDetail);
