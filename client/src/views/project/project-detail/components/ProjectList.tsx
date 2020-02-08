/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { getProjectList } from 'services/project';
import { Project } from 'typings/project';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  setCurId: React.Dispatch<React.SetStateAction<string>>;
}
function ProjectList(props: Props) {
  const [projectList, setProjectList] = useState<Project[]>([]);

  const goDetail = (id: string) => {
    props.history.push(`/project/${id}`);
  };

  useEffect(() => {
    const getAllProject = async () => {
      try {
        const rs = await getProjectList();
        if (rs) {
          setProjectList(rs);
          props.setCurId(rs[0].projectId);
        }
      } catch (error) {
        console.log(error);
        setProjectList([]);
      }
    };
    getAllProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="project-list">
      {projectList.map((item: Project) => (
        <div
          key={item.name}
          className="project-list-item"
          onClick={() => {
            props.setCurId(item.projectId);
          }}
        >
          <h2>{item.name}</h2>
          <span className="project-tit">项目描述</span>
          <p className="project-desc">{item.desc}</p>
          {/* <span className="project-tit">项目路径</span>
          <p className="project-url">{item.baseUrl}</p>
          <span className="project-tit">代理路径</span>
          <p className="project-proxy-url">
            {item.proxy.target || '您还没有设置哦～'}
          </p> */}
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
