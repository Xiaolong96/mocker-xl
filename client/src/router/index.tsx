/* eslint-disable import/no-unresolved */
import React, { lazy, Suspense } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';

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

// 项目主页
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

// 接口编辑页
const ApiEditCom = lazy(() => import('views/api/api-edit/ApiEdit'));
const ApiEdit = (props: RouteComponentProps) => {
  return (
    <Suspense fallback={null}>
      <ApiEditCom {...props} />
    </Suspense>
  );
};

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    key: 'ProjectDetail',
    component: ProjectDetail,
  },
  {
    path: '/project/create',
    exact: true,
    key: 'ProjectCreate',
    component: ProjectCreate,
  },
  // {
  //   path: '/project/:id',
  //   exact: true,
  //   key: 'ProjectDetail',
  //   component: ProjectDetail,
  // },
  {
    path: '/api/create',
    exact: true,
    key: 'ApiCreate',
    component: ApiCreate,
  },
  {
    path: '/api/edit/:apiId',
    exact: true,
    key: 'ApiEdit',
    component: ApiEdit,
  },
];

export default routes;
