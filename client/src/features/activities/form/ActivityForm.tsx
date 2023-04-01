import React,{ FormEvent, useState} from 'react'
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import {v4 as uuid} from "uuid";

interface IProps{
  setEditMode: (editMode: boolean) => void;
  activity: IActivity,
  handleCreateActivity: (activity: IActivity)=> void;
  handleEditActivity: (activity: IActivity)=> void;
}

const ActivityForm: React.FC<IProps> = ({setEditMode, activity: initialActivity, handleCreateActivity, handleEditActivity}) => {

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
          handleCreateActivity(newActivity)
      }
      else{
        handleEditActivity(activity)
      }
    }

  return (
    <Segment clearing>
        <Form>
            <Form.Input value={activity.title} onChange={handleActivityChange} name="title" placeholder="Title"  />
            <Form.TextArea rows={2} value={activity.description} onChange={handleActivityChange} name="description" placeholder="Description" />
            <Form.Input value={activity.category} onChange={handleActivityChange} name="category" placeholder="Category" />
            <Form.Input value={activity.date } onChange={handleActivityChange} name="date" type='date' placeholder="Date" />
            <Form.Input value={activity.city} onChange={handleActivityChange} name="city" placeholder="City" />
            <Form.Input value={activity.venue} onChange={handleActivityChange} name="venue" placeholder="Venue" />
            <Button onClick={handleSubmit} floated="right" positive type='submit' content="Submit" />
            <Button onClick={()=> setEditMode(false)} floated="right" type='button' content="Cancel" />
        </Form>
    </Segment>
  )
}

export default ActivityForm
