import React, { Fragment, useEffect, useState } from 'react';
import { Container, } from 'semantic-ui-react'
import axios from "axios";
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';



const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] =  useState(false);

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.filter(activity => activity.id === id)[0])
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true)
  }

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([activity, ...activities]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([activity, ...activities.filter(a => a.id !== activity.id)]);
    setSelectedActivity(activity);
    setEditMode(false);
    
  }
  const handleDeleteActivity = (id: string) => {
    setActivities([ ...activities.filter(activity => activity.id !== id)]);

  }

  useEffect(()=>{
    axios.get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response)=> {
        let activities: IActivity[] = [];
        response.data.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity)
        });
        setActivities(activities)
      })
      
  },[])


  return (
    <Fragment >
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{marginTop: "7em"}}>
        <ActivityDashboard activities={activities} selectActivity={handleSelectedActivity} setSelectedActivity={setSelectedActivity} activity={selectedActivity!} setEditMode={setEditMode} editMode={editMode} handleCreateActivity={handleCreateActivity} handleEditActivity={handleEditActivity} handleDeleteActivity={handleDeleteActivity}  />
      </Container>

    </Fragment>
  );
}

export default App;
