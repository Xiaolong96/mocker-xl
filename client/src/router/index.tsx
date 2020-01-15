/* eslint-disable import/no-unresolved */
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

// 项目创建页
const ProjectDetailCom = lazy(() =>
  import('views/project/project-detail/ProjectDetail')
);
const ProjectDetail = (props: RouteComponentProps) => {
  return (
    <Suspense fallback={null}>
      <ProjectDetailCom {...props} />
    </Suspense>
  );
};

// 接口创建页
const ApiCreateCom = lazy(() => import('views/api/api-create/ApiCreate'));
const ApiCreate = (props: RouteComponentProps) => {
  return (
    <Suspense fallback={null}>
      <ApiCreateCom {...props} />
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
  {
    path: '/project/:id',
    exact: true,
    key: 'ProjectDetail',
    component: ProjectDetail,
  },
  {
    path: '/api/create',
    exact: true,
    key: 'ApiCreate',
    component: ApiCreate,
  },
];

export default routes;
