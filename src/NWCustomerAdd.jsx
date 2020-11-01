import React, { Component } from 'react';
import './App.css';


class NWCustomerAdd extends Component {
    constructor(props) {
        super(props);   
        this.state = { value: ''};
        this.state = { CustomerId: '', CompanyName: '', ContactName: ''} 

        this.handleChangeCustomerId = this.handleChangeCustomerId.bind(this);
        this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
        this.handleChangeContactName = this.handleChangeContactName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    dismiss() {
        this.props.unmountMe();
    }
    handleChangeCustomerId(e) {
        var syote = e.target.value;
        this.setState({...this.state, CustomerId: syote.toUpperCase()});    
    }
    handleChangeCompanyName(e) {
        var syote = e.target.value;
        this.setState({...this.state, CompanyName: syote});    
    } 
    handleChangeContactName(e) {
        var syote = e.target.value;
        this.setState({...this.state, ContactName: syote});    
    } 
    handleSubmit(event) {
        event.preventDefault();
        this.insertoiKantaan();
    }
    insertoiKantaan() {
        // Luodaan json objekti
        const kund = {
           CustomerId: this.state.CustomerId,
           CompanyName: this.state.CompanyName,
           ContactName: this.state.ContactName
        };
        const kundJson = JSON.stringify(kund);
        // Backendin urin alku
        const apiUrl = process.env.REACT_APP_BASE_URL + "customers/";
        /* const apiUrl = 'https://localhost:5001/api/customers/'; */
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: kundJson
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                if (success) {
                   this.dismiss();
                }
            });
    }
    render() {
        return (
            <form className="box3" onSubmit={this.handleSubmit}>
                <input type="text" title="Asiakastunnus" placeholder="Asiakastunnus" 
                onChange={this.handleChangeCustomerId} />
                <input type="text" title="Yhtiön nimi" placeholder="Asiakkaan nimi" 
                onChange={this.handleChangeCompanyName} />
                <input type="text" title="Yhteyshenkilö" placeholder="Yhteys henkilö" 
                onChange={this.handleChangeContactName} />
                <button type="submit">Lisää asiakas</button>
            </form>
        );
    }  
}

export default NWCustomerAdd;
