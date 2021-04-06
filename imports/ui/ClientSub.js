import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TSDCollection } from '/imports/db/TimeSeriesDataCollection';

export const TSGSub = (startDate,endDate,roomId) => {
		
		const {isLoading} = useTracker(() => {
		
			const handler = Meteor.subscribe('tsd.duo',  {			
				RoomId: roomId, 
				startDate: startDate, 
				endDate: endDate,
			});
			
			if(!handler.ready()) {
				return {isLoading: true};
			} else {
				return {isLoading:false};
			}
		});
		
		const handlerAll = Meteor.subscribe('tsd.all');
		if (handlerAll.ready()) {
			handler.unsubscribe();
			handler.stop();
			return {isLoading:false};
		}
		//return null;
		return  {isLoading};
}