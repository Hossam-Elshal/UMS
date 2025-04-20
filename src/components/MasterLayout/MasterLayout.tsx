
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import SideBar from '../Sidebar/SideBar';
import { useState } from 'react';

export default function MasterLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidth = isCollapsed ? 80 : 250;

  return (
    <div className='masterContainer'>
      <div className="fixed-sidebar" style={{ width: sidebarWidth }}>
        <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>


      <div className="page-content" style={{ marginLeft: sidebarWidth }}>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}