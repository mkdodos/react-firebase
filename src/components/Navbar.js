import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  // 取得 user 值
  // let user=localStorage.getItem('user');
  // if(user){
  //   user = JSON.parse(user);
  // }

  // console.log(user);
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
    <>
      <Menu color="blue" widths={3} pointing secondary>
        <Menu.Item as={Link} to="/asset2025">
          asset2025
        </Menu.Item>
        {/* <Menu.Item as={Link} to="/maya">
          Maya
        </Menu.Item> */}
        {/* <Menu.Item as={Link} to="/stock">
          Stock
        </Menu.Item> */}
        <Menu.Item as={Link} to="/stock2025">
          Stock2025
        </Menu.Item>
        {/* <Menu.Item as={Link} to="/demo">
          Demo
        </Menu.Item> */}

        <Dropdown text="Demo" item>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/stock-money">
              StockMoney
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/stock-basic">
              StockBasic
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/stock-master">
              StockMaster
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/stock-detail">
              StockDetail
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/demo-master">
              DemoMaster
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/demo-detail">
              DemoDetail
            </Dropdown.Item>

            <Dropdown.Item as={Link} to="/demo">
              Demo
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/demo1">
              Demo1
            </Dropdown.Item>

            <Dropdown.Item as={Link} to="/demo4">
              Demo4
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/demo5">
              Demo5
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* {user && (
          <Menu.Item onClick={handleLogout}>            
            <Icon name="sign-out" />
          </Menu.Item>
        )} */}
      </Menu>
    </>
  );
}
