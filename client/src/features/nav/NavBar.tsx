import React, { useContext } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import  ActivityStore  from '../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';



const NavBar : React.FC = () => {
  const activityStore =  useContext(ActivityStore);

  return (
    <Menu fixed='top' inverted>
        <Container>
             <Menu.Item> Reactivities</Menu.Item>
             <Menu.Item name='messages'  />
             <Menu.Item ><Button onClick={activityStore.openCreateForm} positive content="Create Activity" /></Menu.Item>
        </Container>
  </Menu>
  )
}

export default observer(NavBar);
