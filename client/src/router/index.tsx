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

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    key: 'ProjectList',
    component: ProjectList,
  },
];

export default routes;
