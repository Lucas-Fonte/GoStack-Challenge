import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Meeting from '../pages/Meeting';
import NewMeeting from '../pages/NewMeeting';
import EditMeeting from '../pages/EditMeeting';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/meeting/:meetingId" component={Meeting} isPrivate />
      <Route path="/edit/:meetingId" component={EditMeeting} isPrivate />
      <Route path="/newmeeting" component={NewMeeting} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
