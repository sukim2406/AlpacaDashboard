import React, { Component } from 'react'
import './App.css';
import Header from './Header'
import Newsfeed from './Newsfeed'
import Stats from './Stats'

require('dotenv').config();
const Alpaca = require('@alpacahq/alpaca-trade-api');


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buying_power: "",
      equity: "",
      watchlistId: "",
      watchlists: [],
    };

    this.alpaca = new Alpaca({
      keyId: process.env.REACT_APP_API_KEY,
      secretKey: process.env.REACT_APP_SECRET_KEY,
      paper: true
    })
  }

  componentDidMount() {
    const power = async () => {
      const res = await this.alpaca.getAccount();
      let watchlist = await this.alpaca.getWatchlists();
      if(watchlist.length === 0){  
        this.alpaca.addWatchlist("watchlist", []);
        watchlist = await this.alpaca.getWatchlist();
      }
      
      this.setState({
        buying_power: res.buying_power,
        equity: res.equity,
        watchlistId: watchlist[0].id,
        watchlists: watchlist,
      });

      // const temp1 = await this.alpaca.createOrder({
      //   symbol: "ARKK",
      //   qty: 25,
      //   side: 'buy',
      //   type: 'market',
      //   time_in_force: 'gtc',
      // });
      // console.log(temp1);
    };
    power();
  }

  render () {
    return(
      <div className="App">
      {/* Header */}
        <div className="app__header">
          <Header alpaca = {this.alpaca}/>
        </div>

        {/* Body */}
        <div className="app__body">
          <div className="app__container">
            <Newsfeed alpaca = {this.alpaca}/> 
            <Stats alpaca = {this.alpaca}/>
          </div>
        </div>
      </div>      
    );
  }
}

export default App;
