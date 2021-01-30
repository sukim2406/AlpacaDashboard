import React, { Component } from 'react'
import './PositionRow.css'

class PositionRow extends Component {
    render() {
        return (
            <div className="positionRow">
                <div className="positionRow__intro">
                    <h1>{this.props.position.symbol}</h1>
                    <p>{this.props.position.qty} shares</p>
                </div>
                <div className="positionRow__numbers">
                    <h3>avg.price</h3>
                    <p>{parseFloat(this.props.position.avg_entry_price).toFixed(2)}</p>
                    <h3>cost basis</h3>
                    <p>{parseFloat(this.props.position.cost_basis).toFixed(2)}</p>
                </div>
                <div className="positionRow__numbers">
                    <h3>cur.price</h3>
                    <p>{parseFloat(this.props.position.current_price).toFixed(2)}</p>
                    <h3>value</h3>
                    <p>{parseFloat(this.props.position.market_value).toFixed(2)}</p>
                </div>
                <div className="positionRow__change">
                    <h3>P/L</h3>
                    <p style={{ color: this.props.position.unrealized_pl < 0 ? "red" : "#5AC53B"}}>{parseFloat(this.props.position.unrealized_pl).toFixed(2)}</p>
                    <h3>P/L (%)</h3>
                    <p style={{ color: (parseFloat(this.props.position.unrealized_plpc)* 100).toFixed(2) < 0 ? "red" : "#5AC53B"}}>{(parseFloat(this.props.position.unrealized_plpc)* 100).toFixed(2)}</p>
                </div>
            </div>
        )
    }
}
export default PositionRow
