import { Meteor } from 'meteor/meteor';
import { TSDCollection } from '/imports/db/TimeSeriesDataCollection';

//Use of async so that user does not have to wait for database to fully load before the client side is loaded
//may have to be careful about this because if data is retrieved before the data is ready may cause issue
//Inserting of data is handled differently based on three conditions where
// 1) Document for a particular room and day has been inserted and there is a 2d array available for the hour
// 2) Document for a particular room and day has been inserted but there is no available array for the hour
// 3) The Document for a particular room and day has not been created
async function insertTSDP (data) {
	for (i=0; i < data.length; i++) {
		tmpTime=new Date(data[i].timestamp);
		tmpDate=new Date(tmpTime.getFullYear(), tmpTime.getMonth(), tmpTime.getDate());
		tmpHour=tmpTime.getHours();
		tmpMin=tmpTime.getMinutes();
		tmpTemp=parseFloat(data[i].temperature);
		if (TSDCollection.find({RoomId : data[i].RoomId, date: tmpDate, 
				"Datapoint.hour": tmpHour}).count() != 0) {
			TSDCollection.update({ 
				RoomId : data[i].RoomId,
				date: tmpDate,
				"Datapoint.hour": tmpHour
			}, 
			{
				$addToSet: {
					"Datapoint.$.more": 
						{
							"min": tmpMin,
							"temperature": tmpTemp
						}
				},
				$inc: { count: 1, total_temp: tmpTemp }
			})
		} 
		else if (TSDCollection.find({RoomId : data[i].RoomId, date: tmpDate}).count() != 0) {
			TSDCollection.update({ 
				RoomId : data[i].RoomId,
				date: tmpDate,
			}, 
			{
				$addToSet:{ 
					Datapoint: {
						hour:tmpHour, 
						more:[{ min:tmpMin, temperature:tmpTemp }]
					}
				},
				$inc: { count: 1, total_temp: tmpTemp }
			})
		}
		else {
			TSDCollection.insert({
				RoomId: data[i].RoomId, 
				date: tmpDate,
				count: 1,
				total_temp: tmpTemp,
				Datapoint: [{hour:tmpHour, more:[{ min:tmpMin, temperature: tmpTemp }]}]
			});
		}
	};
	
}

//To convert the csv to json format for insert into collection
//Second interation variable is due to some bug in Papaparse package where complete get called two times in a row
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
	
//Only the first time starting the server will load the database, this may take some time
Meteor.startup(() => {
	parseCSV();
	/*if (TSDCollection.find().count() === 0) {
		parseCSV();
	}*/
});