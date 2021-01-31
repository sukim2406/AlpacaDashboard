import React, { Component } from 'react'
import './Modal.css'
import ReactDom from 'react-dom'

export default class Modal extends Component{
    constructor(props){
        super(props);
        this.state = {
            watchlists: [],
            orderQty: "",
            orderSide: "",
            orderType: "",
            orderTime: "",
            orderLimit: "",
            orderStop: "",
            orderTrailD: "",
            orderTrailP: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitClicked = this.submitClicked.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async submitClicked(){
        try{
            await this.props.alpaca.createOrder({
                symbol: this.props.assetData.symbol,
                qty: this.state.orderQty,
                side: this.state.orderSide,
                type: this.state.orderType,
                time_in_force: this.state.orderTime,
                limit_price: this.state.orderLimit === ""? null : this.state.orderLimit,
                stop_price: this.state.orderStop === ""? null : this.state.orderStop,
                trail_price: this.state.orderTrailD === ""? null : this.state.orderTrailD,
                trail_percent: this.state.orderTrailP === ""? null : this.state.orderTrailP,
            })

            this.props.refreshPage();
            this.props.onClose();
        }
        catch(err){
            let x = document.getElementById("orderError");
            x.style.display = "block";
        }
    }

    async watchlistAddClicked(watchlist, symbol){
        const res = await this.props.alpaca.addToWatchlist(watchlist, symbol);
        console.log(res);
        this.props.refreshPage();
        this.props.onClose();
    }

    async watchlistRemoveClicked(watchlist, symbol){
        const res = await this.props.alpaca.deleteFromWatchlist(watchlist, symbol);
        console.log(res);
        this.props.refreshPage();
        this.props.onClose();
    }

    assetExists(watchlist, symbol){
        let result = false;
        watchlist.assets.forEach((asset) => {
            if(asset.symbol === symbol){
                result = true;
            }
        });
        return result;
    }
    
    componentDidMount(){

        const getWatchlistInfo = async (watchlist) =>{
            const watchlistData = await this.props.alpaca.getWatchlist(watchlist.id);
            return watchlistData;
        }

        const getWatchlists = async () =>{
            let watchlistData = [];
            const watchlists = await this.props.alpaca.getWatchlists();
            let watchlistsPromises = [];
            watchlists.forEach((watchlist) => {
                watchlistsPromises.push(
                    getWatchlistInfo(watchlist).then((res) => {
                        watchlistData.push({
                            name: watchlist.name,
                            id: watchlist.id,
                            assets: res.assets
                        })
                    })
                )
            });
            Promise.all(watchlistsPromises).then(() => {
                this.setState({
                    watchlists: watchlistData,
                })
            })
        }

        getWatchlists();

    }

    render() {
        if(!this.props.modalOpen) return null;

        return ReactDom.createPortal(
            <div className="modal">
                <div className="modal__overlay">
                </div>
                <div className="modal__container">
                    <div className="modal__text">
                        <div className="modal__container__title">
                            <h1>{this.props.assetData.symbol}</h1>
                            <p>{this.props.assetData.name}</p>
                        </div>
                        <div className="modal__container__padding"></div>
                        <div className="modal__container__price">
                            <h1>{this.props.lastTrade}</h1>
                            <p>{this.props.barData.closePrice}</p>
                        </div>
                    </div>
                    <div className="modal__assetInfo">
                        <div className="modal__assetInfo__info">
                            <p>class : {this.props.assetData.class}</p>
                            <p>exchange : {this.props.assetData.exchange}</p>
                            <p style={{ color: this.props.assetData.tradable ? "#5AC53B" : "red"}}>{this.props.assetData.tradable ? "Tradable" : "Not Tradable"}</p>
                        </div>
                        <div className="modal__assetInfo__numbers">
                            <p>Last Open : {this.props.barData.openPrice}</p>
                            <p>Last Close : {this.props.barData.closePrice}</p>
                            <p>Last High : {this.props.barData.highPrice}</p>
                            <p>Last Low : {this.props.barData.lowPrice}</p>
                            <p>Volume : {this.props.barData.volume}</p>
                        </div>
                    </div>
                    <div className="modal__watchlists">
                        <div className="modal__watchlists__header">
                            <h2>Add to a watchlist</h2>
                        </div>
                        <div className="modal__watchlists__list">
                            {
                                this.state.watchlists.map((watchlist, i) => (
                                    <div className="modal__watchlists__row" key={i}>
                                        {this.assetExists(watchlist, this.props.assetData.symbol)}
                                        <p>{watchlist.name}</p>
                                        <button disabled={this.props.assetData.symbol === "Not Found"? "disabled" : ""} onClick={this.assetExists(watchlist, this.props.assetData.symbol)? () => this.watchlistRemoveClicked(watchlist.id, this.props.assetData.symbol) : () => this.watchlistAddClicked(watchlist.id, this.props.assetData.symbol)}> {this.assetExists(watchlist, this.props.assetData.symbol)? "Remove" : "Add"}</button>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                    <div className="modal__order">
                        <div className="modal__order__header">
                            <h2>Order</h2>
                        </div>
                        <div className="modal__order__inputs">
                            <div className="modal__order__inputs__row">
                                <div className="modal__order__qty">
                                    <p>Quantity :</p>
                                    <input name="orderQty" value={this.state.orderQty} onChange={this.handleChange} type="text" placeholder="QTY"/>
                                </div>
                                <div className="modal__order__side">
                                    <p>Side :</p>
                                    <input name="orderSide" value={this.state.orderSide} onChange={this.handleChange} type="text" placeholder="buy / sell"/>
                                </div>
                            </div>
                            <div className="modal__order__inputs__row">
                                <div className="modal__order__type">
                                    <p>Type :</p>
                                    <input name="orderType" value={this.state.orderType} onChange={this.handleChange} type="text" placeholder="market / limit / stop / stop_limit / trailing_stop " />
                                </div>
                                <div className="modal__order__time">
                                    <p>Time In Force :</p>
                                    <input name="orderTime" value={this.state.orderTime} onChange={this.handleChange} type="text" placeholder="day / gtc / opg / ioc" />
                                </div>    
                            </div>
                            <div className="modal__order__inputs__row">
                                <div className="modal__order__limit">
                                    <p>Limit Price :</p>
                                    <input name="orderLimit" value={this.state.orderLimit} onChange={this.handleChange} type="text" placeholder="limit"/>
                                </div>
                                <div className="modal__order__stop">
                                    <p>Stop Price :</p>
                                    <input name="orderStop" value={this.state.orderStop} onChange={this.handleChange} type="text" placeholder="stop"/>
                                </div>
                            </div>
                            <div className="modal__order__inputs__row">
                                <div className="modal__order__trail__price">
                                    <p>Trail Stop Price :</p>
                                    <input name="orderTrailD" value={this.state.orderTrailD} onChange={this.handleChange} type="text" placeholder="trail $"/>
                                </div>
                                <div className="modal__order__trail__perc">
                                    <p>Trail Stop Percent :</p>
                                    <input name="orderTrailP" value={this.state.orderTrailP} onChange={this.handleChange} type="text" placeholder="trail %"/>
                                </div>
                            </div>
                        </div>
                        <div className= "modal__order__btn">
                            <button disabled={this.props.assetData.symbol === "Not Found"? "disabled" : ""} onClick={this.submitClicked}>Place Order</button>
                        </div>
                        <div id="orderError" className="modal__order__error">
                            <h3>Error: please check your order details</h3>
                        </div>
                    </div>
                    <div className="modal__container__btn">
                        <button onClick={this.props.onClose}>Close</button>
                    </div>
                </div>
            </div>,
            document.getElementById('portal')
        )
    }
}
