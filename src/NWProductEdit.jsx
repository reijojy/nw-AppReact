import React, { Component } from 'react';
import './App.css';

class NWProductEdit extends Component {
    constructor(props) {
        super(props);   
        this.state = { value: ''};
        this.state = { discontinuedChecked: 'checked'};
        this.state = {productObj: [], ProductId: '', ProductName: '', SupplierID: 0, CategoryID: 0, QuantityPerUnit: '',
        UnitPrice: 0.00, UnitsInStock: 0, UnitsOnOrder: 0, ReorderLevel: 0, Discontinued: false, ImageLink: ''} 

        this.handleChangeProductId = this.handleChangeProductId.bind(this);
        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeSupplierID = this.handleChangeSupplierID.bind(this);
        this.handleChangeCategoryID = this.handleChangeCategoryID.bind(this);
        this.handleChangeQuantityPerUnit = this.handleChangeQuantityPerUnit.bind(this);
        this.handleChangeUnitPrice = this.handleChangeUnitPrice.bind(this);
        this.handleChangeUnitsInStock = this.handleChangeUnitsInStock.bind(this);
        this.handleChangeUnitsOnOrder = this.handleChangeUnitsOnOrder.bind(this);
        this.handleChangeReOrderLevel = this.handleChangeReOrderLevel.bind(this);
        this.handleChangeDiscontinued = this.handleChangeDiscontinued.bind(this);
        this.handleChangeImageLink = this.handleChangeImageLink.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        console.log("<==== Tuotteen id: " + this.props.productObj.productId + " =====>");
        console.log("<==== Discontinued: " + this.props.productObj.discontinued + " =====>");
        this.setState({
            ProductId: this.props.productObj.productId,
            ProductName: this.props.productObj.productName,
            SupplierID: this.props.productObj.supplierId,
            CategoryID: this.props.productObj.categoryId,
            QuantityPerUnit: this.props.productObj.quantityPerUnit,
            UnitPrice: this.props.productObj.unitPrice,
            UnitsInStock: this.props.productObj.unitsInStock,
            UnitsOnOrder: this.props.productObj.unitsOnOrder,
            ReorderLevel: this.props.productObj.reorderLevel,
            Discontinued: this.props.productObj.discontinued, 
            ImageLink: this.props.productObj.imageLink
        });
    }
    dismiss() {
        this.props.unmountMe();
    }
    handleChangeProductId(e) {
        var syote = e.target.value;
        this.setState({...this.state, ProductId: syote});    
    }
    handleChangeProductName(e) {
        var syote = e.target.value;
        this.setState({...this.state, ProductName: syote});    
    }
    handleChangeSupplierID(e) {
        var syote = e.target.value;
        this.setState({...this.state, SupplierID: syote});    
    }
    handleChangeCategoryID(e) {
        var syote = e.target.value;
        this.setState({...this.state, CategoryID: syote});    
    }
    handleChangeQuantityPerUnit(e) {
        var syote = e.target.value;
        this.setState({...this.state,  QuantityPerUnit: syote});    
    }
    handleChangeUnitPrice(e) {
        /* alert(e.target.value) */;
        var syote = e.target.value;
        this.setState({...this.state,  UnitPrice: syote});
        // alert("Yksikköhinta ==> " + this.state.UnitPrice);    
    }
    handleChangeUnitsInStock(e) {
        var syote = e.target.value;
        this.setState({...this.state,  UnitsInStock: syote});    
    }
    handleChangeUnitsOnOrder(e) {
        var syote = e.target.value;
        this.setState({...this.state,  UnitsOnOrder: syote});    
    }
    handleChangeReOrderLevel(e) {
        var syote = e.target.value;
        this.setState({...this.state,  ReorderLevel: syote});    
    }
    handleChangeDiscontinued(e) {
        if(!this.state.Discontinued) {
            this.setState({...this.state,  Discontinued: true});
        } else {
            this.setState({...this.state,  Discontinued: false});
        }   
    }
    handleChangeImageLink(e) {
        var syote = e.target.value;
        this.setState({...this.state,  ImageLink: syote});    
    }
    handleSubmit(event) {
        // alert("Handle submit säger heijaa");
        event.preventDefault();
        this.insertoiKantaan(); 
    }
    insertoiKantaan() { 
         // Luodaan json objekti
         const produkt = {
            ProductId: parseInt(this.state.ProductId),
            ProductName: this.state.ProductName,
            SupplierID: parseInt(this.state.SupplierID),
            CategoryID: parseInt(this.state.CategoryID),
            QuantityPerUnit: this.state.QuantityPerUnit,
            UnitPrice: parseFloat(this.state.UnitPrice),
            UnitsInStock: parseInt(this.state.UnitsInStock),
            UnitsOnOrder: parseInt(this.state.UnitsOnOrder),
            ReorderLevel: parseInt(this.state.ReorderLevel),
            Discontinued: this.state.Discontinued,
            ImageLink: this.state.ImageLink
         };
         const produktJson = JSON.stringify(produkt);
         console.log("ProduktJSON ====>" + produktJson);
         // Backendin urin alku Vielä liitettävä tuotteen id
         const baseUrl = process.env.REACT_APP_BASE_URL_PRODUCTS;
         const apiUrl = baseUrl + this.state.ProductId 
         console.log("ApiURL ====>" + apiUrl);
         fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: produktJson 
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log('SUCCESS ===>  ${success}');
                if (success) {
                   this.dismiss();
                }
            }); 
            // this.dismiss();
    }    
    render() {
        return (
            <form className="box2" onSubmit={this.handleSubmit}>
                <input type="text" disabled value={this.state.ProductId}  title="Tuotekoodi" placeholder="Tuotekoodi" 
                size={4} onChange={this.handleChangeProductId} />
                <br></br>
                <input type="text" value={this.state.ProductName} title="Tuotteen nimi" placeholder="Tuotteen nimi" 
                onChange={this.handleChangeProductName} />
                <input type="text" value={this.state.SupplierID} title="Toimittajan tunnus" placeholder="Toimittajan tunnus" 
                onChange={this.handleChangeSupplierID} />
                 <input type="text" value={this.state.CategoryID} title="Kategoria" placeholder="Kategoria" 
                onChange={this.handleChangeCategoryID} />
                <input type="text" value={this.state.QuantityPerUnit} title="Pakkauskoko" placeholder="Pakkauskoko" 
                onChange={this.handleChangeQuantityPerUnit} /> 
                <input type="text" value={this.state.UnitPrice} title="Yksikköhinta" placeholder="Yksikköhinta" 
                onChange={this.handleChangeUnitPrice} /> 
                <input type="text" value={this.state.UnitsInStock} title="Varastossa" placeholder="Varastossa" 
                onChange={this.handleChangeUnitsInStock} />
                <input type="text" value={this.state.UnitsOnOrder} title="Tilauksilla varattuna" placeholder="Varattuna" 
                onChange={this.handleChangeUnitsOnOrder} />
                <input type="text" value={this.state.ReorderLevel} title="Tilauspiste" placeholder="Tilauspiste" 
                onChange={this.handleChangeReOrderLevel} />
                <br></br>
                <input type="checkbox" id="discontinued" checked={this.state.Discontinued} class="checkmark"
                onChange={this.handleChangeDiscontinued} />
                <label for="discontinued" class="labeltext">  Discontinued: </label> 
                <textarea rows="4" value={this.state.ImageLink} title="Kuvan linkki" placeholder="Kuvan linkki" 
                onChange={this.handleChangeImageLink} />
                <button type="submit">Päivitä Tuote</button>
            </form>
        );
    } 
}
export default NWProductEdit;