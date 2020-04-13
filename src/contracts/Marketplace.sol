pragma solidity >=0.4.21 <0.6.0;

contract Marketplace{

    string public name;
    uint public transactionCount = 0;
    uint public DDtransactionCount = 0;
    uint256 public bal;
    
  
    mapping(uint => Transaction) public transactions;
    mapping(uint =>  DDTransaction) public DDTransactions;

    struct Transaction{
        uint id;
        uint amount;
        address payable sender;
        address payable receiver;
        bool transactionStatus;
    }

    struct DDTransaction{
        uint id;
        string name;
        uint amount;
        address payable sender;
        address payable receiver;
        bool transactionStatus;
    }

    
    event TransactionCreated(
        uint id,
        uint amount,
        address payable sender,
        address payable receiver,
        bool transactionStatus
    );

    event Transferred(
        uint id,
        uint amount,
        address payable sender,
        address payable receiver,
        bool transactionStatus
    );

     event DDTransactionCreated(
        uint id,
        string name,
        uint amount,
        address payable sender,
        address payable receiver,
        bool transactionStatus
    );

    event DDTransferred(
        uint id,
        string name,
        uint amount,
        address payable sender,
        address payable receiver,
        bool transactionStatus
    );

    constructor() public{

        name = "kanad";
    }

    

    function createTransaction(address payable _receiver, uint _price) public{
    

        //price validation
        require(_price > 0, "your haven't entered amount greater than zero.");
        //increament the product count
        
        transactionCount++;

        //create the transaction
         transactions[transactionCount] = Transaction(transactionCount, _price, msg.sender, _receiver, false);

         //trigger an event to notify the transaction is created
         emit TransactionCreated(transactionCount, _price, msg.sender, _receiver, false);

    }

    function transferAmount(uint _id) public payable{


        Transaction memory _transact = transactions[_id];

        _transact.amount = msg.value;

        _transact.sender = msg.sender;

        address payable _receiver = _transact.receiver;

        _transact.transactionStatus = true;

        transactions[_id] = _transact;

        require(msg.value > 0, "your haven't entered amount greater than zero.");

        //transfer actual amount
        address(_receiver).transfer(msg.value);
        
        emit Transferred(transactionCount, _transact.amount, msg.sender,  _transact.receiver, _transact.transactionStatus);

    }


    //Dimand Draft Business Logic

     function createDDTransaction(address payable _receiver, string memory _name, uint _price) public{
    

        //price validation
        require(_price > 0, "your haven't entered amount greater than zero.");
        //increament the product count
        
        DDtransactionCount++;

        //create the transaction
         DDTransactions[DDtransactionCount] = DDTransaction(DDtransactionCount, _name, _price, msg.sender, _receiver, false);

         //trigger an event to notify the transaction is created
         emit DDTransactionCreated(DDtransactionCount,_name, _price, msg.sender, _receiver, false);

    }
    
    function transferDDAmount(uint _id) public payable{


         DDTransaction memory _transact = DDTransactions[_id];

        _transact.amount = msg.value;

        _transact.sender = msg.sender;

        address payable _receiver = _transact.receiver;

        _transact.transactionStatus = true;

        DDTransactions[_id] = _transact;

        require(msg.value > 0, "your haven't entered amount greater than zero.");

        //transfer actual amount
        address(_receiver).transfer(msg.value);
        
        emit DDTransferred(DDtransactionCount, _transact.name, _transact.amount, msg.sender,  _transact.receiver, _transact.transactionStatus);

    }
    
}