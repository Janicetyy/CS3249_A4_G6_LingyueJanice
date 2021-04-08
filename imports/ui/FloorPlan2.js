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
                <svg width="650" height="500" style={{border: '5px solid'}}>
                    <g>
                        <rect x="20" y="20" width="200" height="200" style={{fill:this.state.color0, cursor:'pointer', outline:'2px solid'}} onClick={this.handleRoom0}/>
                        <text x="68" y="100" fontFamily="Verdana" fontSize="16" style={{cursor:'pointer'}} onClick={this.handleRoom0}>Upper Level</text>
                        <text x="45" y="120" fontFamily="Verdana" fontSize="16" style={{cursor:'pointer'}} onClick={this.handleRoom0}>Residential Lounge</text>
                        <text x="60" y="180" fontFamily="Verdana" fontSize="32" style={{cursor:'pointer'}} onClick={this.handleRoom0}>Room 0</text>
                    </g>

                    <g>
                        <rect x="20" y="250" width="80" height="200" style={{fill:this.state.color1, cursor:'pointer', outline:'2px solid'}} onClick={this.handleRoom1}/>
                        <text x="33" y="330" fontFamily="Verdana" fontSize="14" style={{cursor:'pointer'}} onClick={this.handleRoom1}>SINGLE</text>
                        <text x="24" y="350" fontFamily="Verdana" fontSize="14" style={{cursor:'pointer'}} onClick={this.handleRoom1}>BEDROOM</text>
                        <text x="38" y="410" fontFamily="Verdana" fontSize="32" style={{cursor:'pointer'}} onClick={this.handleRoom1}>R1</text>
                    </g>

                    <g>
                        <rect x="120" y="250" width="80" height="200" style={{fill:this.state.color2, cursor:'pointer', outline:'2px solid'}} onClick={this.handleRoom2}/>
                        <text x="133" y="330" fontFamily="Verdana" fontSize="14" style={{cursor:'pointer'}} onClick={this.handleRoom2}>SINGLE</text>
                        <text x="124" y="350" fontFamily="Verdana" fontSize="14" style={{cursor:'pointer'}} onClick={this.handleRoom2}>BEDROOM</text>
                        <text x="138" y="410" fontFamily="Verdana" fontSize="32" style={{cursor:'pointer'}} onClick={this.handleRoom2}>R2</text>
                    </g>

                    <g>
                        <rect x="220" y="250" width="80" height="200" style={{fill:this.state.color3, cursor:'pointer', outline:'2px solid'}} onClick={this.handleRoom3}/>
                        <text x="233" y="330" fontFamily="Verdana" fontSize="14" style={{cursor:'pointer'}} onClick={this.handleRoom3}>SINGLE</text>
                        <text x="224" y="350" fontFamily="Verdana" fontSize="14" style={{cursor:'pointer'}} onClick={this.handleRoom3}>BEDROOM</text>
                        <text x="238" y="410" fontFamily="Verdana" fontSize="32" style={{cursor:'pointer'}} onClick={this.handleRoom3}>R3</text>
                    </g>

                    <g>
                        <rect x="320" y="250" width="80" height="200" style={{fill:this.state.color4, cursor:'pointer', outline:'2px solid'}} onClick={this.handleRoom4}/>
                        <text x="333" y="330" fontFamily="Verdana" fontSize="14" style={{cursor:'pointer'}} onClick={this.handleRoom4}>SINGLE</text>
                        <text x="324" y="350" fontFamily="Verdana" fontSize="14" style={{cursor:'pointer'}} onClick={this.handleRoom4}>BEDROOM</text>
                        <text x="338" y="410" fontFamily="Verdana" fontSize="32" style={{cursor:'pointer'}} onClick={this.handleRoom4}>R4</text>
                    </g>

                    <g>
                        <rect x="420" y="250" width="80" height="200" style={{fill:this.state.color5, cursor:'pointer', outline:'2px solid'}} onClick={this.handleRoom5}/>
                        <text x="433" y="330" fontFamily="Verdana" fontSize="14" style={{cursor:'pointer'}} onClick={this.handleRoom5}>SINGLE</text>
                        <text x="424" y="350" fontFamily="Verdana" fontSize="14" style={{cursor:'pointer'}} onClick={this.handleRoom5}>BEDROOM</text>
                        <text x="438" y="410" fontFamily="Verdana" fontSize="32" style={{cursor:'pointer'}} onClick={this.handleRoom5}>R5</text>
                    </g>

                    <g>
                        <rect x="520" y="250" width="80" height="200" style={{fill:this.state.color6, cursor:'pointer', outline:'2px solid'}} onClick={this.handleRoom6}/>
                        <text x="533" y="330" fontFamily="Verdana" fontSize="14" style={{cursor:'pointer'}} onClick={this.handleRoom6}>SINGLE</text>
                        <text x="524" y="350" fontFamily="Verdana" fontSize="14" style={{cursor:'pointer'}} onClick={this.handleRoom6}>BEDROOM</text>
                        <text x="538" y="410" fontFamily="Verdana" fontSize="32" style={{cursor:'pointer'}} onClick={this.handleRoom6}>R6</text>
                    </g>
                    
                </svg>
            </div>
        )
    }
}