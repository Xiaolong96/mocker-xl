import React from 'react';
import Spots from 'components/spots';
import { Icon } from 'antd';
import './index.less';

function ProjectList(props: any) {
  return (
    <div className="project-list">
      <div className="project-list-header">
        <Spots />
        <div className="header-info">
          <h2>我的项目</h2>
          <p>所有创建的项目将在这里展示</p>
        </div>
      </div>
      <div className="project-list-item-wrap">
        <div className="project-list-item" />
      </div>
      <div className="add">
        <Icon type="plus" />
      </div>
    </div>
  );
}

export default ProjectList;
