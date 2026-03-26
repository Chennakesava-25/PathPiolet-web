import React from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="main-layout" style={{
      gridTemplateColumns: isCollapsed ? '80px 1fr' : '280px 1fr',
      transition: 'grid-template-columns 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className="content-area">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
