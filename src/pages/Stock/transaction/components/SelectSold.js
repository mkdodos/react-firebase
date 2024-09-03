import React from 'react';
import { Menu } from 'semantic-ui-react';

export default function SelectSold({isSold,handleItemClick}) {
  return (
    <div>
      <Menu fluid widths={2} pointing secondary>
        <Menu.Item
          color="teal"
          name="income"
          
          active={!isSold}
          onClick={handleItemClick}
        >
          買進
        </Menu.Item>
        <Menu.Item
          color="orange"
          name="expense"
          active={isSold}
          onClick={handleItemClick}
        >
          賣出
        </Menu.Item>
      </Menu>
    </div>
  );
}
