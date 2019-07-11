import dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga'
import mongoose from 'mongoose';
import userModel from './user.model';
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const models = {
    user: userModel
}


const typeDefs = `
  type User {
    id: ID
    name: String!
    email: String!
  }
  type Query {
    hello(name: String): String!
    user: User!,
    users: [User]!
  }
  type Mutation {
      hello(name: String!): Boolean
      createUser(name: String!, email:String!): User
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    user: () => {
        return {
            name: 'Santy',
            email: 'santy@zemoga.com'
        }
    },
    users: async(_, args, ctx) => {
        // return [
        //     {
        //         id: 123,
        //         name: "Usuario 1",
        //         email: 'usuer1@test.com',
        //     },
        //     {
        //         id: 123,
        //         name: "Usuario 2",
        //         email: 'usuer2@test.com'
        //     },
        //     {
        //         id: 123,
        //         name: "Usuario 3",
        //         email: 'usuer3@test.com'
        //     }
        // ]
        const data = await ctx.models.user.find()
        return data
    }
  },
  Mutation: {
    hello: (root, args) => null,
    createUser: async (_, args, ctx) => {
        const email = await ctx.models.user.find({email: args.email});
        if(email.length > 1){
            throw new Error("cant create user")
        } else {
            return ctx.models.user.create(args);
        }
        
    }
  },
  User: {
    id: (root) => {
        return root._id;
    }
  }
}




const db = mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@workshopzemoga-johes.mongodb.net/workshop`)
.then((res)=>{
    const server = new GraphQLServer({ typeDefs, resolvers, context: {models, db} })
    server.start(() => console.log('Server is running on localhost:4000'))
})
.catch(()=>console.log("error"))