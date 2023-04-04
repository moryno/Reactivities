import React,{ FormEvent, useContext, useState} from 'react'
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import {v4 as uuid} from "uuid";
import  ActivityStore  from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';

interface IProps{

  activity: IActivity | undefined,

}

const ActivityForm: React.FC<IProps> = ({ activity: initialActivity}) => {
  const activityStore = useContext(ActivityStore);
  const {createActivity, editActivity, cancleFormOpen, submitting} = activityStore;

  const initializeForm = () => {
    if(initialActivity){
      return initialActivity
    }
    else{
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: "",
    }
      }
    }
  
    const [activity, setActivity] = useState<IActivity>(initializeForm);

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
          createActivity(newActivity)
      }
      else{
        editActivity(activity)
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
            <Button onClick={cancleFormOpen} floated="right" type='button' content="Cancel" />
        </Form>
    </Segment>
  )
}

export default observer( ActivityForm);
