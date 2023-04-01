import React from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface IProps{
    activities: IActivity[];
    selectActivity: (id: string) => void;
    setSelectedActivity: (activity: IActivity | null)=> void;
    activity: IActivity;
    editMode: boolean;
    setEditMode: (editMode: boolean)=> void;
    handleCreateActivity: (activity: IActivity)=> void;
    handleEditActivity: (activity: IActivity)=> void;
    handleDeleteActivity:(id: string) => void;
}

const ActivityDashboard: React.FC<IProps> = ({activities, selectActivity, activity, editMode, setEditMode, setSelectedActivity, handleCreateActivity, handleEditActivity, handleDeleteActivity}) => {
  return (
    <Grid>
        <GridColumn width={10}>
            <ActivityList activities={activities} selectActivity={selectActivity} handleDeleteActivity={handleDeleteActivity} />
        </GridColumn>
        <GridColumn width={6}>
          {activity && !editMode && <ActivityDetails activity={activity} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity}  />}
          {editMode &&  <ActivityForm key={activity && activity.id || 0} setEditMode={setEditMode} activity={activity} handleEditActivity={handleEditActivity} handleCreateActivity={handleCreateActivity}  />}  
        </GridColumn>
    </Grid>
  )
}

export default ActivityDashboard
