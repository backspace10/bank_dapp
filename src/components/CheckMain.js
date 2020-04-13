import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';


class CheckMain extends Component {

  render() {
    

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();   
  return (

               
<React.Fragment >


<CssBaseline />
<Container >




<div style={{paddingLeft:"30px", paddingRight:"30px", paddingTop:"50px"}}>
<h1 className="text-center">Transfer Amount</h1>
  <div style={{paddingBottom:"50px", width:"500px"}}>
  <form onSubmit={(event) => {
        event.preventDefault()
        const receiver = this.receiverAddress.value //stroring fetched inp value into name var and same thing is below
        const name = this.receiverName.value
        const amount = window.web3.utils.toWei(this.receiverAmount.value.toString(), 'Ether')

        this.props.createDDTransaction(receiver, name, amount)

     }}>
        <div className="form-group mr-sm-2">
          {/* <label style={{color:"#000", fontSize:"16px"}}>Enter Receiver Address</label> */}
            <input
            id="productName"
            type="text"
            ref={(input) => { this.receiverAddress = input }} //this is to fetch input from inp field
            className="form-control"
            placeholder="Enter Bank Address Only"
            
            required />
        </div>

        <div className="form-group mr-sm-2">
          {/* <label style={{color:"#000", fontSize:"16px"}}>Enter Receiver Address</label> */}
            <input
            id="productName"
            type="text"
            ref={(input) => { this.receiverName = input }} //this is to fetch input from inp field
            className="form-control"
            placeholder="Enter DD Name"
            
            required />
        </div>

        <div className="form-group mr-sm-2">
        {/* <label style={{color:"#000", fontSize:"16px"}}>Enter Amount</label> */}
            <input
            id="productPrice"
            type="text"
            ref={(input) => { this.receiverAmount = input }}
            className="form-control"
            placeholder="Enter Amount"
            required />
        </div>
        
        <Button type="submit" variant="contained" color="primary"  style={{margin: "10px"}}> Transfer </Button>
    </form>
    

  </div>
    <h1 className="text-center">Transaction Pool</h1>
    <TableContainer component={Paper}>
  <Table  aria-label="customized table">
    <TableHead >
      <TableRow style={{backgroundColor:"#2c003e"}}  >
        <TableCell style={{color:"#ffffff"}}>#</TableCell>
        <TableCell style={{color:"#ffffff"}}>Amount</TableCell>
        <TableCell style={{color:"#ffffff"}}>Name</TableCell>
        <TableCell style={{color:"#ffffff"}}>Sende</TableCell>
        <TableCell style={{color:"#ffffff"}}>Receiver</TableCell>
        <TableCell style={{color:"#ffffff"}}>Status</TableCell>
        <TableCell style={{color:"#ffffff"}}>Timestamp</TableCell>
        <TableCell style={{color:"#ffffff"}}>#</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>

    { this.props.DDTransactions.map((DDTransaction, key)=>{
          return(

            <TableRow key={key}>
              <TableCell align="right" scope="row">{DDTransaction.id.toString()}</TableCell>
              <TableCell align="right">{window.web3.utils.fromWei(DDTransaction.amount.toString(), 'Ether')} Eth</TableCell>
              <TableCell align="right">{DDTransaction.name}</TableCell>
              <TableCell align="right">{DDTransaction.sender}</TableCell>
              <TableCell align="right">{DDTransaction.receiver}</TableCell>
              <TableCell align="right">{DDTransaction.transactionStatus.toString()}</TableCell>
              <TableCell align="right">{date+","+time}</TableCell>
              <TableCell align="right">{ !DDTransaction.transactionStatus
                    ?  <button name={DDTransaction.id} value={DDTransaction.amount} onClick={(event)=> {
                        this.props.transferDDAmount(event.target.name, event.target.value)
                        }}>
                          Confirm
                        </button>
                        
                    : null

                  }</TableCell>
          </TableRow>
           
          )
        })}

   
    </TableBody>
  </Table>
</TableContainer>
</div>


</Container>

</React.Fragment>


 
     );
  }
}
export default CheckMain;


