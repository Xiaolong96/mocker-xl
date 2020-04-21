/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { getProjectList, deleteProject } from 'services/project';
import { Project } from 'typings/project';
import { RouteComponentProps } from 'react-router-dom';
import { Icon, message, Popconfirm } from 'antd';

interface Props extends RouteComponentProps {
  setCurId: React.Dispatch<React.SetStateAction<string>>;
}
function ProjectList(props: Props) {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [curId, setCurId] = useState<string>();

  const goDetail = (id: string) => {
    props.history.push(`/project/${id}`);
  };

  const getAllProject = async () => {
    try {
      const pid = sessionStorage.getItem('curId');
      const rs = await getProjectList();
      if (rs) {
        setProjectList(rs);
        setCurId(pid || rs[0].projectId);
        props.setCurId(pid || rs[0].projectId);
      }
    } catch (error) {
      console.log(error);
      setProjectList([]);
    }
  };

  const delProj = async (projectId: string) => {
    if (!projectId) return;
    try {
      const param = {
        projectId,
      };
      const rs = await deleteProject(param);
      if (rs) {
        sessionStorage.setItem('curId', '');
        getAllProject();
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

  useEffect(() => {
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
            try {
              sessionStorage.setItem('curId', item.projectId);
              setCurId(item.projectId);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <h2 className={item.projectId === curId ? 'active' : ''}>
            {item.name}
          </h2>
          <span className="project-tit">项目描述</span>
          <p className="project-desc">{item.desc}</p>
          {/* <span className="project-tit">项目路径</span>
          <p className="project-url">{item.baseUrl}</p>
          <span className="project-tit">代理路径</span>
          <p className="project-proxy-url">
            {item.proxy.target || '您还没有设置哦～'}
          </p> */}
          {item.projectId === curId && (
            <Popconfirm
              title="Are you sure delete this project?"
              onConfirm={() => {
                delProj(item.projectId);
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Icon title="删除" className="delete-icon" type="delete" />
            </Popconfirm>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
