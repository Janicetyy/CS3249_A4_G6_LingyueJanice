import React, { useState , useEffect} from 'react';
import { Machine, assign } from 'xstate';
import { useMachine } from '@xstate/react';
import { State, interpret } from 'xstate';

const roomMachine = Machine ({
	id: 'room',
	type:'parallel',
	states: {
		room0: {
			initial: 'visible',
			states: {
				visible: {
					on: {
						TOGGLE_0: 'hide'
					}
				},
				hide: {
					on: {
						TOGGLE_0: 'visible'
					}
				}
			}
		},	
		room1: {
			initial: 'visible',
			states: {
				visible: {
					on: {
						TOGGLE_1: 'hide'
					}
				},
				hide: {
					on: {
						TOGGLE_1: 'visible'
					}
				}
			}
		},
		room2: {
			initial: 'visible',
			states: {
				visible: {
					on: {
						TOGGLE_2: 'hide'
					}
				},
				hide: {
					on: {
						TOGGLE_2: 'visible'
					}
				}
			}
		},	
		room3: {
			initial: 'visible',
			states: {
				visible: {
					on: {
						TOGGLE_3: 'hide'
					}
				},
				hide: {
					on: {
						TOGGLE_3: 'visible'
					}
				}
			}
		},	
		room4: {
			initial: 'visible',
			states: {
				visible: {
					on: {
						TOGGLE_4: 'hide'
					}
				},
				hide: {
					on: {
						TOGGLE_4: 'visible'
					}
				}
			}
		},	
		room5: {
			initial: 'visible',
			states: {
				visible: {
					on: {
						TOGGLE_5: 'hide'
					}
				},
				hide: {
					on: {
						TOGGLE_5: 'visible'
					}
				}
			}
		},	
		room6: {
			initial: 'visible',
			states: {
				visible: {
					on: {
						TOGGLE_6: 'hide'
					}
				},
				hide: {
					on: {
						TOGGLE_6: 'visible'
					}
				}
			}
		}
	}
});	


export function FloorPlan(props) {
	//const stateDefinition = JSON.parse(localStorage.getItem('app-state')) || roomMachine.initialState;
	//const [state, send] = useMachine(roomMachine,{state: stateDefinition});
	const [state, send] = useMachine(roomMachine);
	const [roomColours, setRoomColours] = useState(["#c8c8ff", "#4141ff", "#4141ff", "#2323ff", "#5f5fff", "#7d7dff", "#5f5fff"]);
	
	function handleToggle(event) {
		var action = "TOGGLE_" + event;
		console.log(action);
		send(action);
		props.onToggle(event);
		determineRoomColour(event);
		//saveState();
		console.log(state.value);
	}
	
	/*function saveState() {
		const jsonState = JSON.stringify(state);
		// Example: persisting to localStorage
		try {
		  localStorage.setItem('app-state', jsonState);
		} catch (e) {
			console.log("Unable to save to localStorage");
		  // unable to save to localStorage
		}
	}*/
	
	function determineRoomColour(room) {
		var temparray = roomColours;
		var roomNum = Number(room);
		if (state.matches({["room" + room]:'hide'})){
			temparray[roomNum] = "#ffffff";
			setRoomColours(temparray)
		} else {
			var avg = props.tempList[roomNum];
			
			if(avg > 23) {
                temparray[roomNum] = '#c8c8ff';
            } else if (avg > 22.5) {
                temparray[roomNum] = '#b9b9ff';
            } else if (avg > 22) {
                temparray[roomNum] = '#aaaaff';
            } else if (avg>21.5) {
                temparray[roomNum] = '#9b9bff';
            } else if (avg>21) {
                temparray[roomNum] = '#8c8cff'; 
            } else if (avg>20.5) {
                temparray[roomNum] = '#7d7dff';
            } else if (avg>20) {
                temparray[roomNum] = '#6e6eff'; 
            } else if (avg>19.5) {
                temparray[roomNum] = '#5f5fff';
            } else if (avg>19) {
                temparray[roomNum] = '#5050ff';
            } else if (avg>18.5) {
                temparray[roomNum] = '#4141ff';
            } else if (avg>18) {
                temparray[roomNum] = '#3232ff';
            } else if (avg>17.5) {
                temparray[roomNum] = '#2323ff';
            } else if (avg>17) {
                temparray[roomNum] = '#1414ff';
            } else {
                temparray[roomNum] = "#0505ff";
            }
		}
		setRoomColours(temparray);
	}
	
	return (
		<div>
			<svg
				   xmlns="http://www.w3.org/2000/svg"
				   width="40%"
				   height="30%"
				   viewBox="0 0 208 161"
				   version="1.1">
				  <g>
					<g style={{cursor:'pointer'}}>
						<rect fill={roomColours[0]} width="80" height="70" x="7" y="7" 
							onClick={() => {handleToggle('0')}}/>
						<rect fill={roomColours[1]} width="30" height="40" x="7" y="121" 
							onClick={() => {handleToggle('1')}}/>
						<rect fill={roomColours[2]} width="30" height="40" x="40" y="121" 
							onClick={() => {handleToggle('2')}}/>
						<rect fill={roomColours[3]} width="30" height="40" x="73" y="121" 
							onClick={() => {handleToggle('3')}}/>
						<rect fill={roomColours[4]} width="30" height="40" x="106" y="121" 
							onClick={() => {handleToggle('4')}}/>
						<rect fill={roomColours[5]} width="30" height="40" x="139" y="121" 
							onClick={() => {handleToggle('5')}}/>
						<rect fill={roomColours[6]} width="30" height="40" x="172" y="121" 
							onClick={() => {handleToggle('6')}}/>
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
	);
}