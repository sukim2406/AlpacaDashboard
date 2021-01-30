import React, { Component } from 'react'
import './OrderRow.css'

export default class OrderRow extends Component {
    constructor(props){
        super(props);
        this.state = {
            orderTime: "",
            orderSymbol: "",
            orderSide: "",
            orderType: "",
            orderPrice: "",
            orderQty: "",
            orderStatus: "",
        }

        this.cancelClicked = this.cancelClicked.bind(this);
    }

    refreshPage(){
        window.location.reload(false);
    }

    async cancelClicked(){
        try{
            const res = await this.props.alpaca.cancelOrder(this.props.order.id);
            console.log(res);
            this.refreshPage();
        }
        catch(error){
            console.log("error canceling");
        }
    }

    formatDate(iso) {
        let date = new Date(iso);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();    
        let hour = date.getHours();
        let minute = date.getMinutes();

        if (dt < 10){
            dt = '0' + dt;
        }

        if (month < 10){
            month = '0' + month;
        }

        return(year+'/'+month+'/'+dt + " " + hour + ":" + minute);
    }

    getOrderInfo(){
        let orderTime =  this.props.order.created_at;
        let orderPrice = "N/A";
        if(this.props.order.order_type === "limit"){
            orderPrice = this.props.order.limit_price;
        }
        if(this.props.order.order_type === "stop"){
            orderPrice = this.props.order.stop_price;
        }
        if(this.props.order.trail_price){
            orderPrice = this.props.order.trail_price;
        }
        
        let orderQty = this.props.order.qty;
        
        if(this.props.order.status === "filled"){
            orderTime = this.props.order.filled_at;
            orderPrice = this.props.order.filled_avg_price;
            orderQty = this.props.order.filled_qty;
        }
        else if(this.props.order.status === "canceled"){
            orderTime = this.props.order.canceled_at;
        }
        else if(this.props.order.status === "failed"){
            orderTime = this.props.order.failed_at;
        }
        else if(this.props.order.status === "expried"){
            orderTime = this.props.order.expired_at;
        }

        orderTime = this.formatDate(orderTime);

        let orderInfo = {
            orderTime: orderTime,
            orderSymbol: this.props.order.symbol,
            orderSide: this.props.order.side,
            orderType: this.props.order.order_type,
            orderQty: orderQty,
            orderStatus: this.props.order.status,
            orderPrice : orderPrice,
        }

        return orderInfo;
    }

    render() {
        const orderInfo = this.getOrderInfo();
        return (
            <div className="orderRow">
                <p>{orderInfo.orderTime}</p>
                <p>{orderInfo.orderSymbol}</p>
                <p>{orderInfo.orderSide}</p>
                <p>{orderInfo.orderType}</p>
                <p>{orderInfo.orderPrice}</p>
                <p>{orderInfo.orderQty}</p>
                <p>{orderInfo.orderStatus}</p>
                <p style = {{ curser: orderInfo.orderStatus === "new" ? "pointer" : orderInfo.orderStatus ===  "accepted" ? "pointer" : "" }} className="orderRow__cancel" onClick={this.cancelClicked}>{orderInfo.orderStatus === "new" ? "x" : orderInfo.orderStatus === "accepted" ? "x" : " "}</p>
                {/* <p>{this.props.order.status === "filled" ? this.formatDate(this.props.order.filled_at) 
                    :this.props.order.stattus === "canceled" ? this.formatDate(this.props.order.canceled_at) 
                    :this.props.order.status === "expired" ? this.formatDate(this.props.order.expired_at)
                    :this.formatDate(this.props.order.created_at)}</p>
                <p>{this.props.order.symbol}</p>
                <p>{this.props.order.side}</p> 
                <p>{this.props.order.order_type}</p>
                <p>{this.props.order.order_type === "market" && this.props.order.status == "filled" ?  this.props.order.filled_avg_price 
                    :this.props.order.order_type === "limit" ? this.props.order.limit_price
                    :"N/A"}</p>
                <p>{this.props.order.qty}</p>
                <p>{this.props.order.status}</p> */}
            </div>
        )
    }
}
