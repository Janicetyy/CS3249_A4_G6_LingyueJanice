import { Mongo } from 'meteor/mongo';
import React, { useState, useEffect } from 'react';
import { TSGSub } from '/imports/ui/ClientSub'
import { TSDCollection } from '/imports/db/TimeSeriesDataCollection';
import { TSGraph } from '/imports/ui/PlotlyTSGraph';
import { FloorPlan } from '/imports/ui/FloorPlan';
import { TopAdjustmentPanel } from '/imports/ui/TopAdjustmentPanel';

import { BrowserRouter as Router, Switch, Route, generatePath, useParams } from 'react-router-dom';
export function Linkable() {
	return(
		<Router>
			<div>
			<Switch>
				  <Route path="/:hist/:room0/:room1/:room2/:room3/:room4/:room5/:room6/:startDate/:endDate">
					<App />
				  </Route>
				  <Route path="*" component={App} />
			</Switch>
			</div>
		</Router>
	);
}

export function App() {
	const [startDate, setStartDate] = useState(new Date('2013-10-02T00:00'));
	const [endDate, setEndDate] = useState(new Date('2013-10-02T23:45'));
	const [roomId, setRoomId] = useState(['0','1','2','3','4','5','6']);
	const [chartWidth, setChartWidth] = useState(76);
	const [max, setMax] = useState(76);
	const [avg, setAvg] = useState([20,20,20,20,20,20,20]);
	const [traceToggle, setTraceToggle] = useState(0b1111111);
	const [newPath, setNewPath] = useState('');
	const useSub = TSGSub(startDate, endDate, roomId);
	let params = useParams();
	let baseURL = 'localhost:3000';
	
	useEffect(() => {		
		if (!params.length && params.hist === "A4") {
			var toggleHist = "0b" + params.room0 + params.room1 + params.room2 + params.room3 + params.room4 + params.room5 + params.room6;
			var stringtoBinary = toggleHist | 0b0000000
			setTraceToggle(toggleHist);
			setStartDate(new Date(Number(params.startDate)));
			setEndDate(new Date(Number(params.endDate)));
		}
	},[]);
		

	function checkEndDate(e) {
		var maxEndDate = new Date('2013-12-03T15:30:00');
		//Minutes to be set in interval of 15, round down
		e.setMinutes(e.getMinutes() - (e.getMinutes() % 15));
		e.setSeconds(0);
		if (e.getTime() > maxEndDate.getTime()) { setEndDate(maxEndDate); 0} 
		else if (e.getTime() < startDate.getTime()) { setEndDate(startDate); } 
		else { setEndDate(e); }
	}
	
	function checkStartDate(e) {
		var minStartDate = new Date('2013-10-02T05:00:00');
		//Minutes to be set in interval of 15, round down
		e.setMinutes(e.getMinutes() - (e.getMinutes() % 15));
		e.setSeconds(0);
		if (e.getTime() < minStartDate.getTime()) { setStartDate(minStartDate); }
		else if (e.getTime() > endDate.getTime()) { setStartDate(endDate); } 
		else{ setStartDate(e); }
	}
	
	function handleDates(e) {
		checkStartDate(e.startDate);
		checkEndDate(e.endDate);
	}
	
	function handleMax(e) {
		setMax(e);
	}
	
	function handleChartWidth(e) {
		setChartWidth(e);
	}
	
	function handleRoomToggle (e) {
		setTraceToggle(e);
	}
	
	function handleAvgChange (e) {
		if ((avg[Number(e.roomId)] !== e.average) && (e.roomId !== 'undefined')) {
			avg[Number(e.roomId)] = e.average;
			setAvg(avg);
		}
	}


	function LoadGraph() {
		return(
			<TSGraph startDate={startDate} endDate={endDate} chartWidth={chartWidth}
				roomIds={roomId} onGetDates={handleDates} onMaxChange={handleMax}
				toggle={traceToggle} onAvgChange={handleAvgChange}
			/>
		);
	}
	
	function LoadFloorPlan() {
		return (
			<FloorPlan tempList={avg} toggle={traceToggle} onToggle={handleRoomToggle}/>
		);
	}
	
	function handleSaveState() {
		var binaryToString = '0000000' + traceToggle.toString(2);
		console.log(binaryToString);
		var path = generatePath("/:hist/:room0/:room1/:room2/:room3/:room4/:room5/:room6/:startDate/:endDate", {
			hist:"A4",
			room0: binaryToString[binaryToString.length - 7],
			room1: binaryToString[binaryToString.length - 6],
			room2: binaryToString[binaryToString.length - 5],
			room3: binaryToString[binaryToString.length - 4],
			room4: binaryToString[binaryToString.length - 3],
			room5: binaryToString[binaryToString.length - 2],
			room6: binaryToString[binaryToString.length - 1],
			startDate: startDate.getTime(),
			endDate: endDate.getTime()
		});
		setNewPath(baseURL + path);
	}
	
	return (
		<div>
			<div>
				<TopAdjustmentPanel startDate={startDate} endDate={endDate} max={max}
					onStartDateChange={checkStartDate} 	onEndDateChange={checkEndDate}
					onChartWidthChange={handleChartWidth}/>
			</div>
			<div>
				<LoadGraph />
			</div>
			<div style={{position: "absolute", top:"500px", left:"50%", transform: "translateX(-50%)"}}>
				<LoadFloorPlan />
				<div className="linkable">
					<input readOnly type="text" value={newPath} />
					<button onClick={handleSaveState}>Create Link</button>
				</div>
			</div>
		</div>
	)
}