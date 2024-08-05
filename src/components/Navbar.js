import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <div>
      <Menu color="blue" widths={6} pointing secondary>
        <Menu.Item as={Link} to="/maya">
          Maya
        </Menu.Item>
        <Menu.Item as={Link} to="/stock">
          Stock
        </Menu.Item>
      </Menu>
    </div>
  );
}
