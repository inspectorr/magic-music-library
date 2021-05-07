import cn from 'classnames';
import React from 'react';
import Head from 'next/head';

function Layout({ className, children, control = null }) {
  return (
    <div className={cn(className, 'layout')}>
      <Head>
        <title>MMLib</title>
      </Head>
      
      <div className="layout__bar container">
        <div className="layout__bar-title">~Magic Music Library~</div>
        <div className="layout__bar-control">{control}</div>
      </div>
      <div className="layout__content container">
        {children}
      </div>
    </div>
  );
}

export default Layout;
