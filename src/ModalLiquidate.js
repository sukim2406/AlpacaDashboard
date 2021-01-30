import React, { Component } from 'react'
import ReactDom from 'react-dom'
import './ModalLiquidate.css'

export default class ModalLiquidate extends Component {
    constructor(props){
        super(props);

        this.liquidateAll = this.liquidateAll.bind(this);
    }

    async liquidateAll(){
        const res = await this.props.alpaca.closeAllPositions();
        console.log(res);
        this.props.refreshPage();
        this.props.onClose();
    }

    render() {
        return ReactDom.createPortal(
            <div className="modalLiquidate">
                <div className="modalLiquidate__overlay">

                </div>
                <div className="modalLiquidate__container">
                    <div className="modalLiquidate__header">
                        <p>Are you sure you want to liquidate all of your assets?</p>
                    </div>
                    <div className="modalLiquidate__btn">
                        <button onClick={this.liquidateAll}>Liquidate</button>
                        <button onClick={this.props.onClose}>Cancel</button>
                    </div>
                </div>
            </div>,
            document.getElementById('portalLiquidate')
        )
    }
}
