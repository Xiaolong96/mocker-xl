import React from 'react';
// @ts-ignore
import iframeContent from './helpDoc.html';

function help() {
  const contentStyle: React.CSSProperties = {
    height: `${document.documentElement.clientHeight - 82}px`,
  };

  return (
    <div
      style={{
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      <iframe
        id="help-doc"
        title="help-doc"
        width="100%"
        frameBorder="0"
        height={contentStyle.height}
        srcDoc={iframeContent}
      />
    </div>
  );
}

export default help;
