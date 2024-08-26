import React from 'react';
import { Divider, Button,Header } from 'semantic-ui-react';

export default function MoreButton({handleMoreData}) {
  return (
    <div>
      <Divider horizontal>
        <Header>
          <Button primary onClick={handleMoreData}>
            載入更多
          </Button>
        </Header>
      </Divider>
    </div>
  );
}
