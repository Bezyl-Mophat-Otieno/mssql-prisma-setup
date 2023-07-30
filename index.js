import express from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
//initialize dotenv
dotenv.config()
const app = express()
const prisma = new PrismaClient()
app.use(express.json())



// Crud operations for creating customers 

const createUserWithProfile  = async ()=>{

const user = await prisma.user.create({
    data:{}
})

const profile = await prisma.profile.create({
    data:{
        name:"Deno",
        userId:user.id
    }
})

const userOne= await prisma.user.findUnique({
    where:{
        id:user.id
    },
    include:{
        profile:{
            select:{
                name:false,
                id:true
            }

        }
      
    }
 
})

const userTwo = await prisma.user.create({
    data:{
        profile:{
            create:{
                name:'Allen',
                id:user.id
            }
        }
    },
    include:{
        profile:true
    }
})

return {userOne,userTwo}


}


// console.log('one-to-one relationship')
// console.log(await createUserWithProfile())

// CREATING A USER WITH AN ORDER

const createUserWithOrder = async ()=>{
  const user1 = await prisma.user.create({
        data:{}
  })

  const order1 = await prisma.order.create({
        data:{
            userId:'53d65cf1-3dda-4bf2-92ad-1a50444e6f71'
        }
  })

  const userWithId = await prisma.user.findUnique({
    where:{
        id:'53d65cf1-3dda-4bf2-92ad-1a50444e6f71'
    },include:{
        order:{
            select:{
                id:true
            }
        }
    }
  })

  const ordersWithUser = await prisma.order.findMany({
        where:{
            userId:'53d65cf1-3dda-4bf2-92ad-1a50444e6f71'
        }
  })
  return {userWithId,ordersWithUser}
 

}

console.log('one-to-many relationship')
console.log(await createUserWithOrder())

app.listen(5000,()=>{
    console.log("server started on port 5000")
})