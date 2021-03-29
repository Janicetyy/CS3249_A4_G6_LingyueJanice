import { Meteor } from 'meteor/meteor';
import { TSDCollection } from '/imports/api/TimeSeriesDataCollection';

async function insertTSDP (data) {
	console.log(data.length, "test double entry");
	for (i=0; i < data.length; i++) {
		tmpTime=new Date(data[i].timestamp);
		tmpDate=new Date(tmpTime.getFullYear(), tmpTime.getMonth(), tmpTime.getDate());
		tmpHour=tmpTime.getHours();
		tmpMin=tmpTime.getMinutes();
		if (TSDCollection.find({RoomId : data[i].RoomId, date: tmpDate, 
				"Datapoint.hour": tmpHour}).count() != 0) {
			TSDCollection.update({ 
				RoomId : data[i].RoomId,
				date: tmpDate,
				"Datapoint.hour": tmpHour
			}, 
			{$addToSet: 
				{"Datapoint.$.more": 
					{
						"min": tmpMin,
						"temperature": data[i].temperature
					}
				}
			})
		} 
		else if (TSDCollection.find({RoomId : data[i].RoomId, date: tmpDate}).count() != 0) {
			TSDCollection.update({ 
				RoomId : data[i].RoomId,
				date: tmpDate,
			}, 
			{$addToSet: 
				{Datapoint: {hour:tmpHour, more:[{min:tmpMin, temperature:data[i].temperature}]}}
			})
		}
		else {
			TSDCollection.insert({
				RoomId: data[i].RoomId, 
				date: tmpDate,
				Datapoint: [{hour:tmpHour, more:[{min:tmpMin, temperature:data[i].temperature}]}]
			});
		}
	};
	
}

function parseCSV () {
	var csv = Assets.getText('room-temperatures.csv');
	var secondIteration = false;
	var rows = Papa.parse(csv, {
		header:true,
		skipEmptyLines:true,
		complete: function(results) {
			if (secondIteration) { return; }
			else { 
				secondIteration = true;
				insertTSDP(results.data);
			}
		}
	});
}
	

Meteor.startup(() => {
	if (TSDCollection.find().count() === 0) {
		parseCSV();
	}
});

