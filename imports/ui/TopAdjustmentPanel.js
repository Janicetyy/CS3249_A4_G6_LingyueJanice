import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export function TopAdjustmentPanel(props) {
	const [value, setValue] = useState(76);
		
	function handleStartDate(newStartDate) {
		props.onStartDateChange(newStartDate);
	}
	
	function handleEndDate(newEndDate) {
		props.onEndDateChange(newEndDate);
	}
	
	const handleSliderAdjust = e => {
		setValue(e);
	}
	
	const handleSliderChange = e => {
		props.onChartWidthChange(e);
	}
	
	return (
		<div style={{display:"flex", marginLeft:"3%",marginBottom:"3px"}}>
		<p style={{
			display: "inline-block", 
			marginRight:"10px", 
			marginTop:"0"}}> Start </p>
		<DatePicker style={{display: "inline-block"}}
		  selected={props.startDate}
		  onChange={newStartDate => handleStartDate(newStartDate)}
		/>
		<DatePicker style={{display: "inline-block"}}
		  selected={props.startDate}
		  onChange={newStartDate => handleStartDate(newStartDate)}
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
		  selected={props.endDate}
		  onChange={newEndDate => handleEndDate(newEndDate)}
		/>
		<DatePicker style={{display: "inline-block"}}
		  selected={props.endDate}
		  onChange={newEndDate => handleEndDate(newEndDate)}
		  showTimeSelect
		  showTimeSelectOnly
		  timeIntervals={15}
		  timeCaption="Time"
		  dateFormat="h:mm aa"
		/>
		<div style={{ display: "inline-block", marginLeft: "5%", width: "35%" }}>
			<Slider
				Value={value}
				min = {0}
				max = {props.max}
				onChange={handleSliderAdjust}
				onAfterChange = {handleSliderChange}
			/>
			<p style={{margin:"0"}}>Sample Data: {value}</p>
		</div>
	</div>
	)
}
