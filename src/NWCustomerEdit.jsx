import React, { Component } from 'react';
import './App.css';


class NWCustomerEdit extends Component {
    constructor(props) {
        super(props);   
        this.state = { value: ''};
        this.state = {asiakasObj: [], CustomerId: '', CompanyName: '', ContactName: '', ContactTitle: '', Address: ' ',
           PostalCode: '', City: '', Country: '', Phone: '', Fax:''} 

        this.handleChangeCustomerId = this.handleChangeCustomerId.bind(this);
        this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
        this.handleChangeContactName = this.handleChangeContactName.bind(this);
        this.handleChangeContactTitle = this.handleChangeContactTitle.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeFax = this.handleChangeFax.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("<==== address: " + this.props.asiakasObj.address + " =====>");
        this.setState({
            CustomerId: this.props.asiakasObj.customerId,
            CompanyName: this.props.asiakasObj.companyName,
            ContactName: this.props.asiakasObj.contactName,
            ContactTitle: this.props.asiakasObj.contactTitle,
            Address: this.props.asiakasObj.address,
            PostalCode: this.props.asiakasObj.postalCode,
            City: this.props.asiakasObj.city,
            Country: this.props.asiakasObj.country,
            Phone: this.props.asiakasObj.phone,
            Fax: this.props.asiakasObj.fax }
        );
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
    handleChangeContactTitle(e) {
        var syote = e.target.value;
        this.setState({...this.state, ContactTitle: syote});    
    }
    handleChangeAddress(e) {
        var syote = e.target.value;
        this.setState({...this.state, Address: syote});    
    }
    handleChangePostalCode(e) {
        var syote = e.target.value;
        this.setState({...this.state, PostalCode: syote});    
    }
    handleChangeCity(e) {
        var syote = e.target.value;
        this.setState({...this.state, City: syote});    
    }
    handleChangeCountry(e) {
        var syote = e.target.value;
        this.setState({...this.state, Country: syote});    
    }
    handleChangePhone(e) {
        var syote = e.target.value;
        this.setState({...this.state, Phone: syote});    
    }
    handleChangeFax(e) {
        var syote = e.target.value;
        this.setState({...this.state, Fax: syote});    
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
           ContactName: this.state.ContactName,
           ContactTitle: this.state.ContactTitle,
           Address: this.state.Address,
           PostalCode: this.state.PostalCode,
           City: this.state.City,
           Country: this.state.Country,
           Phone: this.state.Phone,
           Fax: this.state.Fax};
     
        const kundJson = JSON.stringify(kund);
        // Backendin urin alku
        const baseUrl = process.env.REACT_APP_BASE_URL;
        /* const apiUrl = 'https://localhost:5001/api/customers/' +
                    this.state.CustomerId; */
        const apiUrl = baseUrl + 'customers/' + this.state.CustomerId;            
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: kundJson
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log('SUCCESS ===>  ${success}');
                if (success) {
                   this.dismiss();
                }
            });
    }
    render() {
        return (
            <form className="box3" onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.CustomerId}  title="Asiakastunnus" placeholder="Asiakastunnus" 
                onChange={this.handleChangeCustomerId} />
                <input type="text" value={this.state.CompanyName} title="Yhtiön nimi" placeholder="Asiakkaan nimi" 
                onChange={this.handleChangeCompanyName} />
                <input type="text" value={this.state.ContactName} title="Yhteyshenkilö" placeholder="Yhteys henkilö" 
                onChange={this.handleChangeContactName} />
                <input type="text" value={this.state.ContactTitle} title="Titteli" placeholder="Titteli" 
                onChange={this.handleChangeContactTitle} />
                <input type="text" value={this.state.Address} title="Osoite" placeholder="Osoite" 
                onChange={this.handleChangeAddress} />
                <input type="text" value={this.state.PostalCode} title="Postinumero" placeholder="Postinumero" 
                onChange={this.handleChangePostalCode} />
                <input type="text" value={this.state.City} title="Paikkakunta" placeholder="Paikkakunta" 
                onChange={this.handleChangeCity} />
                <input type="text" value={this.state.Country} title="Maa" placeholder="Maa" 
                onChange={this.handleChangeCountry} />
                <input type="text" value={this.state.Phone} title="Puhelin" placeholder="Puhelin" 
                onChange={this.handleChangePhone} />
                <input type="text" value={this.state.Fax} title="Fax" placeholder="Fax" 
                onChange={this.handleChangeFax} />
                <button type="submit">Päivitä asiakas</button>
            </form>
        );
    }  
}

export default NWCustomerEdit;
