import React, {Component} from 'react';
import './App.css';
import NWProductEdit from './NWProductEdit';

class ProductFetch extends Component {
    constructor(props) {
        super(props);
        console.log("ProductFetch: Constructor");
        this.state = {
            products: [],
            recordcount: 0,
            start: 0,
            limit: 10,
            yksiTuote: [],
            ProductID2Del: "",
            // Opetusvideoissa nämä oli määritelty propseissa
            // renderChildEdit: true,
            // renderChildEdit: true,
            visible: "table"
        };
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
        this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
    }
    componentDidMount() {
        this.getProductData();
    }
    handleChildUnmount() {
        this.setState({renderChild : false})
        this.setState(this.handleClickTable);
        this.setState(this.getProductData);
    }
    handleChildUnmountEdit() {
        this.setState({renderChildEdit : false})
        this.setState(this.handleClickTable);
        this.setState(this.getProductData);
    }
    handleClickPrev = (event) => {
        let startvalue = this.state.start;
        if (startvalue > 0) {
            startvalue = startvalue-this.state.limit;
        }
        this.setState({
            start: startvalue,
        }, this.handleSubmit);
    }

    handleClickNext = (event) => {
       let startValue = this.state.start + this.state.limit;
       this.setState({
            start: startValue,
        }, this.handleSubmit);
    }
    handleSubmit() {
        this.getProductData();
    }
    handleClickTable = () => {
        this.setState({visible:"table"})
    }
    handleClickEdit = (dataObj, event) => {
        this.setState({
            yksiTuote: dataObj,
            visible: "editform",
            renderChildEdit: true 
        }) 
    }
    getProductData() {
        const baseUrl = process.env.REACT_APP_BASE_URL_PRODUCTS;
        let uri = baseUrl + 'R?offSet=' + this.state.start  +  '&limit=' + this.state.limit;;  
        console.log("<==== GetProductData osoitteesta  ====>" + uri);
                 
        fetch(uri)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({ products: json, recordcount: json.length});
            });
    }
    render() {
        console.log("ProductFetch: renderin alussa:");
        let viesti = "Rivejä " + this.state.recordcount;
        let taulukko = [];
        taulukko.push(<tr key="otsikko"><th>Id</th><th>Tuotteen nimi </th><th>Pakkauskoko</th>
            <th>Hinta</th><th>Saldo</th><th>Toiminnot</th></tr>);
        if (this.state.products.length > 0) { 
            for (let index = 0; index < this.state.products.length; index++) {
                const element = this.state.products[index];
                taulukko.push(<tr  key={element.customerId}>
                <td>{element.productId}</td>
                <td>{element.productName}</td>
                <td>{element.quantityPerUnit}</td>
                <td>{element.unitPrice}</td>
                <td>{element.unitsInStock}</td>
                <td><button onClick={this.handleClickEdit.bind(this, element)}>Muokkaa</button></td> 
                </tr>);
            }    
        } else {
            viesti = "Ladataan tietoja Customer API:sta..."
        }


        if(this.state.visible === "table") {
            return (
                <div className="App">
                    <h1>NorthWind Tuotetietojen Selailu</h1>
                    <p>{viesti}</p>
                    <table id="t01"><tbody>{taulukko}</tbody></table>
                    <div className="buttonShow">
                        <button class="buttons" onClick={this.handleClickHelp}>Neuvoja</button>
                        <button className="buttons" onClick={this.handleClickAdd}>Lisää tuote</button>
                        <button className="buttons" onClick={this.handleClickTable}>Tuote selailu</button>
                        <button className="buttons" onClick={this.handleClickPrev}>Edelliset</button>
                        <button className="buttons" onClick={this.handleClickNext}>Seuraavat</button>
                    </div>
                </div>
            );  
        } else if(this.state.visible === "editform") {
           return(<div className="box1">
            <h2>Tuotteen Muokkaus</h2> 
            <button class="buttons" onClick={this.handleClickHelp}>Neuvoja</button>
            <button class="buttons" onClick={this.handleClickTable}>Tuote selailu</button> 
            {this.state.renderChildEdit ? < NWProductEdit productObj={this.state.yksiTuote} unmountMe={this.handleChildUnmountEdit} /> : null }
        </div>
         );
        }   
    }
}
export default ProductFetch;