import React, {Component} from 'react'
import './Stats.css'
import WatchRow from './WatchRow'
import PositionRow from './PositionRow.js'
import ModalWatch from './ModalWatch.js'


class Stats extends Component {
    constructor(props){
        super(props);
        this.state = {
            positions: [],
            watchlists: [],
            modalOpen: false,
        }
        this.newWatchClick = this.newWatchClick.bind(this);
    }

    async watchDeleteClicked(id){
        const res = await this.props.alpaca.deleteWatchlist(id);
        console.log(res);
        this.refreshPage();
    }

    setModalOpen(bool){
        if(bool){
            this.setState({
                modalOpen: true,
            });
        }
        else{
            this.setState({
                modalOpen: false,
            })
        }
    }

    refreshPage(){
        window.location.reload(false);
    }

    newWatchClick(){
        this.setModalOpen(true);
    }
    componentDidMount(){
        // const getStockData = async (stock) =>{
        //     const temp = await this.props.dataFromParent.getBars('day', stock, {limit: 1});
        //     return temp;
        // }

        const getWatchlistInfo = async (watchlist) =>{
            const temp = await this.props.alpaca.getWatchlist(watchlist.id);
            return temp;
        }

        const updateState = async () => {
            let watchlistsData = [];
            const watchlists = await this.props.alpaca.getWatchlists();
            let watchlistsPromises = []
            watchlists.map((watchlist) => {
                watchlistsPromises.push(
                    getWatchlistInfo(watchlist).then((res) => {
                        watchlistsData.push({
                            name: watchlist.name,
                            id: watchlist.id,
                            assets: res.assets
                        })
                    })
                )
            });
            Promise.all(watchlistsPromises).then(() =>{
                this.setState({
                    watchlists: watchlistsData,
                });
            });

            const positions = await this.props.alpaca.getPositions();
            this.setState({
                positions: positions,
            })

        }

        updateState();
    }

    render() {
        return (
            <div className="stats">
                <div className="stats__container">
                    <div className="stats__header">
                        <p>Positions</p>
                    </div>
                    {
                        this.state.positions.map((position, i) => (
                            <div key={i} className="stats__content">
                                <PositionRow position={position}/>
                            </div>
                        ))
                    }
                    {
                        this.state.watchlists.map((watchlist, i) => (
                            <div key={i}>
                                <div key={i} className="stats__header stats__list">
                                    <p>{watchlist.name}</p>
                                    <p className="deleteBtn" onClick={() => {this.watchDeleteClicked(watchlist.id)}}>x</p>
                                </div>
                                {
                                    watchlist.assets.map((asset, j) => (
                                        <div key={j} className="stats__content">
                                            <WatchRow
                                                key={asset.symbol}
                                                symbol={asset.symbol}
                                                name={asset.name}
                                                alpaca={this.props.alpaca}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                    <div className="stats__newlist"> 
                        <p onClick={this.newWatchClick}>Add a new list</p>
                    </div>
                    <div className="stats__modal">
                       { this.state.modalOpen? <ModalWatch alpaca={this.props.alpaca} onClose={()=>this.setModalOpen(false)} refreshPage={()=>this.refreshPage()}/> : null}
                    </div>
                </div>
            </div>
        )
    }
}
export default Stats




// function Stats() extends Component{
    
//     const [stockData, setstockData] = useState([]);

//     const getStockData = (stock) => {
//         this.props.alpaca.getBars('1Min',stock).then(res =>{
//             return res;
//         })
//         // this.props.alpaca.getWatchlist(this.props.alpaca.getWatchlists()[0].id)
//     };

//     useEffect(()=>{
//         let stocks = ["TSLA"];
//         let promises = [];
//         stocks.map((stock) => {
//             promises.push(
//                 getStockData(stock).then((res)=>{
//                     console.log(res);
//                 })
//             )
//         })
//     },[])

//     return (
//         <div className="stats">
//             <div className="stats__container">
//                 <div className="stats__header">
//                     <p>Stocks</p>
//                 </div>
//                 <div className="stats__content">
//                     <div className="stats__rows">
// {/* for current */}
//                     </div>
//                 </div>
//                 <div className="stats__header">
//                     <p>Lists</p>
//                 </div>
//                 <div className="stats__content">
// {/* watchlist */}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Stats
