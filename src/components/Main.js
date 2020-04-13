import React, { Component } from 'react';
import Web3 from 'web3';
import Marketplace from '../abis/Marketplace.json';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

class Main extends Component {

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
        const amount = window.web3.utils.toWei(this.receiverAmount.value.toString(), 'Ether')

        this.props.createTransaction(receiver, amount)

     }}>
        <div className="form-group mr-sm-2">
          {/* <label style={{color:"#000", fontSize:"16px"}}>Enter Receiver Address</label> */}
            <input
            id="productName"
            type="text"
            ref={(input) => { this.receiverAddress = input }} //this is to fetch input from inp field
            className="form-control"
            placeholder="Enter Receiver Address"
            
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
        <TableCell style={{color:"#ffffff"}}>Sende</TableCell>
        <TableCell style={{color:"#ffffff"}}>Receiver</TableCell>
        <TableCell style={{color:"#ffffff"}}>Status</TableCell>
        <TableCell style={{color:"#ffffff"}}>Timestamp</TableCell>
        <TableCell style={{color:"#ffffff"}}>#</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>

    { this.props.transactions.map((transaction, key)=>{
          return(

            <TableRow key={key}>
              <TableCell align="right" scope="row">{transaction.id.toString()}</TableCell>
              <TableCell align="right">{window.web3.utils.fromWei(transaction.amount.toString(), 'Ether')} Eth</TableCell>
              <TableCell align="right">{transaction.sender}</TableCell>
              <TableCell align="right">{transaction.receiver}</TableCell>
              <TableCell align="right">{transaction.transactionStatus.toString()}</TableCell>
              <TableCell align="right">{date+","+time}</TableCell>
              <TableCell align="right">{ !transaction.transactionStatus
                    ?  <button name={transaction.id} value={transaction.amount} onClick={(event)=> {
                        this.props.transferAmount(event.target.name, event.target.value)
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


    


//       <div id="content" >
//         <br/>
//         <hr/>   
//         <br/>
//         <h1 className="text-center">Banking DAPP</h1>
//         <br/>
//         <hr/>   
//         <br/>
//         {/* <form onSubmit={(event) => {
//             event.preventDefault()
//             const name = this.productName.value //stroring fetched inp value into name var and same thing is below
            
//             const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')

//             this.props.createProduct(name, price)

//          }}>
//             <div className="form-group mr-sm-2">
//                 <input
//                 id="productName"
//                 type="text"
//                 ref={(input) => { this.productName = input }} //this is to fetch input from inp field
//                 className="form-control"
//                 placeholder="Product Name"
//                 required />
//             </div>
//             <div className="form-group mr-sm-2">
//                 <input
//                 id="productPrice"
//                 type="text"
//                 ref={(input) => { this.productPrice = input }}
//                 className="form-control"
//                 placeholder="Product Price"
//                 required />
//             </div>
//             <button type="submit" className="btn btn-primary">Add Product</button>
//         </form>
//  */}
      
//         <h2 className="text-center">Transfer Ether</h2>
//         <br/>

//         <form onSubmit={(event) => {
//             event.preventDefault()
//             const receiver = this.receiverAddress.value //stroring fetched inp value into name var and same thing is below
//             const amount = window.web3.utils.toWei(this.receiverAmount.value.toString(), 'Ether')

//             this.props.createTransaction(receiver, amount)

//          }}>
//             <div className="form-group mr-sm-2">
//                 <input
//                 id="productName"
//                 type="text"
//                 ref={(input) => { this.receiverAddress = input }} //this is to fetch input from inp field
//                 className="form-control"
//                 placeholder="Receiver Address"
//                 required />
//             </div>
//             <div className="form-group mr-sm-2">
//                 <input
//                 id="productPrice"
//                 type="text"
//                 ref={(input) => { this.receiverAmount = input }}
//                 className="form-control"
//                 placeholder="Enter Amount"
//                 required />
//             </div>
            
            
//             <Button type="submit" variant="contained" color="primary"  style={{margin: "10px"}}> Transfer </Button>
//         </form>



//         {/* <h1>Buy Product</h1>
//         <table className="table">
//           <thead>

//             <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Name</th>
//                 <th scope="col">Price</th>
//                 <th scope="col">Owner</th>
//                 <th scope="col">#</th>
//             </tr>
            
//           </thead>

//           <tbody id="productList">
//             { this.props.products.map((product, key)=>{
//               return(
//                 <tr key={key}>
//                     <th scope="row">{product.id.toString()}</th>
//                     <td >{product.name}</td>
//                     <td >{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
//                     <td >{product.owner}</td>
//                     <td >
//                       { !product.purchased
//                         ?  <button name={product.id} value={product.price} onClick={(event)=> {
//                             this.props.purchaseProduct(event.target.name, event.target.value)
//                             }}>
//                               Buy
//                             </button>
//                         : null

//                       }
                     
//                     </td>
//                 </tr>
//               )
//             })}

        

//           </tbody>

//         </table>
//  */}

//         <br/>
//         <br/>
//         <br/>
//         <hr/>
//         <br/>
       
//         <h2 className="text-center">Transaction Pool</h2>
//         {/* <br/>
//         <table className="table">
//           <thead>

//             <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Amount</th>
//                 <th scope="col">Sender</th>
//                 <th scope="col">Receiver</th>
//                 <th scope="col">Status</th>
//                 <th scope="col">#</th>
                
//             </tr>
            
//           </thead>

//           <tbody id="productList">
//             { this.props.transactions.map((transaction, key)=>{
//               return(
//                 <tr key={key}>
//                     <th scope="row">{transaction.id.toString()}</th>
//                     <td >{window.web3.utils.fromWei(transaction.amount.toString(), 'Ether')} Eth</td>
//                     <td >{transaction.sender}</td>
//                     <td >{transaction.receiver}</td>
//                     <td >{transaction.transactionStatus.toString()}</td>
//                     <td >
//                       { !transaction.transactionStatus
//                         ?  <button name={transaction.id} value={transaction.amount} onClick={(event)=> {
//                             this.props.transferAmount(event.target.name, event.target.value)
//                             }}>
//                               Confirm
//                             </button>
//                         : null

//                       }
                     
//                     </td>
//                 </tr>
//               )
//             })}

        

//           </tbody>

//         </table> */}


//         <div>
//         <TableContainer component={Paper}>
//       <Table  aria-label="customized table">
//         <TableHead >
//           <TableRow style={{backgroundColor:"#2c003e"}}  >
//             <TableCell style={{color:"#ffffff"}}>#</TableCell>
//             <TableCell style={{color:"#ffffff"}}>Amount</TableCell>
//             <TableCell style={{color:"#ffffff"}}>Sende</TableCell>
//             <TableCell style={{color:"#ffffff"}}>Receiver</TableCell>
//             <TableCell style={{color:"#ffffff"}}>Status</TableCell>
//             <TableCell style={{color:"#ffffff"}}>Timestamp</TableCell>
//             <TableCell style={{color:"#ffffff"}}>#</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>

//         { this.props.transactions.map((transaction, key)=>{
//               return(

//                 <TableRow key={key}>
//                   <TableCell align="right" scope="row">{transaction.id.toString()}</TableCell>
//                   <TableCell align="right">{window.web3.utils.fromWei(transaction.amount.toString(), 'Ether')} Eth</TableCell>
//                   <TableCell align="right">{transaction.sender}</TableCell>
//                   <TableCell align="right">{transaction.receiver}</TableCell>
//                   <TableCell align="right">{transaction.transactionStatus.toString()}</TableCell>
//                   <TableCell align="right">{date+","+time}</TableCell>
//                   <TableCell align="right">{ !transaction.transactionStatus
//                         ?  <button name={transaction.id} value={transaction.amount} onClick={(event)=> {
//                             this.props.transferAmount(event.target.name, event.target.value)
//                             }}>
//                               Confirm
//                             </button>
                            
//                         : null

//                       }</TableCell>
//               </TableRow>
               
//               )
//             })}

       
//         </TableBody>
//       </Table>
//     </TableContainer>
//         </div>


//         {/* <div>
            
//             <h2></h2>
//             <button onClick={(event)=> {
//                             this.props.returnBalance()
//                             }}>
//                               Get Balance
//             </button>

          


//         </div> */}

 
        

    //   </div>
     );
  }
}
export default Main;

