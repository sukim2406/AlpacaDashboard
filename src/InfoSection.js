import React, { Component } from 'react'
import './InfoSection.css'
import OrderRow from './OrderRow.js'

class InfoSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            orderInfo: [],
            temp: ['hi'],
        }
    }

    componentDidMount(){
        const today = new Date();
        const getOrders = async () => {
            const orders = await this.props.alpaca.getOrders({
                status: 'all',
                after: '2021-01-01T00:00:00Z',
                until: today.toISOString(),
                limit: '100',
                direction: 'desc'
            });
            
            this.setState({
                orderInfo: orders
            });
        }

        getOrders();
    }

    render() {
        return (
            <div className="infosection">
                <div className="infosection__box">
                    <div className="infosection__header">
                        <p>Orders</p>
                    </div>
                    <div className="infosection__legend">
                        <p>Time</p>
                        <p>Symbol</p>
                        <p>Side</p>
                        <p>Type</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Status</p>
                        <p>Cancel</p>
                    </div>
                    <div className="infosection__content">
                        {
                            this.state.orderInfo.map((order, i) => (
                                <OrderRow key={i} order={order} alpaca={this.props.alpaca} />
                            ))
                        }
                    </div>
                </div>                
            </div>
        )
    }
}
export default InfoSection
