/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Button, Tag, Table, message } from 'antd';
import Spots from 'components/spots';
import { getProjectList, queryProject } from 'services/project';
import { Project } from 'typings/project';
import './index.less';
import { ColumnProps } from 'antd/lib/table';
import { Api } from 'typings/api';
import config from '../../../config/index';

interface TableApi {
  name: string;
  method: string;
  url: string;
  delay: number;
  desc: string;
  key: number;
}

function ProjectDetail(props: any) {
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
      proxyUrl: '',
    },
    baseUrl: '',
    desc: '',
    name: '',
    apis: [],
    createTime: '',
    modifiedTime: '',
  };
  const [project, setProject] = useState<Project>(initProject);

  const query = useCallback(async () => {
    try {
      const param = {
        projectId: props.match.params.id,
      };
      const rs = await queryProject(param);
      if (rs) {
        setProject(rs);
      }
    } catch (error) {
      console.log(error);
    }
  }, [props]);

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
          <Icon title="编辑" className="opera-btn" type="edit" />
          <Icon title="删除" className="opera-btn" type="delete" />
        </>
      ),
    },
  ];

  const data: TableApi[] = project.apis.map((item: Api, idx: number) => {
    return {
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
    props.history.push(`/api/create?project=${props.match.params.id}`);
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

  return (
    <div className="project-detail">
      <div ref={headRef} className="project-detail-header">
        <Spots />
        <div className="header-info">
          <h2>{project.name}</h2>
          <p>{project.desc}</p>
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
          <p className="tag">
            <span>代理地址</span>
            {project.proxy.proxyUrl || '您还没有设置哦～'}
          </p>
          <div className="opera">
            <Button type="primary" icon="plus" onClick={goCreate}>
              创建接口
            </Button>
          </div>
        </div>

        <div className="api-list">
          <Table<TableApi>
            size="middle"
            columns={columns}
            expandedRowRender={record => (
              <p style={{ margin: 0 }}>{record.desc}</p>
            )}
            dataSource={data}
          />
        </div>
      </div>

      <Link to="/project/create">
        <div className="add">
          <Icon type="plus" />
        </div>
      </Link>
    </div>
  );
}

export default ProjectDetail;
