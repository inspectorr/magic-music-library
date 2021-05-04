import cn from 'classnames';

function Layout({ className, children, control = null }) {
  return (
    <div className={cn(className, 'layout')}>
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
