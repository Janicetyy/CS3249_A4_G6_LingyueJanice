import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
//import { TSDCollection } from '/imports/api/TimeSeriesDataCollection';

export const App = () => {
  //const tsds = useTracker(() => TSDCollection.find({}).fetch());
 
  return (
    <div>
      <h1>Welcome to Meteor!</h1>

    </div>
  );
};