// import React, { useEffect, useState } from 'react';
import {Line} from "react-chartjs-2";
import './LineGraph.css';   


import React, { Component } from 'react'

class LineGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            graphData: [],
        }
    }

    setGraphData(){
        let data = [];

        for(var i=0; i<this.props.data.timestamp.length; i++){
            data.push({
                x: new Date(this.props.data.timestamp[i] * 1000),
                y: this.props.data.equity[i],
            });
        }

        return data;
    }    

    render() {
        this.setGraphData();
        return (
            <div className="linegraph">
                <Line 
                    data={
                        {
                            datasets: [
                                {
                                    type: "line",
                                    data: this.setGraphData(),

                                    backgroundColor: "black",
                                    borderColor: "#5AC53B",
                                    borderWidth: 2,
                                    pointBorderColor: 'rgba(0,0,0,0)',
                                    pointBackgroundColor: 'rgba(0,0,0,0)',
                                    pointHoverBackgroundColor: '5AC53B',
                                    pointHoverBorderColor: '#000000',
                                    pointHoverBorderWidth: 4,
                                    pointHoverRadius: 6,
                                }
                            ]
                        }
                    }
                    options = {
                        {
                            // responsive: true,
                            // maintainAspectRatio: true,
                            legend: {
                                display: false
                            },
                            scales: {
                                xAxes: [
                                    {
                                        type: "time",
                                        time: {
                                            format: "MM/DD/YY",
                                            tooltipFormat: "ll",
                                        },
                                        ticks: {
                                            display: false,
                                        }
                                    },
                                ],
                                yAxes: [{
                                    ticks: {
                                        display: false
                                    }
                                }]
                            },
                            tooltips: {
                                mode: "index",
                                intersect: false
                            }
                        }
                    }
                />
            </div>
        )
    }
}
export default LineGraph


// function LineGraph() {

//     const [ graphData, setGraphData ] = useState([]);  

//     const createMockData = () => {
//         let data = [];
//         let value = 50;
//         for(var i=0; i<366; i++){
//             let date = new Date();
//             date.setHours(0,0,0,0);
//             date.setDate(i);
//             value += Math.round((Math.random() < 0.5 ? 1 : 0) * Math.random() * 10);
//             data.push({x: date, y: value});
//         }

//         setGraphData(data)
//     }

//     useEffect(() => {
//         createMockData();
//     }, [])
//     return (
//         <div className="linegraph">
//             <Line 
//                 data={
//                     {
//                         datasets: [
//                             {
//                                 type: "line",
//                                 data: graphData,

//                                 backgroundColor: "black",
//                                 borderColor: "#5AC53B",
//                                 borderWidth: 2,
//                                 pointBorderColor: 'rgba(0,0,0,0)',
//                                 pointBackgroundColor: 'rgba(0,0,0,0)',
//                                 pointHoverBackgroundColor: '5AC53B',
//                                 pointHoverBorderColor: '#000000',
//                                 pointHoverBorderWidth: 4,
//                                 pointHoverRadius: 6,
//                             }
//                         ]
//                     }
//                 }
//                 options = {
//                     {
//                         responsive: true,
//                         maintainAspectRatio: true,
//                         legend: {
//                             display: false
//                         },
//                         scales: {
//                             xAxes: [
//                                 {
//                                     type: "time",
//                                     time: {
//                                         format: "MM/DD/YY",
//                                         tooltipFormat: "ll",
//                                     },
//                                     ticks: {
//                                         display: false,
//                                     }
//                                 },
//                             ],
//                             yAxes: [{
//                                 ticks: {
//                                     display: false
//                                 }
//                             }]
//                         },
//                         tooltips: {
//                             mode: "index",
//                             intersect: false
//                         }
//                     }
//                 }
//             />
//             {/* <div className="timeline__container">
//                 <div className="timeline__buttons__container">
//                     <div className="timeline__button">Day</div>
//                     <div className="timeline__button">Week</div>
//                     <div className="timeline__button">Month</div>
//                     <div className="timeline__button">Year</div>
//                     <div className="timeline__button active">All</div>
//                 </div>
//             </div> */}
//         </div>
//     )
// }

// export default LineGraph
