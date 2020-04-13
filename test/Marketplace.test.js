const Marketplace = artifacts.require("Marketplace");

//this is to check failure test case
require('chai').use(require('chai-as-promised')).should()

contract('Marketplace', ([deployer, seller, buyer, ac1, ac2])=>{
    let marketplace

    before(async() =>{

        marketplace = await Marketplace.deployed()

    })

    describe('deployment', async() => {

        it('sucessfully deployed', async() =>{

            const address = await marketplace.address

            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)

        })

        it('has a name', async() =>{

            const name = await marketplace.name()

            assert.equal(name, 'kanad')

        })  
    })

    describe('products', async() => {
        let result, result1, productCount, transactionCount
        before(async() =>{

            result = await marketplace.createProduct('iphonex', web3.utils.toWei('1', 'Ether'), {from: seller})
            productCount = await marketplace.productCount()

            result1 = await marketplace.createTransaction(ac2, web3.utils.toWei('1', 'Ether'), {from: ac1})
            transactionCount = await marketplace.transactionCount()
        })

        it('creates product', async() =>{


            assert.equal(productCount, 1)
            //console.log(result.logs) logs has a all information pull out it and check
            const event = result.logs[0].args //fetching event data
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'iphonex', 'name is correct')
            assert.equal(event.price, '1000000000000000000', 'price is correct')
            assert.equal(event.owner, seller, 'owner is correct') //here just cheking owner is seller
            assert.equal(event.purchased, false, 'purchased is correct')
            
            //on Falure
            //if name is absetn
            await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), {from: seller}).should.be.rejected;

            //if price is absent
            result = await marketplace.createProduct('iphonex',0, {from: seller}).should.be.rejected;

        })  

        it('returns bal', async() =>{


            let bal = await marketplace.returnBalance({from: ac1}) //fetching product data
            //bal = new web3.utils.BN(bal.toString())
            console.log(bal.toString())
            
        })

        it('creates transaction', async() =>{


            assert.equal(transactionCount, 1)
            // console.log(result1.logs) // logs has a all information pull out it and check
            const event = result1.logs[0].args //fetching event data
            assert.equal(event.id.toNumber(), transactionCount.toNumber(), 'id is correct')
            assert.equal(event.amount, '1000000000000000000', 'price is correct')
            assert.equal(event.sender, ac1, 'sender is correct') //here just cheking owner is seller
            assert.equal(event.receiver, ac2, 'receiver is correct') 
            assert.equal(event.transactionStatus, false, 'transferred is correct')
            
            // //on Falure
            //if receiver is absetn
            await marketplace.createTransaction('', web3.utils.toWei('1', 'Ether'),  {from: ac1}).should.be.rejected;

            // //if price is absent
            // result = await marketplace.createProduct('iphonex',0, {from: seller}).should.be.rejected;

        }) 

        it('lists transactions', async() =>{


            const transact = await marketplace.transactions(transactionCount) //fetching product data
            assert.equal(transact.id.toNumber(), transactionCount.toNumber(), 'id is correct')
            assert.equal(transact.amount, '1000000000000000000', 'price is correct')
            assert.equal(transact.sender, ac1, 'name is correct')
            assert.equal(transact.receiver, ac2, 'owner is correct') //here just cheking owner is seller
            assert.equal(transact.transactionStatus, false, 'transfereed is correct')
            
        })

        it('transaction process', async()=>{

            //checks seller balance beforre receiver selling
            let oldReceiverBalance
            oldReceiverBalance = await web3.eth.getBalance(ac2)
            oldReceiverBalance = new web3.utils.BN(oldReceiverBalance)

            const result1 = await marketplace.transferAmount(productCount, {from: ac1, value: web3.utils.toWei('1', 'Ether')}) //fetching product data

            assert.equal(transactionCount, 1)
            // console.log(result1.logs) // logs has a all information pull out it and check
            const event = result1.logs[0].args //fetching event data
            assert.equal(event.id.toNumber(), transactionCount.toNumber(), 'id is correct')
            assert.equal(event.amount, '1000000000000000000', 'price is correct')
            assert.equal(event.sender, ac1, 'sender is correct') //here just cheking owner is seller
            assert.equal(event.receiver, ac2, 'receiver is correct') 
            assert.equal(event.transactionStatus, true, 'transferred is correct')
            
             //check seller balance after completing product purchase process 
             let newReceiverBalance
             newReceiverBalance = await web3.eth.getBalance(ac2)
             console.log(newReceiverBalance)
             newReceiverBalance = new web3.utils.BN(newReceiverBalance)

             let price
             price = web3.utils.toWei('1', 'Ether')
             price = new web3.utils.BN(price)
 
             console.log(oldReceiverBalance, newReceiverBalance, price)
             
             const expectedBalance = oldReceiverBalance.add(price)
 
             assert.equal(newReceiverBalance.toString(), expectedBalance.toString(), 'fund is received')
            
           
 


        })

       


        it('lists product', async() =>{


            const product = await marketplace.products(productCount) //fetching product data
            assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(product.name, 'iphonex', 'name is correct')
            assert.equal(product.price, '1000000000000000000', 'price is correct')
            assert.equal(product.owner, seller, 'owner is correct') //here just cheking owner is seller
            assert.equal(product.purchased, false, 'purchased is correct')
            
            
       
        })

        //cheking that product selling correctly
        it('sells product', async() =>{

            //checks seller balance beforre product selling
            let oldSellerBalance
            oldSellerBalance = await web3.eth.getBalance(seller)
            oldSellerBalance = new web3.utils.BN(oldSellerBalance)

            const result = await marketplace.purchaseProduct(productCount, {from: buyer, value:  web3.utils.toWei('1', 'Ether')}) //fetching product data

            const event = result.logs[0].args //fetching event data
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'iphonex', 'name is correct')
            assert.equal(event.price, '1000000000000000000', 'price is correct')
            assert.equal(event.owner, buyer, 'owner is correct') //here just cheking owner is seller
            assert.equal(event.purchased, true, 'purchased is correct')

            //check seller balance after completing product purchase process 
            let newSellerBalance
            newSellerBalance = await web3.eth.getBalance(seller)
            newSellerBalance = new web3.utils.BN(newSellerBalance)

            let price
            price = web3.utils.toWei('1', 'Ether')
            price = new web3.utils.BN(price)

            console.log(oldSellerBalance, newSellerBalance, price)
            const expectedBalance = oldSellerBalance.add(price)

            assert.equal(newSellerBalance.toString(), expectedBalance.toString(), 'fund is received')
           
            //falure
            //product that doesnt exist
           
            await marketplace.purchaseProduct(99, {from: buyer, value:  web3.utils.toWei('1', 'Ether')}).should.be.rejected;
            
            //buyer tries to buy product at not enough amount
            await marketplace.purchaseProduct(productCount, {from: buyer, value:  web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;
       
            //deployer tries to buy product
            await marketplace.purchaseProduct(productCount, {from: deployer, value:  web3.utils.toWei('1', 'Ether')}).should.be.rejected;
        
            //buyer tries
            await marketplace.purchaseProduct(productCount, {from: buyer, value:  web3.utils.toWei('1', 'Ether')}).should.be.rejected;
        })

        


         

        //check the seller has received actual amount

    })
    
})