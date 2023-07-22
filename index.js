import express from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
//initialize dotenv
dotenv.config()
const app = express()
const prisma = new PrismaClient()
app.use(express.json())



// Crud operations for creating customers 

app.post('/customers',async(req,res)=>{

const customer = await prisma.customers.create({
    data:req.body
})
res.json(customer)
})

app.get('/customers',async(req,res)=>{ 

    const allCustomers = await prisma.customers.findMany()
    res.json(allCustomers)  
})

// crud operations for adding products 

app.post('/products',async(req,res)=>{

 const product = await prisma.products.create({
        data:req.body
 })
 res.json(product)

})
// Crud Operation for creating orders
app.get('/orders',async(req,res)=>{

    const allProducts = await prisma.orders.findMany()
    res.json(allProducts)
})
app.post('/orders',async(req,res)=>{

    const product = await prisma.orders.create({
           data:req.body
    })
    res.json(product)
   
   })
   
   app.get('/products',async(req,res)=>{
   
       const allProducts = await prisma.products.findMany()
       res.json(allProducts)
   })


app.listen(5000,()=>{
    console.log("server started on port 5000")
})