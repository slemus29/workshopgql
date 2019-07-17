import dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga'
import mongoose from 'mongoose';
import { models, resolvers, typeDefs, loaders } from './graphql';
// import userModel from './user/user.model';
// import projectModel from './project/project.model';
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@workshopzemoga-johes.mongodb.net/workshop`)
.then((res)=>{
    const server = new GraphQLServer({ 
        typeDefs, 
        resolvers, 
        context: {
            models, 
            res,
            loaders
        } 
    })
    server.start(() => console.log('Server is running on localhost:4000'))
})
.catch((error)=>console.log("error", error))



// mongoose
//   .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@workshop-cb7vf.mongodb.net/workshop`)
//   .then((db) => {
//     const server = new GraphQLServer({
//       typeDefs,
//       resolvers,
//       context: {
//         models,
//         db
//       }
//     });

//     server.start(() => console.log('Server is running on localhost:4000'));
//   })
//   .catch((error) => {
//     console.log('ERROR?', error);
//   });