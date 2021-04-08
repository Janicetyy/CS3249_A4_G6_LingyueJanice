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
			config: {},
		};
	}
	
	componentDidMount() {
		this.setState({
			data: this.formatPlotData() ,
			layout: {
				title: 'Temperature vs Timestamp',
				autosize:false,
				width:1250,
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
	
	retrievePlotData(props) {
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
		
		var roomData=[];
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
						roomData.push({x:tmp, y:sample.Datapoint[i].more[j].temperature});
					}
				}
			}
		});
		
		var length = roomData.length;
		this.props.onMaxChange(length);
		
		if(roomData.length == 0) {
			var average = 0;
		} else {
			var average = this.getRoomAverage(roomData);
		}
		
		var roomX = [];
		var roomY = [];
		const downsampled = LTTB(roomData, props.chartWidth);
		downsampled.forEach((sample) => {
			roomX.push(sample.x);
			roomY.push(sample.y);
		})
		
		return {roomX, roomY, average};
	}
	
	getRoomAverage(roomData) {
		var total = 0;
		var count = roomData.length;
		var roomTemps = roomData.y;
		roomData.forEach((temperature) => {
			total += temperature.y;
		})
		var avg = total / count;	
		return avg;
	}
	
	getAllAvg(allData){
		var allTemp = [];
		if(allData[0] !== 'undefined') {
			allData.forEach((roomTemp) => {
				allTemp.push(Math.round(roomTemp.average));
			});
			this.props.onAvgChange0(allTemp[0]);
			this.props.onAvgChange1(allTemp[1]);
			this.props.onAvgChange2(allTemp[2]);
			this.props.onAvgChange3(allTemp[3]);
			this.props.onAvgChange4(allTemp[4]);
			this.props.onAvgChange5(allTemp[5]);
			this.props.onAvgChange6(allTemp[6]);
		}
	}
	
	getAllRoomData() {
		var roomIds = this.props.roomIds;
		var allData = [];
		roomIds.forEach((roomId) => {
			allData.push(this.retrievePlotData({
				RoomId:roomId,
				startDate:this.props.startDate,
				endDate:this.props.endDate,
				chartWidth:this.props.chartWidth}));
		})
		return allData;
	}
	
	formatPlotData () {		
		var allData = this.getAllRoomData();
		this.getAllAvg(allData);
		var tog = this.props.toggle;
		
		var trace0 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 0',
		  visible: (tog & 0b0000001) === 0b0000001? true : "legendonly",
		  x: allData[0].roomX,
		  y: allData[0].roomY,
		  line: {color: '#5da5da'}
		}

		var trace1 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 1',
		  visible: (tog & 0b0000010) === 0b0000010? true : "legendonly",
		  x: allData[1].roomX,
		  y: allData[1].roomY,
		  line: {color: '#f15854'}
		}
		
		var trace2 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 2',
		  visible: (tog & 0b0000100) === 0b0000100? true : "legendonly",
		  x: allData[2].roomX,
		  y: allData[2].roomY,
		  line: {color: '#60bd68'}
		}
		 var trace3 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 3',
		  visible: (tog & 0b0001000) === 0b0001000? true : "legendonly",
		  x: allData[3].roomX,
		  y: allData[3].roomY,
		  line: {color: '#b276b2'}
		}

		var trace4 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 4',
		  visible: (tog & 0b0010000) === 0b0010000? true : "legendonly",
		  x: allData[4].roomX,
		  y: allData[4].roomY,
		  line: {color: '#f49436'}
		}
		
		var trace5 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 5',
		  visible: (tog & 0b0100000) === 0b0100000? true : "legendonly",
		  x: allData[5].roomX,
		  y: allData[5].roomY,
		  line: {color: '#3bbdbd'}
		}		
		var trace6 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 6',
		  visible: (tog & 0b1000000) === 0b1000000? true : "legendonly",
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
		style={{width:"100%"}}
		onRelayout={(e) => this.handleRelayout(e)}
      />
    );
  }
}