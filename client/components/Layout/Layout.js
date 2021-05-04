import cn from 'classnames';

function Layout({ className, children }) {
  return (
    <div className={cn(className, 'layout')}>
      <div className="layout__bar container">
        ~Magic Music Library~
      </div>
      <div className="layout__content container">
        {children}
      </div>
    </div>
  );
}

export default Layout;
