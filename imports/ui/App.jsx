import { Mongo } from 'meteor/mongo';
import React, { useState, useEffect } from 'react';
import { TSGSub } from '/imports/ui/ClientSub'
import { TSDCollection } from '/imports/db/TimeSeriesDataCollection';
import { TSGraph } from '/imports/ui/PlotlyTSGraph';
import { FloorPlan } from '/imports/ui/FloorPlan2';
import { TopAdjustmentPanel } from '/imports/ui/TopAdjustmentPanel';

export function App() {
	
	const [startDate, setStartDate] = useState(new Date('2013-10-02T00:00'));
	const [endDate, setEndDate] = useState(new Date('2013-10-02T23:45'));
	const [roomId, setRoomId] = useState(['0','1','2','3','4','5','6']);
	const [chartWidth, setChartWidth] = useState(76);
	const [max, setMax] = useState(76);
	const [avg, setAvg] = useState([20,20,20,20,20,20,20]);
	const [traceToggle, setTraceToggle] = useState(0b1111111);
	const useSub = TSGSub(startDate, endDate, roomId);

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
			</div>
		</div>
	)
}