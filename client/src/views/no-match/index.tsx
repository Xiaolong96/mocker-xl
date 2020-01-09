import React from 'react';
import './index.less';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

function NoMatch(props: any) {
  return (
    <div className="not-match-container">
      {/* <img src="../../static/img/noFound.png" alt="" /> */}
      <div className="not-match-content" />
      <Link to="/">
        <Button className="mt-20" type="primary">
          返回首页
        </Button>
      </Link>
    </div>
  );
}

export default NoMatch;
