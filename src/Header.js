// import React from 'react'
import Logo from './logo-temp.svg'
import './Header.css'
import Modal from './Modal.js'
import ModalLiquidate from './ModalLiquidate.js'

import React, { Component } from 'react'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            barData: '',
            lastTrade: '',
            assetData: '',
            modalOpen: false,
            liquidateOpen: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.liquidateClicked = this.liquidateClicked.bind(this);
    }

    liquidateClicked(){
        this.setLiquidateOpen(true);
    }

    setLiquidateOpen(bool){
        if(bool){
            this.setState({
                liquidateOpen: true,
            })
        }
        else{
            this.setState({
                liquidateOpen: false,
            })
        }
    }

    refreshPage(){
        window.location.reload(false);
    }

    setModalOpen(bool){
        if(bool){
            this.setState({
                modalOpen: true,
            })
        }
        else{
            this.setState({
                modalOpen: false,
            })
        }
    }

    handleChange(e) {
        const value = e.target.value;
        if(!this.state.modalOpen){
                this.setState({
                    value: value,
                })
        }
    }

    async keyPress(e){
        if(e.keyCode===13){
            this.setModalOpen(true);
            try{
                const barData = await this.props.alpaca.getBars('1D',this.state.value, {limit: 2});
                const lastTrade = await this.props.alpaca.lastTrade(this.state.value);
                const assetData = await this.props.alpaca.getAsset(this.state.value);
                this.setState({
                    barData: barData[assetData.symbol][1],
                    lastTrade: lastTrade.last.price,
                    assetData: assetData
                })
            }
            catch(err){
                console.log("ticker not found")
            }
        }
    }


    render() {
        return (
            <div className="header__wrapper">
                {/* logo */}
                <div className="header__logo">
                    <img src={Logo} width={25} alt="Rocket" />
                </div>
                
                {/* search bar */}
                <div className="header__search">
                    <div className="header__searchContainer">
                        <input value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange} placeholder="Ticker (ex. SPY)" type="text" />
                        <Modal modalOpen={this.state.modalOpen} refreshPage={() => this.refreshPage()}onClose={() => this.setModalOpen(false)} barData={this.state.barData} lastTrade={this.state.lastTrade} assetData={this.state.assetData} alpaca={this.props.alpaca}/>
                    </div>
                </div>
                
                {/* menu items */}
                <div className="header__menuItems">
                    <a onClick={this.liquidateClicked}>Liquidate ALL</a>
                </div>
                <div className="header__liquidateModal">
                    { this.state.liquidateOpen? <ModalLiquidate refreshPage={() => this.refreshPage()} onClose={() => this.setLiquidateOpen(false)} alpaca={this.props.alpaca}/> : null }
                </div>
            </div>
        )
    }
}
export default Header




// function Header() {
//     return (
//         <div className="header__wrapper">
//             {/* logo */}
//             <div className="header__logo">
//                 <img src={Logo} width={25} alt="Rocket" />
//             </div>
            
//             {/* search bar */}
//             <div className="header__search">
//                 <div className="header__searchContainer">
//                     <input placeholder="Search" type="text" />
//                 </div>
//             </div>
            
//             {/* menu items */}
//             <div className="header__menuItems">
//                 <a href="#">Free Stocks</a>
//                 <a href="#">Portfolio</a>
//                 <a href="#">Cash</a>
//                 <a href="#">Messages</a>
//                 <a href="#">Account</a>
//             </div>
//         </div>
//     )
// }

// export default Header
