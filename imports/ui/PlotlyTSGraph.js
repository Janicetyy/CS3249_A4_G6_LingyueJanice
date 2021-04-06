import React from 'react';
import Plot from 'react-plotly.js';
import { TSDCollection } from '/imports/db/TimeSeriesDataCollection';
import { LTTB } from 'downsample';

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
			data: this.createData() ,
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
	
	RetrievePlotData(props) {
	
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
		
		var allData=[];
		//map db data into array for chart plotting
		results.map((sample) => {
			var i;
			for (i = 0; i < sample.Datapoint.length; i++) {
				var j;
				for (j = 0; j < sample.Datapoint[i].more.length; j++) {
					var tmp = new Date(
						sample.date.getFullYear(),
						sample.date.getMonth(),
						sample.date.getDate(),
						sample.Datapoint[i].hour,
						sample.Datapoint[i].more[j].min,
						0)
					
					if ((tmp.getTime() <= props.endDate.getTime()) 
						&& (tmp.getTime() >= props.startDate.getTime())) {
						allData.push({x:tmp, y:sample.Datapoint[i].more[j].temperature});
					}
				}
			}
		});
		
		var length = allData.length;
		this.props.onMaxChange(length);
		
		var roomX = [];
		var roomY = [];
		const downsampled = LTTB(allData, this.props.chartWidth);
		downsampled.forEach((sample) => {
			roomX.push(sample.x);
			roomY.push(sample.y);
		})
		
		return {roomX, roomY};
	}
	
	createData () {
		
		var roomIds = ['0','1','2','3','4','5','6'];
		var allData = [];
		roomIds.forEach((roomId) => {
			allData.push(this.RetrievePlotData({
				RoomId:roomId,
				startDate:this.props.startDate,
				endDate:this.props.endDate,
				rate:this.props.rate}));
		})
		//console.log(allData);
		
		var trace0 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 0',
		  x: allData[0].roomX,
		  y: allData[0].roomY,
		  line: {color: '#5da5da'}
		}

		var trace1 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 1',
		  x: allData[1].roomX,
		  y: allData[1].roomY,
		  line: {color: '#f15854'}
		}
		
		var trace2 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 2',
		  x: allData[2].roomX,
		  y: allData[2].roomY,
		  line: {color: '#60bd68'}
		}
		 var trace3 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 3',
		  x: allData[3].roomX,
		  y: allData[3].roomY,
		  line: {color: '#b276b2'}
		}

		var trace4 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 4',
		  x: allData[4].roomX,
		  y: allData[4].roomY,
		  line: {color: '#f49436'}
		}
		
		var trace5 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 5',
		  x: allData[5].roomX,
		  y: allData[5].roomY,
		  line: {color: '#3bbdbd'}
		}		
		var trace6 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 6',
		  x: allData[6].roomX,
		  y: allData[6].roomY,
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