import React, {Component} from 'react';
import './App.css';
import Helpit from './Helpit';
import NWCustomerAdd from './NWCustomerAdd';
import NWCustomerEdit from './NWCustomerEdit';



class CustomerFetch extends Component {
    
    constructor(props) {
        super(props);
        console.log("CustomerFetch: Constructor");
        this.state = {
            customers: [],
            recordcount: 0,
            start: 0,
            limit: 10,
            yksiAsiakas: [],
            CustomerID2Del: "",
            // Opetusvideoissa nämä oli määritelty propseissa
            // renderChildEdit: true,
            // renderChildEdit: true,
            visible: "table"
        };
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
        this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
        this.handlePerformDelete = this.handlePerformDelete.bind(this);
    }
    componentDidMount() {
        this.GetCustomerData();
    }
    handleChildUnmount() {
        this.setState({renderChild : false})
        this.setState(this.handleClickTable);
        this.setState(this.GetCustomerData);
    }
    handleChildUnmountEdit() {
        this.setState({renderChildEdit : false})
        this.setState(this.handleClickTable);
        this.setState(this.GetCustomerData);
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
        this.GetCustomerData();
    }
    handleClickTable = () => {
        this.setState({visible:"table"})
    }
    handleClickAdd = () => {
        this.setState({visible:"addform", renderChild: true})
    } 
    handleClickHelp = () => {
        this.setState({visible:"help"}) 
    }    
    handleClickEdit = (dataObj, event) => {
        this.setState({
            yksiAsiakas: dataObj,
            visible: "editform",
            renderChildEdit: true 
        }) 
    }
    handleClickDelete = (poistettava, event) => {
        this.setState({
            CustomerID2Del: poistettava,
            visible: "deleteform",
        }) 
    }
    handlePerformDelete() {
        console.log("handlePerformDelete poistettava ===> " + this.state.CustomerID2Del);
        this.NWDeleteRestApista();
    }
    resetDeleteDone() {
        this.setState({
            CustomerID2Del: ''
        })
        this.handleClickTable();
        this.GetCustomerData();
    }
    GetCustomerData() {
        
        // Backendin urin alku
        const baseUrl = process.env.REACT_APP_BASE_URL;
        let uri = baseUrl + 'customers/R?offSet=' + this.state.start  +  '&limit=' + this.state.limit;;  
        console.log("<==== GetCustomerData osoitteesta  ====>" + uri);
               
        fetch(uri)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({ customers: json, recordcount: json.length});
            });
    } 
    NWDeleteRestApista() {
       
        // Backendin urin alku            
        const baseUrl = process.env.REACT_APP_BASE_URL;
        const apiUrl = baseUrl + 'customers/' + this.state.CustomerID2Del; 
        console.log("NWDelete uri ==> " + apiUrl);
        fetch(apiUrl, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: null
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log('SUCCESS ===>  ${success}');
                if (success) {
                   this.resetDeleteDone();
                }
            });
    }
    render() {
        console.log("CustomerFetch: renderissä MENNÄÄN");
        let viesti = "Rivejä " + this.state.recordcount;
        let taulukko = [];
        taulukko.push(<tr key="otsikko"><th>Id</th><th>Yhtiön nimi</th><th>Kontakti</th>
            <th>Kaupunki</th><th>Maa</th><th colspan="2">Toiminnot</th></tr>);
        if (this.state.customers.length > 0) { 
            for (let index = 0; index < this.state.customers.length; index++) {
                const element = this.state.customers[index];
                taulukko.push(<tr  key={element.customerId}>
                  <td>{element.customerId}</td>
                  <td>{element.companyName}</td>
                  <td>{element.contactName}</td>
                  <td>{element.city}</td>
                  <td>{element.country}</td>
                  <td><button onClick={this.handleClickEdit.bind(this, element)}>Muokkaa</button></td> 
                  <td><button onClick={this.handleClickDelete.bind(this, element.customerId)}>Poista</button></td>  
                </tr>);
            }    
        } else {
            viesti = "Ladataan tietoja Customer API:sta..."
        }
        
        if(this.state.visible === "table") {
            return (
                <div className="App">
                    <h1>NorthWind asiakastietojen selailu</h1>
                    <p>{viesti}</p>
                    <table id="t01"><tbody>{taulukko}</tbody></table> 
                    <div className="buttonShow">
                        <button class="buttons" onClick={this.handleClickHelp}>Neuvoja</button>
                        <button className="buttons" onClick={this.handleClickAdd}>Lisää asiakas</button>
                        <button className="buttons" onClick={this.handleClickTable}>Asiakas selailu</button>
                        <button className="buttons" onClick={this.handleClickPrev}>Edelliset</button>
                        <button className="buttons" onClick={this.handleClickNext}>Seuraavat</button>
                    </div>
                </div>
            );  
        } else if(this.state.visible === "addform") {
             return(<div className="box1">
                <h2>Asiakkaan Lisäys</h2> 
                    <button class="buttons" onClick={this.handleClickHelp}>Neuvoja</button>
                    <button class="buttons" onClick={this.handleClickTable}>Asiakas selailu</button>    
                 {this.state.renderChild ? < NWCustomerAdd unmountMe={this.handleChildUnmount} /> : null } 
                 {/* {this.state.renderChild ? alert("render TRUE") : alert("render FALSE") }  */}
            </div>
            );
        } else if(this.state.visible === "editform") {
            return(<div className="box1">
                <h2>Asiakkaan Muokkaus</h2> 
                <button class="buttons" onClick={this.handleClickHelp}>Neuvoja</button>
                <button class="buttons" onClick={this.handleClickTable}>Asiakas selailu</button>
                {this.state.renderChildEdit ? < NWCustomerEdit asiakasObj={this.state.yksiAsiakas} unmountMe={this.handleChildUnmountEdit} /> : null }
            </div>
            );
        } else if(this.state.visible === "deleteform") {
            return(<div className="box1">
                <h2>Asiakkaan {this.state.CustomerID2Del} Poiston vahvistus</h2> 
                <button class="buttons" onClick={this.handleClickHelp}>Neuvoja</button>
                <button class="buttons" onClick={this.handleClickTable}>Asiakas selailu</button>
                <button class="buttons" onClick={this.handlePerformDelete}>Vahvista poisto</button>
            </div>
         );
        } else if(this.state.visible === "help") {
            return(<div className="box4">
            <Helpit moduli= "NWCustomerFetch" /> 
            <button class="buttons" onClick={this.handleClickAdd}>Lisää asiakas</button>
            <button class="buttons" onClick={this.handleClickTable}>Asiakas selailu</button>   
        </div>
        );
        } else {
            return(<div className="App">
                <p>Nyt meni kyllä pieleen</p>
            </div>
            );
        }     
        
    }
    componentWillUnmount() {
        console.log("CustomerFetch: componentWillUnmountssa");
    }
}
export default CustomerFetch;