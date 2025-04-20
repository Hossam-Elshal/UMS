import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { NavLink, useNavigate } from 'react-router-dom';
import profileImg from '../../assets/images/profile.jpeg';
import { useContext } from 'react';
import { AuthContext } from '../../assets/context/AuthContext';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaHome, FaUsers } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { IoMdPersonAdd } from 'react-icons/io';
import { CiLogout } from 'react-icons/ci';

export default function SideBar({ isCollapsed, setIsCollapsed }) {
  const { UserData, setUserData } = useContext(AuthContext);
  const navigate = useNavigate()

  //log out ********
  const handleLogOut = () => {
    setUserData(null)
    navigate("/")
  }


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className='sidebarContainer vh-100 position-relative'>
      <Sidebar collapsed={isCollapsed} className='position-relative'>
        <Menu>
          <div onClick={toggleCollapse} className="my-2 mx-2 position-absolute end-0 top-0" style={{ cursor: 'pointer' }}>
            {isCollapsed ? <FaArrowAltCircleRight size={26} /> : <FaArrowAltCircleLeft size={26} />}
          </div>

          <div className={`text-center my-5 ${isCollapsed ? 'invisible' : ''}`}>
            <img className='profileImg rounded-circle my-3' src={UserData?.image || profileImg} alt="profile" />
            <h4>{UserData?.firstName} {UserData?.lastName}</h4>
            <h6 className='text-warning'>Admin</h6>
          </div>


          <MenuItem
              icon={<FaHome size={24} />}
              component={
                <NavLink 
                  to="/dashboard/home" 
                  style={({ isActive }) => ({
                    background: isActive ? '#ffa200ac' : 'transparent',
                    borderRadius: '24px',
                    textDecoration: 'none',
                    transition: '0.3s ease',
                  })}
                />
              }
            >
              Home
      </MenuItem>

      <MenuItem
              icon={<FaUsers size={24} />}
              component={
                <NavLink 
                  to="/dashboard/users" 
                  style={({ isActive }) => ({
                    background: isActive ? '#ffa200ac' : 'transparent',
                    textDecoration: 'none',
                    transition: '0.3s ease',
                    borderRadius: '24px',
                  })}
                />
              }
            >
              Users
      </MenuItem>

      <MenuItem
              icon={<IoMdPersonAdd size={24} />}
              component={
                <NavLink 
                  to="/dashboard/userData" 
                  style={({ isActive }) => ({
                    background: isActive ? '#ffa200ac' : 'transparent',
                    textDecoration: 'none',
                    transition: '0.3s ease',
                    borderRadius: '24px',
                  })}
                />
              }
            >
              Add User
      </MenuItem>

      <MenuItem
              icon={<CgProfile size={24} />}
              component={
                <NavLink 
                  to="/dashboard/profile" 
                  style={({ isActive }) => ({
                    background: isActive ? '#ffa200ac' : 'transparent',
                    textDecoration: 'none',
                    transition: '0.3s ease',
                    borderRadius: '24px',
                  })}
                />
              }
            >
              Profile
      </MenuItem>

      <MenuItem
              className='text-danger mt-5'
              icon={<CiLogout size={24}/>}
              // onClick={handleLogOut}
              component={
                <NavLink 
                  to="/" 
                  style={({ isActive }) => ({
                    background: isActive ? '#ffa200ac' : 'transparent',
                    textDecoration: 'none',
                    transition: '0.3s ease',
                    borderRadius: '24px',
                  })}
                />
              }
            >
              Log out
      </MenuItem>


        </Menu>
      </Sidebar>
    </div>
  );
}
