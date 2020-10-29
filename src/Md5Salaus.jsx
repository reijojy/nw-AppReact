import React, { Component } from 'react';
import Request from 'react-http-request';
import './App.css';

class Md5Salaus extends Component {
    render() {
        let url="http://md5.jsontest.com/?text=" + this.props.salattava;
        return (
          <Request url={url} method="get" accept="Application/json" verbose={false}>
            {
              ({error, result, loading}) => {
                if (loading) {
                  return <div>loading...</div>;
                } else if (error) {
                    return <div><p>Finns ingen data</p></div>;
                } else {
                    return ( 
                    <div> 
                        <p>{result.body.original} </p>
                        <p>{result.body.md5} </p>
                    </div>
                    );
                }
              }
            }
          </Request>
      );
  }
}
export default Md5Salaus;
