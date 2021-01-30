import React, { Component } from 'react'
import './ModalWatch.css'
import ReactDom from 'react-dom'

export default class ModalWatch extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitClicked = this.submitClicked.bind(this);
    }

    handleChange(e){
        const value = e.target.value;
        this.setState({
            value: value,
        })
    }

    async submitClicked(){
        const res = await this.props.alpaca.addWatchlist(this.state.value, []);
        this.props.refreshPage();
        this.props.onClose();
    }

    render() {
        return ReactDom.createPortal(
            <div className = "modalWatch">
                <div className="modalWatch__overlay">

                </div>
                <div className = "modalWatch__container">
                    <div className = "modalWatch__header">
                        <p>Add a new watchlist</p>
                    </div>
                    <div className = "modalWatch__input">
                        <input value={this.state.value} onChange={this.handleChange} placeholder="Watchlist"/>
                    </div>
                    <div className="modalWatch__btn">
                        <button onClick={this.submitClicked}>Submit</button>
                        <button onClick={this.props.onClose}>Cancel</button>
                    </div>
                </div>
            </div>,
            document.getElementById('portalWatch')
        )
    }
}
