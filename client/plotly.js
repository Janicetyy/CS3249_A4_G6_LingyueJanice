import React from 'react';
import Plot from 'react-plotly.js';

/*
This is a "dumb" component that doesn't merge its internal state with any updates. 
This means that if a user interacts with the plot, by zooming or panning 
For example, any subsequent re-renders will lose this information unless it is captured and upstreamed 
via the onUpdate callback prop.

Here is a simple example of how to capture and store state in a parent object:
*/

export class TSGraph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [], 
			layout: {}, 
			frames: [], 
			config: {},
			startDate: '2013-10-01',
			endDate: '2013-10-01',
			roomID: [0,1,2,3,4,5,6]
		};
	}	
	
	setData(){
		//get data from mongoDB
		 var trace0 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 0',
		  x: unpack(rows, 'Date'),
		  y: unpack(rows, 'AAPL.High'),
		  line: {color: '#5da5da'}
		}

		var trace1 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 1',
		  x: unpack(rows, 'Date'),
		  y: unpack(rows, 'AAPL.Low'),
		  line: {color: '#f15854'}
		}
		
		var trace2 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 2',
		  x: unpack(rows, 'Date'),
		  y: unpack(rows, 'AAPL.Low'),
		  line: {color: '#60bd68'}
		}
		 var trace3 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 3',
		  x: unpack(rows, 'Date'),
		  y: unpack(rows, 'AAPL.High'),
		  line: {color: '#b276b2'}
		}

		var trace4 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 4',
		  x: unpack(rows, 'Date'),
		  y: unpack(rows, 'AAPL.Low'),
		  line: {color: '#f49436'}
		}
		
		var trace5 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 5',
		  x: unpack(rows, 'Date'),
		  y: unpack(rows, 'AAPL.Low'),
		  line: {color: '#3bbdbd'}
		}		
		var trace6 = {
		  type: "scatter",
		  mode: "lines",
		  name: 'Room 6',
		  x: unpack(rows, 'Date'),
		  y: unpack(rows, 'AAPL.Low'),
		  line: {color: '#634792'}
		}	

		this.setState({
			data: [trace0, trace1, trace2, trace3, trace4, trace5, trace6],
			layout: {
				title: 'Temperature vs Timestamp',
				xaxis: { 
					autorange: true,
					range: [startDate, endDate],
					type: 'date'
				},
				yaxis: {
					autorange: true,
					range: [ 8, 28 ],
					type: 'linear'
				}
			},
			config: {
				scrollZoom: true,
				displayModeBar: false,
				displaylogo: false,
				responsive: true
			}
		});
	}

  render() {
    return (
	  <Container 
		roomID: this.state.roomID 
		startDate: this.state.startDate 
		endDate: this.state.endDate 
	/>
      <Plot
        data={this.state.data}
        layout={this.state.layout}
        frames={this.state.frames}
        config={this.state.config}
        onInitialized={(figure) => this.setState(figure)}
        onUpdate={(figure) => this.setState(figure)}
		onLegendClick={(figure) => this.setState(figure)}
      />
    );
  }
}