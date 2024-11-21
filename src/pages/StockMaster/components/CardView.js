import React from 'react';
import { Card, Label, Icon } from 'semantic-ui-react';

export default function CardView() {
  return (
    <div>
      <Card centered>
        <Card.Content>
          <Card.Header>
            <Label color="blue" basic attached="top right">
              損益:123
            </Label>
          </Card.Header>
          <Card.Meta></Card.Meta>
          <Card.Description></Card.Description>
          <Card.Description>長榮</Card.Description>
        </Card.Content>
        <Card.Content extra>
          現價:789
          <Icon name="ellipsis horizontal" />
          <Label basic color="teal">
            平衡價:20
          </Label>
        </Card.Content>
        <Card.Content extra>
          <Card.Description>餘股:10</Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
