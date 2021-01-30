import React, { Component } from 'react'
import './Newsfeed.css'
import LineGraph from './LineGraph.js'
import InfoSection from './InfoSection.js'

class Newsfeed extends Component {
    constructor(props){
        super(props);
        this.state = {
            accountInfo: "",
            accountHistory: {
                base_value: "",
                equity: [],
                profit_loss: [],
                profit_loss_pct: [],
                timeframe: "",
                timestamp: []
            },
            timelines: [
                {
                    id: 0,
                    text: "Day",
                    className: "newsfeed__timeline__button",
                    period: "1D",
                    timeframe: "1H",
                    text_p: "today",
                },
                {
                    id: 1,
                    text: "Week",
                    className: "newsfeed__timeline__button",
                    period: "1W",
                    timeframe: "1D",
                    text_p: "weekly",
                },
                {
                    id: 2,
                    text: "Month",
                    className: "newsfeed__timeline__button",
                    period: "1M",
                    timeframe: "1D",
                    text_p: "monthly",
                },
                {
                    id: 3,
                    text: "Year",
                    className: "newsfeed__timeline__button",
                    period: "1A",
                    timeframe: "1D",
                    text_p: "yearly",
                },
                {
                    id: 4,
                    text: "All",
                    className: "newsfeed__timeline__button",
                    period: "all",
                    timeframe: "1D",
                    text_p: "all time",
                },
            ],
            activeLink: 0,
            profit: "",
            profit_pct: ""
        }

        this.handleClick = id => {
            this.getportHist(id);
            // console.log(portHist);
            this.setState({ 
                activeLink: id, 
                // accountHistory: {
                //     ...portHist.portHis,
                // },
                // profit: portHist.profit,
                // profit_pct: portHist.profit_pct,
            });
        }
    }

    handleClick(e) {
        this.setState((prevState) =>{
            return { selected: !prevState.selected }
        });
    }

    getEndDate(){
        const today = new Date();
        let todayISO = today.toISOString();

        todayISO = todayISO.substring(0,10);

        return todayISO
    }

    async getportHist(id){
        const portHis = await this.props.alpaca.getPortfolioHistory({
            // date_end: this.getEndDate(),
            period: this.state.timelines[id].period,
            timeframe: this.state.timelines[id].timeframe,
            extended_hours: false
        });
        let profit = parseFloat(portHis.profit_loss[portHis.profit_loss.length-1]);        
        let profit_pct = (parseFloat(portHis.profit_loss_pct[portHis.profit_loss_pct.length-1]) * 100).toFixed(2);

        this.setState({
            accountHistory: {
                ...portHis,
            },
            profit: profit,
            profit_pct: profit_pct,
        })

        // return {
        //     portHis : portHis,
        //     profit : profit,
        //     profit_pct : profit_pct,
        // };
    }

    async getProfit(portHis){
        let profit = parseFloat(portHis.profit_loss[portHis.profit_loss.length-1]);
        return profit;
    }

    async getProfitPct(portHis){
        let profit_pct = (parseFloat(portHis.profit_loss_pct[portHis.profit_loss_pct.length-1]) * 100).toFixed(2);
        return profit_pct;
    }

    componentDidMount(){
        const getAccountInfo = async () => {
            const accountInfo = await this.props.alpaca.getAccount();
            const accountHis = await this.props.alpaca.getPortfolioHistory({
                period: this.state.timelines[this.state.activeLink].period,
                timeframe: this.state.timelines[this.state.activeLink].timeframe,
                extended_hours: false
            })
            let profit = parseFloat(accountHis.profit_loss[accountHis.profit_loss.length-1]);        
            let profit_pct = (parseFloat(accountHis.profit_loss_pct[accountHis.profit_loss_pct.length-1]) * 100).toFixed(2);

            this.setState({
                accountInfo: accountInfo,
                accountHistory: {
                    ...accountHis
                },
                profit: profit,
                profit_pct: profit_pct,
            })

            // const accountHistory = await this.props.alpaca.getPortfolioHistory({
            //     // date_start: this.state.accountInfo.created_at,
            //     date_end: '2021-01-17',
            //     period: this.state.timelines[this.state.activeLink].period,
            //     timeframe: this.state.timelines[this.state.activeLink].timeframe,
            //     extended_hours: false
            // });
            // console.log(this.state.timelines[this.state.activeLink].timeframe);
            // console.log(accountHistory);
        }

        getAccountInfo();
    }

    render() {
        const { timelines, activeLink } = this.state;

        return (
            <div className="newsfeed">
                <div className="newsfeed__container">
                    <div className="newsfeed__chartSection">
                        <div className="newsfeed__portfolioValue">
                            <h1>$ {this.state.accountInfo.equity}</h1> 
                                <div className="newsfeed__portfolioValue__p">
                                    <p style={{color: this.state.profit < 0 ? "red" : "#5AC53B"}}>{this.state.profit < 0 ? "-$"+(this.state.profit*-1) : "+$"+this.state.profit} ({this.state.profit_pct < 0 ? "-"+(this.state.profit_pct*-1): "+"+this.state.profit_pct}%)</p>
                                    <p>{this.state.timelines[this.state.activeLink].text_p}</p>   
                                </div>       
                        </div>
                        <div className="newsfeed__buyingPower">
                            <h2> Buying Power </h2> 
                            <h2> $ {this.state.accountInfo.buying_power} </h2>
                        </div>
                        <div className="newsfeed__chart">
                            <LineGraph data={this.state.accountHistory}/>
                        </div>
                        <div className="newsfeed__timeline__container">
                            <div className="newsfeed__timeline__button__container">
                                {timelines.map(timeline =>{
                                    return(
                                        <div key={timeline.id} onClick = {() => this.handleClick(timeline.id)} className={timeline.className + (timeline.id === activeLink ? " active" : "")}>{timeline.text}</div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="newsfeed__infoSection">
                            <InfoSection  alpaca={this.props.alpaca}/>
                    </div>
                </div>
            </div>
        )   
    }
}
export default Newsfeed

// function Newsfeed() {
//     return (
//         <div className="newsfeed">
//             <div className="newsfeed__container">
//                 <div className="newsfeed__chartSection">
//                     <div className="newsfeed__portfolioValue">
//                         <h1>$ 999,999,112.99</h1> 
//                         <p>+$99.99 (+0.04%) Today</p>                       
//                     </div>
//                     <div className="newsfeed__chart">
//                         <LineGraph />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Newsfeed
