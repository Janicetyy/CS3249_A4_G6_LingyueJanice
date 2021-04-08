import React from 'react';

export class FloorPlan extends React.Component {
    constructor(props){
        super(props);

        this.handleRoom0 = this.handleRoom0.bind(this);
        this.handleRoom1 = this.handleRoom1.bind(this);
        this.handleRoom2 = this.handleRoom2.bind(this);
        this.handleRoom3 = this.handleRoom3.bind(this);
        this.handleRoom4 = this.handleRoom4.bind(this);
        this.handleRoom5 = this.handleRoom5.bind(this);
        this.handleRoom6 = this.handleRoom6.bind(this);

        this.state = {
            color0: 'rgb(255,255,255)',
            color1: 'rgb(255,255,255)',
            color2: 'rgb(255,255,255)',
            color3: 'rgb(255,255,255)',
            color4: 'rgb(255,255,255)',
            color5: 'rgb(255,255,255)',
            color6: 'rgb(255,255,255)',
            toggle: {room0: true,room1: true,room2: true, room3:true, room4:true, room5:true, room6:true}
        }
    }

    componentDidUpdate() {
		console.log("here");
        this.colorPicker();
    }

    colorPicker() {
        var temp = this.props.tempList;
        
        var color = [];
        var i = 0;
        for (const tog in this.state.toggle){
            if(temp[i]>23) {
                color[i] = tog?'rgb(200,200,255)':'rgb(255,255,255)';
            } else if (temp[i]>22.5) {
                color[i] = tog?'rgb(185,185,255)':'rgb(255,255,255)';
            } else if (temp[i]>22) {
                color[i] = tog?'rgb(170,170,255)':'rgb(255,255,255)';
            } else if (temp[i]>21.5) {
                color[i] = tog?'rgb(155,155,255)':'rgb(255,255,255)';
            } else if (temp[i]>21) {
                color[i] = tog?'rgb(140,140,255)':'rgb(255,255,255)'; 
            } else if (temp[i]>20.5) {
                color[i] = tog?'rgb(125,125,255)':'rgb(255,255,255)';
            } else if (temp[i]>20) {
                color[i] = tog?'rgb(110,110,255)':'rgb(255,255,255)'; 
            } else if (temp[i]>19.5) {
                color[i] = tog?'rgb(95,95,255)':'rgb(255,255,255)';
            } else if (temp[i]>19) {
                color[i] = tog?'rgb(80,80,255)':'rgb(255,255,255)';
            } else if (temp[i]>18.5) {
                color[i] = tog?'rgb(65,65,255)':'rgb(255,255,255)';
            } else if (temp[i]>18) {
                color[i] = tog?'rgb(50,50,255)':'rgb(255,255,255)';
            } else if (temp[i]>17.5) {
                color[i] = tog?'rgb(35,35,255)':'rgb(255,255,255)';
            } else if (temp[i]>17) {
                color[i] = tog?'rgb(20,20,255)':'rgb(255,255,255)';
            } else {
                color[i] = tog?'rgb(5,5,255)':'rgb(255,255,255)';
            }
            i++;
        }
        console.log(color);
        this.setState = ({
            color0: color[0],
            color1: color[1],
            color2: color[2],
            color3: color[3],
            color4: color[4],
            color5: color[5],
            color6: color[6]
        });
        console.log(this.state.color0)

    }

    handleRoom0() {
        var toggle = this.props.toggle;
        toggle = toggle ^ 0b0000001;
        this.props.onToggle(toggle);
        this.setState = ({
            toggle: {room0:((toggle & 0b0000001) === 0b0000001)}
        });
    }

    handleRoom1() {
        var toggle = this.props.toggle;
        toggle = toggle ^ 0b0000010;
        this.props.onToggle(toggle);
        this.setState = ({
            toggle: {room1:((toggle & 0b0000010) === 0b0000010)}
        });
    }

    handleRoom2() {
        var toggle = this.props.toggle;
        toggle = toggle ^ 0b0000100;
        this.props.onToggle(toggle);
        this.setState = ({
            toggle: {room2:((toggle & 0b0000100) === 0b0000100)}
        });
    }

    handleRoom3() {
        var toggle = this.props.toggle;
        toggle = toggle ^ 0b0001000;
        this.props.onToggle(toggle);
        this.setState = ({
            toggle: {room3:((toggle & 0b0001000) === 0b0001000)}
        });
    }

    handleRoom4() {
        var toggle = this.props.toggle;
        toggle = toggle ^ 0b0010000;
        this.props.onToggle(toggle);
        this.setState = ({
            toggle: {room4:((toggle & 0b0010000) === 0b0010000)}
        });
    }

    handleRoom5() {
        var toggle = this.props.toggle;
        toggle = toggle ^ 0b0100000;
        this.props.onToggle(toggle);
        this.setState = ({
            toggle: {room5:((toggle & 0b0100000) === 0b0100000)}
        });
    }

    handleRoom6() {
        var toggle = this.props.toggle;
        toggle = toggle ^ 0b1000000;
        this.props.onToggle(toggle);
        this.setState = ({
            toggle: {room6:((toggle & 0b1000000) === 0b1000000)}
      });
    }
    render(){
        return( 
            <div>
                <h1>Floor Plan</h1>
				<svg
				   xmlns="http://www.w3.org/2000/svg"
				   width="650" 
				   height="500"
				   viewBox="0 0 208 161"
				   version="1.1">
				  <g>
					<g style={{cursor:'pointer'}}>
						<rect style={{fill:this.state.color0}} width="80" height="70" x="7" y="7" 
							onClick={this.handleRoom0}/>
						<rect style={{fill:this.state.color1}} width="30" height="40" x="7" y="121" 
							onClick={this.handleRoom1}/>
						<rect style={{fill:this.state.color2}} width="30" height="40" x="40" y="121" 
							onClick={this.handleRoom2}/>
						<rect style={{fill:this.state.color3}} width="30" height="40" x="73" y="121" 
							onClick={this.handleRoom3}/>
						<rect style={{fill:this.state.color4}} width="30" height="40" x="106" y="121" 
							onClick={this.handleRoom4}/>
						<rect style={{fill:this.state.color5}} width="30" height="40" x="139" y="121" 
							onClick={this.handleRoom5}/>
						<rect style={{fill:this.state.color6}} width="30" height="40" x="172" y="121" 
							onClick={this.handleRoom6}/>
					</g>
					<g style = {{fontSize:"4px", fontFamily:"sans-serif"}}>
						<text x="30" y="30">UPPER LEVEL</text>
						<text x="30" y="34">RESIDENTIAL</text>
						<text x="30" y="38">LOUNGE</text>		
						<text x="15" y="138">SINGLE</text>
						<text x="12" y="142">BEDROOM</text>
						<text x="48" y="138">SINGLE</text>
						<text x="45" y="142">BEDROOM</text>	
						<text x="81" y="138">SINGLE</text>
						<text x="78" y="142">BEDROOM</text>
						<text x="113" y="138">SINGLE</text>
						<text x="110" y="142">BEDROOM</text>
						<text x="146" y="138">SINGLE</text>
						<text x="143" y="142">BEDROOM</text>		   
						<text x="180" y="138">SINGLE</text>
						<text x="176" y="142">BEDROOM</text>
					</g>
					<g style = {{fontSize:"10px", fontFamily:"Algerian"}}>
						<text x="28" y="55">Room 0</text>
						<text x="17" y="152">R1</text>
						<text x="50" y="152">R2</text>
						<text x="83" y="152">R3</text>
						<text x="115" y="152">R4</text>
						<text x="148" y="152">R5</text>
						<text x="181" y="152">R6</text>
					</g>
					
					<g style = {{fill:"none",stroke: "#4f4f4f", strokeWidth:"2"}}>
						<path d="M 2,0 H 96 L 96,35 210,35" />
						<path d="M 5,161 H 205"/>
						
						<g style = {{stroke:"#000000", strokeWidth:"1.5"}}>
							<path d="M 87.5,7 H 8 7 v 55"/>
							<path d="M 7,73 V 83 H 87 V 59"/>
							<path d="M 87,49 V 41 h 8" />
							<path d="m 20,83 v 13"/>
							<path d="m 7,95 c 4,0 13,0 20,0"/>
							<path d="m 51,83 0,11"/>
							<path d="m 87,82 v 13" />
							<path d="M 88,95 68,95"/>
							<path d="m 43,95 c 3,0 10,0 15,0" />
							<path d="m 144,41 -22,0 c 0,13 0,25 0,38 l 5,0"/>
							<path d="m 160,41 14,0"/>
							<path d="m 155,95 h 52"/>
							<path d="m 184,41 24,0"/>
							<path d="m 38.5,121 v 38.5"/>
							<path d="m 71.5,121 v 38.5"/>
							<path d="m 104.5,121 v 38.5"/>
							<path d="m 137.5,121 v 38.5"/>
							<path d="m 170.5,121 v 38.5"/>
							<path d="m 7,161 v -40 H 202 v 40"/>
						</g>
						
						<g style = {{stroke:"#000000", strokeWidth:"0.5"}}>
							<path d="M 7,84 7,95"/>
							<path d="m 27,95 17,0"/>
							<path d="m 68,95 -10,0"/>
							<path d="M 87,41 V 8"/>
						</g>
						
						<g style = {{stroke:"#ffffff", strokeWidth:"1.5"}}>
							<path d="m 21.5,121 11,0" />
							<path d="m 122.5,121 10.5,-0"/>
							<path d="m 56,121 10.5,-0" />
							<path d="m 155,121 10.65,0"/>
							<path d="m 76,121 10.5,0" />
							<path d="M 175,121 185,121"/>
						</g>
						
						<g style = {{stroke:"#000000", strokeWidth:"0.25"}}>
							<path d="M 7,62 A 10.5,11 0 0 1 18,73" />
							<path d="M 18,73 7,73 7,70" />
							<path d="m 7,61 0,3"/>
							<path d="m 87,-59 a 10,10 0 0 1 10,10" transform="scale(1,-1)" />
							<path d="M 97,49 87,49 l 0,5"/>
							<path d="m 87,48 0,3"/>
							<path d="m 32,133 a 10,10 0 0 1 -8,-3 10,10 0 0 1 -3,-8" />
							<path d="m 32,133 0,-12"/>	
							<path d="m 21,122 10.5,-0"/>
							<path d="m 21,120 10.5,0" />
							<path d="m 133,133 a 10.5,10.5 0 0 1 -8,-3 10.5,10.5 0 0 1 -3,-8" />
							<path d="m 133,133 0,-12" />
							<path d="m 122,122 10.5,-0"/>
							<path d="m 122,120 10.5,0" />
							<path d="m 66.5,133 a 10.5,10.5 0 0 1 -8,-3 10.5,10.5 0 0 1 -3,-8" />
							<path d="m 66.5,133 0,-12"/>
							<path d="m 56,122 10.5,-0" />
							<path d="m 56,120 10.5,0" />
							<path d="m 166,133 a 10.5,10.5 0 0 1 -8,-3 10.5,10.5 0 0 1 -3,-8" />
							<path d="m 166,133 0,-12"/>
							<path d="m 155,122 10.5,0"/>
							<path d="m 155,120 10.5,0"/>
							<path d="m 87,122 a 12,10.5 0 0 1 -3,8 12,10.5 0 0 1 -8,4" />
							<path d="m 76,134 0,-12"/>
							<path d="m 76,122 10.5,-0"/>
							<path d="m 76,122 10.5,0"/>
							<path d="m 185,122 a 12,10.5 0 0 1 -3,8 12,10.5 0 0 1 -8,3" />
							<path d="m 175,134 0,-12"/>
							<path d="m 175,122 10.63618,-0"/>
							<path d="m 175,120 10.5,0"/>
						</g>
					</g>
				</g>
			</svg>
        </div>
        )
    }
}