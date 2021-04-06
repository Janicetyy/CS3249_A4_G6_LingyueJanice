import React from 'react';
import Plot from 'react-plotly.js';
import { TSDCollection } from '/imports/db/TimeSeriesDataCollection';

function RetrievePlotData(props) {
	
	var roomX = [];
	var roomY = [];
	var startDate = new Date(
		props.startDate.getFullYear(),
		props.startDate.getMonth(),
		props.startDate.getDate(),
		0,0,0);
	var endDate = new Date(
		props.endDate.getFullYear(),
		props.endDate.getMonth(),
		props.endDate.getDate(),
		0,0,0);
		
	var results = TSDCollection.find({
		RoomId: props.RoomId,
		date: { $gte : startDate, $lte: endDate }		
		}).fetch();
	
	//console.log(TSDCollection.find().fetch());
	//console.log(results);
	
	//map db data into array for chart plotting
	results.map((sample) => {
		for (i = 0; i < sample.Datapoint.length; i++) {
			for (j = 0; j < sample.Datapoint[i].more.length; j++) {
				var temp = new Date(
					sample.date.getFullYear(),
					sample.date.getMonth(),
					sample.date.getDate(),
					sample.Datapoint[i].hour,
					sample.Datapoint[i].more[j].min,
					0)
				//console.log(temp);
				if ((temp.getTime() <= props.endDate.getTime()) && (temp.getTime() >= props.startDate.getTime())) {
					roomX.push(temp);
					roomY.push(sample.Datapoint[i].more[j].temperature);
				}
			}
		}
	});
	return {roomX, roomY};
}

export class TSGraph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [], 
			layout: {}, 
			frames: [], 
			config: {}
		};
	}
	
	componentDidMount() {
		this.setState({
			data: this.createData(this.props.startDate, this.props.endDate) ,
			layout: {
				title: 'Temperature vs Timestamp',
				autosize:true,
				xaxis: { 
					autorange: true,
					type: 'date'
				},
				yaxis: {
					autorange: true,
					type: 'linear'
				}
			},
			config: {
				scrollZoom: true,
				displaylogo: false,
				responsive: true
			}
		});
	}
	
	createData (startDate,endDate) {
		var trace0 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 0',
		  x: RetrievePlotData({RoomId: "0", startDate:startDate, endDate:endDate}).roomX,
		  y: RetrievePlotData({RoomId: "0", startDate:startDate, endDate:endDate}).roomY,
		  line: {color: '#5da5da'}
		}

		var trace1 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 1',
		  x: RetrievePlotData({RoomId: "1", startDate:startDate, endDate:endDate}).roomX,
		  y: RetrievePlotData({RoomId: "1", startDate:startDate, endDate:endDate}).roomY,
		  line: {color: '#f15854'}
		}
		
		var trace2 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 2',
		  x: RetrievePlotData({RoomId: "2", startDate:startDate, endDate:endDate}).roomX,
		  y: RetrievePlotData({RoomId: "2", startDate:startDate, endDate:endDate}).roomY,
		  line: {color: '#60bd68'}
		}
		 var trace3 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 3',
		  x: RetrievePlotData({RoomId: "3", startDate:startDate, endDate:endDate}).roomX,
		  y: RetrievePlotData({RoomId: "3", startDate:startDate, endDate:endDate}).roomY,
		  line: {color: '#b276b2'}
		}

		var trace4 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 4',
		  x: RetrievePlotData({RoomId: "4", startDate:startDate, endDate:endDate}).roomX,
		  y: RetrievePlotData({RoomId: "4", startDate:startDate, endDate:endDate}).roomY,
		  line: {color: '#f49436'}
		}
		
		var trace5 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 5',
		  x: RetrievePlotData({RoomId: "5", startDate:startDate, endDate:endDate}).roomX,
		  y: RetrievePlotData({RoomId: "5", startDate:startDate, endDate:endDate}).roomY,
		  line: {color: '#3bbdbd'}
		}		
		var trace6 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 6',
		  x: RetrievePlotData({RoomId: "6", startDate:startDate, endDate:endDate}).roomX,
		  y: RetrievePlotData({RoomId: "6", startDate:startDate, endDate:endDate}).roomY,
		  line: {color: '#634792'}
		}	
		return [trace0,trace1,trace2,trace3,trace4,trace5,trace6];
	}
		
	handleRelayout(e) {	
		if (!(e["xaxis.range[0]"] == undefined)) {
			//console.log(e["xaxis.range[0]"]);
			var startDate = new Date(e["xaxis.range[0]"]);
			var endDate = new Date(e["xaxis.range[1]"]);
			this.props.onGetDates({startDate,endDate});
		}
	}

  render() {
    return (
      <Plot
        data={this.state.data}
        layout={this.state.layout}
        frames={this.state.frames}
        config={this.state.config}
		useResizeHandler
        style={{ width: "100%", height: "100%" }}
		onRelayout={(e) => this.handleRelayout(e)}
      />
    );
  }
}