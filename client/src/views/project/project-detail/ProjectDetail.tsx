/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Button, Tag, Table } from 'antd';
import Spots from 'components/spots';
import { getProjectList, queryProject } from 'services/project';
import { Project } from 'typings/project';
import './index.less';

function ProjectDetail(props: any) {
  const headRef = useRef<HTMLDivElement>(null);

  const initProject: Project = {
    projectId: '',
    proxy: {
      proxyUrl: '',
    },
    baseUrl: '',
    desc: '',
    name: '',
    createTime: '',
    modifiedTime: '',
  };
  const [project, setProject] = useState<Project>(initProject);

  const query = useCallback(async () => {
    try {
      const param = {
        projectId: props.history.location.pathname.split('/')[2],
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

  // 表格

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a>Delete</a>,
    },
  ];

  const data = [
    {
      key: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description:
        'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: 2,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      description:
        'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: 3,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      description:
        'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
  ];

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
            {`http://localhost:1988/mock/${project.projectId}${project.baseUrl}`}
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
            <Button type="primary" icon="plus">
              创建接口
            </Button>
          </div>
        </div>

        <div className="api-list">
          <Table
            size="middle"
            columns={columns}
            expandedRowRender={record => (
              <p style={{ margin: 0 }}>{record.description}</p>
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
