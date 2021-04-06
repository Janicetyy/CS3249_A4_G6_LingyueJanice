import { Mongo } from 'meteor/mongo';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { TSGSub } from '/imports/ui/ClientSub'
import { TSDCollection } from '/imports/db/TimeSeriesDataCollection';
import { TSGraph } from '/imports/ui/PlotlyTSGraph';

export function ConfigMenu() {
	const [startDate, setStartDate] = useState(new Date('2013-10-02T00:00'));
	const [endDate, setEndDate] = useState(new Date('2013-10-02T23:45'));
	const [roomId, setRoomId] = useState(['0','1','2','3','4','5','6']);
	const [chartWidth, setChartWidth] = useState(76);
	const [max, setMax] = useState(76);
	const useSub = TSGSub(startDate, endDate, roomId);

	const handleSliderChange = e => {
		setChartWidth(e);
		//console.log(e);
	}
	
	function checkEndDate(e) {
		var maxEndDate = new Date('2013-12-03T15:30:00');
		e.setMinutes(e.getMinutes() - (e.getMinutes() % 15));
		e.setSeconds(0);
		if (e.getTime() > maxEndDate.getTime()) {
			setEndDate(maxEndDate);
		} else if (e.getTime() < startDate.getTime()) {
			setEndDate(startDate);
		} else {
			setEndDate(e);
		}
	}
	
	function checkStartDate(e) {
		var minStartDate = new Date('2013-10-02T05:00:00');
		//console.log(e.getMinutes());
		e.setMinutes(e.getMinutes() - (e.getMinutes() % 15));
		e.setSeconds(0);
		if (e.getTime() < minStartDate.getTime()) {
			setStartDate(minStartDate);
		}
		else if (e.getTime() > endDate.getTime()) {
			setStartDate(endDate);
		} else{
			setStartDate(e);
		}
	}
	
	function handleDates(e) {
		checkStartDate(e.startDate);
		checkEndDate(e.endDate);
	}
	
	function handleMax(e) {
		setMax(e);
	}
	
	function LoadGraph() {
		return(
			<div>
				<TSGraph 
					startDate = {startDate} 
					endDate = {endDate} 
					chartWidth = {chartWidth} 
					onGetDates={handleDates}
					onMaxChange={handleMax}
				/>
			</div>
		);
	}
	
	//console.log(TSDCollection.find().fetch());
	//<TSGSub startDate = { startDate } endDate = { endDate } roomId = { roomId }/>
	return (
		<div>
			<div style={{display:"flex", marginBottom:"30px"}}>
				<p style={{
					display: "inline-block", 
					marginRight:"10px", 
					marginTop:"0"}}> Start </p>
				<DatePicker style={{display: "inline-block"}}
				  selected={startDate}
				  onChange={newStartDate => checkStartDate(newStartDate)}
				/>
				<DatePicker style={{display: "inline-block"}}
				  selected={startDate}
				  onChange={newStartDate => checkStartDate(newStartDate)}
				  showTimeSelect
				  showTimeSelectOnly
				  timeIntervals={15}
				  timeCaption="Time"
				  dateFormat="h:mm aa"
				/>
				<p style={{
					display: "inline-block", 
					marginRight:"10px", 
					marginLeft:"10px", 
					marginTop:"0"}}> End </p>
				<DatePicker style={{display: "inline-block"}}
				  selected={endDate}
				  onChange={endDate => checkEndDate(endDate)}
				/>
				<DatePicker style={{display: "inline-block"}}
				  selected={endDate}
				  onChange={endDate => checkEndDate(endDate)}
				  showTimeSelect
				  showTimeSelectOnly
				  timeIntervals={15}
				  timeCaption="Time"
				  dateFormat="h:mm aa"
				/>
				<div style={{ display: "inline-block", marginLeft: "40px", width: "600px" }}>
					<Slider
						defaultValue={chartWidth}
						min = {0}
						max = {max}
						onAfterChange = {handleSliderChange}
					/>
					<p>Sample Data: {chartWidth}</p>
				</div>
			</div>
			<LoadGraph />
		</div>
	)
}