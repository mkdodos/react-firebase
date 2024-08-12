import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Grid, Divider } from 'semantic-ui-react';
import { auth } from '../../utils/firebase';


export default function index() {
  const email = React.useRef();
  const password = React.useRef();
  const navigate = useNavigate();
  // 登入
  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email.current.value, password.current.value)
      .then((userCredential) => {
        localStorage.setItem('user',JSON.stringify({email:userCredential.user.email,login:true}));
        navigate('/stock');
      });
  };
  return (
    <>
      <br />
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={4}></Grid.Column>
          <Grid.Column width={8}>
            <Card>
              <Card.Content textAlign="center" header="登入頁面" />
              <Card.Content>
                <Form size="large" onSubmit={handleLogin}>
                  <Form.Field>
                    <label>Email</label>
                    <input ref={email} defaultValue="mkdodos@gmail.com"></input>
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input
                      type="password"
                      ref={password}
                      defaultValue="123456"
                    ></input>
                  </Form.Field>
                  <Button fluid type="submit" size="large" color="blue">
                    登入
                  </Button>
                </Form>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
