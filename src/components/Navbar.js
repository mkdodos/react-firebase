import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  // 取得 user 值
  let user=localStorage.getItem('user');
  if(user){
    user = JSON.parse(user);
  }
  

  console.log(user);
  const navigate = useNavigate();

  // 登出
  function handleLogout() {
    try {
      localStorage.setItem('user', '');
      navigate('/login');
    } catch {
      // setError("Failed to log out")
    }
  }

  return (
    <div>
      <Menu color="blue" widths={6} pointing secondary>
        <Menu.Item as={Link} to="/maya">
          Maya
        </Menu.Item>
        <Menu.Item as={Link} to="/stock">
          Stock
        </Menu.Item>
        {user && (
          <Menu.Item onClick={handleLogout}>            
            <Icon name="sign-out" />
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
}
