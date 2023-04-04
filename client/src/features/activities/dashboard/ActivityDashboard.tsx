import React, {  useContext } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import  ActivityStore  from '../../../app/stores/activityStore';


const ActivityDashboard: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const { selectedActivity: activity, editMode} = activityStore;
  return (
    <Grid>
        <GridColumn width={10}>
            <ActivityList  />
        </GridColumn>
        <GridColumn width={6}>
          {activity && !editMode && <ActivityDetails  />}
          {editMode &&  <ActivityForm
           key={activity && activity.id || 0} activity={activity} />
          }  
        </GridColumn>
    </Grid>
  )
}

export default observer(ActivityDashboard)
