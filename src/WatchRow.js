import React, { Component } from 'react'
import './WatchRow.css'

class WatchRow extends Component{
    constructor(props){
        super(props);
        this.state = {
            stockData: [],
            prevClose: "",
            curOpen: "",
            curClose: "",
        }

    }

    calcPercent(){
        const percentChange = (((this.state.curClose / this.state.prevClose)-1)*100).toFixed(2);
        
        return percentChange;
    }


    componentDidMount(){
        const getStockData = async (stock) => {
                const temp = await this.props.alpaca.getBars('day', stock, {limit: 2});
                
                this.setState({
                    stockData: temp[this.props.symbol][0],
                    prevClose: temp[this.props.symbol][0].closePrice,
                    curOpen: temp[this.props.symbol][1].openPrice,
                    curClose: temp[this.props.symbol][1].closePrice,
                })
        }

        getStockData(this.props.symbol);
    }

    render(){
        return (
            <div className="row">
                <div className="row__intro">
                    <h1>{this.props.symbol}</h1>
                    <p>{this.props.name.substring(0, this.props.name.indexOf("Inc.")+4)}</p>
                </div>
                <div className="row__numbers">
                    <p className="row__price">{this.state.curClose}</p>
                    <p style={{ color: this.calcPercent()<0 ? "red": "#5AC53B"}} className="row__percentage">{this.calcPercent()}%</p>
                </div>
            </div>
        )
    }
}
export default WatchRow

// function StatsRow(props) {
//     return (
//         <div className="row">
//             <div className="row__intro">
//                 <h1>{props.name}</h1>
//                 <p>200 shares</p>
//             </div>
//             <div className="row__chart">
//                 {/* <img src={StockChart} height={16}/> */}
//             </div>
//             <div className="row__numbers">
//                 <p className="row__price">100</p>
//                 <p className="row__percentage">100</p>
//             </div>
//         </div>
//     )
// }

// export default StatsRow
