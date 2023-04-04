import React,{ FormEvent, useContext, useEffect, useState} from 'react'
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import {v4 as uuid} from "uuid";
import  ActivityStore  from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate, Link } from "react-router-dom";



const ActivityForm: React.FC = () => {
  const { id } = useParams();
  const navigate =  useNavigate();
  const activityStore = useContext(ActivityStore);
  const {activity: initialActivity,createActivity, editActivity, submitting, loadActivity, clearActivity} = activityStore;

 
    const [activity, setActivity] = useState<IActivity>({
      id: "",
      title: "",
      description: "",
      category: "",
      date: "",
      city: "",
      venue: "",
  });

  useEffect(()=>{
    if(id && activity.id.length === 0){
      loadActivity(id).then(() => initialActivity && setActivity(initialActivity));
    }
    return () => {
      clearActivity();
    }
  }, [initialActivity, id, loadActivity, clearActivity, activity.id.length])


    const handleActivityChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {name, value} = event.currentTarget;
      setActivity({...activity, [name]: value})
    }

    const handleSubmit = () => {
      if(activity.id.length === 0){
          let newActivity = {
            ...activity, 
            id: uuid()
          }
          createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
      }
      else{
        editActivity(activity).then(() => navigate(`/activities/${activity.id}`))
      }
    }

  return (
    <Segment clearing>
        <Form onSubmit={handleSubmit}>
            <Form.Input value={activity.title} onChange={handleActivityChange} name="title" placeholder="Title"  />
            <Form.TextArea rows={2} value={activity.description} onChange={handleActivityChange} name="description" placeholder="Description" />
            <Form.Input value={activity.category} onChange={handleActivityChange} name="category" placeholder="Category" />
            <Form.Input value={activity.date } onChange={handleActivityChange} name="date" type='date' placeholder="Date" />
            <Form.Input value={activity.city} onChange={handleActivityChange} name="city" placeholder="City" />
            <Form.Input value={activity.venue} onChange={handleActivityChange} name="venue" placeholder="Venue" />
            <Button loading={submitting} floated="right" positive type='submit' content="Submit" />
            <Button as={Link} to="/activities" floated="right" type='button' content="Cancel" />
        </Form>
    </Segment>
  )
}

export default observer(ActivityForm);
