import { observable, action, makeObservable, computed, configure, runInAction } from "mobx";
import { SyntheticEvent, createContext } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

configure({enforceActions: "always"});

export class ActivityStore {
  @observable activityRegistry = new Map();
  @observable loadingInitial = false;
  @observable activity: IActivity | null = null;
  @observable submitting = false;
  @observable target = '';

  constructor() {
    makeObservable(this);
  }

  @computed get acivitiesBydate(){
    return Array.from(this.activityRegistry.values()).slice().sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list()
      runInAction(()=>{
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id, activity);
      
        });
        this.loadingInitial = false;
      })
        
    } 
    catch (error) {
      runInAction(()=>{
        this.loadingInitial = false;
      })
      console.log(error);
 
    }

  }

  @action loadActivity = async (id: string | undefined) =>{
    let activity  = this.getActivity(id);

    if(activity){
      this.activity = activity;
    }
    else{
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        this.activity = activity;
      } catch (error) {
        this.loadingInitial = false;
        throw error;
      }
    }
  }

  getActivity = (id: string | undefined) => {
    return this.activityRegistry.get(id);
  }

  @action clearActivity = () => {
    this.activity = null
  }

  @action selectActivity =  (id: string) => {
    this.activity = this.activityRegistry.get(id);
  }


  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;

     try {
      await agent.Activities.create(activity);
      this.activityRegistry.set(activity.id, activity);

      this.submitting = false;

     } catch (error) {
      console.log(error);
      this.submitting = false;
     }
  }

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      agent.Activities.update(activity);
      this.activityRegistry.set(activity.id, activity);
      this.activity = activity;

      this.submitting = false;
      
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  }

  @action deleteActivity = async(event: SyntheticEvent<HTMLButtonElement>,id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      this.activityRegistry.delete(id);
      this.submitting = false;
      this.target = '';
    } catch (error) {
      this.submitting = false;
      this.target = '';
      console.log(error);
    }
  }
}

export default createContext(new ActivityStore());