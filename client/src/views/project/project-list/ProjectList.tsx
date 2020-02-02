/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import Spots from 'components/spots';
import { getProjectList } from 'services/project';
import { Project } from 'typings/project';
import './index.less';

function ProjectList(props: any) {
  const headRef = useRef<HTMLDivElement>(null);

  const [projectList, setProjectList] = useState<Project[]>([]);

  const getAllProject = async () => {
    try {
      const rs = await getProjectList();
      if (rs) {
        setProjectList(rs);
      }
    } catch (error) {
      console.log(error);
      setProjectList([]);
    }
  };

  const goDetail = (id: string) => {
    props.history.push(`/project/${id}`);
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

  useEffect(() => {
    getAllProject();
    (document.getElementsByClassName('App')[0] as HTMLElement).addEventListener(
      'scroll',
      handleScroll
    );
    return () => {
      (document.getElementsByClassName(
        'App'
      )[0] as HTMLElement).removeEventListener('scroll', handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   console.log(myRef.current);
  //   if (myRef.current) {
  //     setTimeout(() => {
  //       myRef.current &&
  //         ((myRef.current as HTMLDivElement).style.paddingTop = '0px');
  //     }, 1000);
  //   }
  // }, [myRef]);

  return (
    <div className="project-list">
      <div ref={headRef} className="project-list-header">
        <Spots />
        <div className="header-info">
          <h2>我的项目</h2>
          <p>所有创建的项目将在这里展示</p>
        </div>
      </div>
      <div className="project-list-item-wrap">
        {projectList.map((item: Project) => (
          <div
            key={item.name}
            className="project-list-item"
            onClick={() => {
              goDetail(item.projectId);
            }}
          >
            <h2>{item.name}</h2>
            <span className="project-tit">项目描述</span>
            <p className="project-desc">{item.desc}</p>
            <span className="project-tit">项目路径</span>
            <p className="project-url">{item.baseUrl}</p>
            <span className="project-tit">代理路径</span>
            <p className="project-proxy-url">
              {item.proxy.target || '您还没有设置哦～'}
            </p>
          </div>
        ))}
      </div>
      <Link to="/project/create">
        <div className="add">
          <Icon type="plus" />
        </div>
      </Link>
    </div>
  );
}

export default ProjectList;
