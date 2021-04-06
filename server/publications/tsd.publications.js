import { Meteor } from 'meteor/meteor';
import { TSDCollection } from '/imports/db/TimeSeriesDataCollection';

Meteor.publish('tsd.all', function() {
  return TSDCollection.find();
});

Meteor.publish('tsd.duo', function(props) {
  return TSDCollection.find({
		RoomId: { $in: props.RoomId },
		date: { $gte : props.startDate, $lte: props.endDate }
  });
});

Meteor.publish('tsd.date', function(props) {
  return TSDCollection.find({
		date: { $gte : props.startDate, $lt: props.endDate }
  });
});

Meteor.publish('tsd.room', function(props) {
  return TSDCollection.find({
		RoomId: { $in: props.RoomId },
  });
});