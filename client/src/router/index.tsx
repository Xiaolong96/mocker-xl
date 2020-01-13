import React, { lazy, Suspense } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';

// 项目列表页
const ProjectListCom = lazy(() =>
  import('views/project/project-list/ProjectList')
);
const ProjectList = (props: RouteComponentProps) => {
  return (
    <Suspense fallback={null}>
      <ProjectListCom {...props} />
    </Suspense>
  );
};

// 项目创建页
const ProjectCreateCom = lazy(() =>
  import('views/project/project-create/ProjectCreate')
);
const ProjectCreate = (props: RouteComponentProps) => {
  return (
    <Suspense fallback={null}>
      <ProjectCreateCom {...props} />
    </Suspense>
  );
};

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    key: 'ProjectList',
    component: ProjectList,
  },
  {
    path: '/project/create',
    exact: true,
    key: 'ProjectCreate',
    component: ProjectCreate,
  },
];

export default routes;
