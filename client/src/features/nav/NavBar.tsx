import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface IProps{
  openCreateForm: ()=> void;
}

const NavBar : React.FC<IProps> = ({openCreateForm}) => {
  return (
    <Menu fixed='top' inverted>
        <Container>
             <Menu.Item> Reactivities</Menu.Item>
             <Menu.Item name='messages'  />
             <Menu.Item ><Button onClick={openCreateForm} positive content="Create Activity" /></Menu.Item>
        </Container>
  </Menu>
  )
}

export default NavBar
