import React, { useContext, useEffect } from 'react';
import { Button, Card,Image } from 'semantic-ui-react';
import  ActivityStore  from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate, Link } from "react-router-dom"
import LoadingComponent from '../../../app/layout/LoadingComponent';

type DetailsParams = {
  id: string | undefined
}

const ActivityDetails:React.FC = () => {
  const { id } = useParams<DetailsParams>();
  const navigate = useNavigate();
  const activityStore = useContext(ActivityStore);
  const {activity, loadActivity, loadingInitial} = activityStore;

  useEffect(() => {
    loadActivity(id).catch(() => {
      navigate("/notfound");
    });
  }, [loadActivity, id, navigate])

  if(loadingInitial) return <LoadingComponent content="Loading activity..." />

  if(!activity) return <h2>Not found</h2>

  return (
    <Card fluid>
    <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{activity!.title}</Card.Header>
      <Card.Meta>
        <span>{activity!.date}</span>
      </Card.Meta>
      <Card.Description>
        {activity!.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
        <Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit' />
        <Button onClick={()=> navigate("/activities")} basic color='grey' content='Cancel' />
      </Button.Group>
    </Card.Content>
  </Card>
  )
}

export default observer(ActivityDetails);
