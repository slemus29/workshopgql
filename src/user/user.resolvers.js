import { factoryQueryAll, idResolver } from '../utils';

export default {
  Query: {
    users: factoryQueryAll('User'),
  },
  Mutation: {
    createUser: async (_, { name, email }, ctx) => {
      const alreadyCreated = await ctx.models.User.exists({
        email,
      });

      if (alreadyCreated) {
        throw new Error('Email already exists');
      }

      const userCreated = await ctx.models.User.create({
        name,
        email,
      });

      return userCreated;
    },
  },
  User: {
    id: idResolver,
    // projects: async ({ id }, __, ctx) => {
    //   const projects = await ctx.models.Project.find({ users: id });
    //   return projects;
    // }
    projects: ({id}, __, ctx) =>{
      return ctx.loaders.projects.load(id)
    }
  },
};



// export default {
//     Query: {
//         users: async(_, args, ctx) => {
//             const data = await ctx.models.user.find()
//             return data
//         },
//     },
//     Mutation: {
//         createUser: async (_, args, ctx) => {
//             const email = await ctx.models.user.find({email: args.email});
//             if(email.length > 1){
//                 throw new Error("cant create user")
//             } else {
//                 return ctx.models.user.create(args);
//             }
//         },
//         createUsers: async (_, args, ctx) => {
            
//             const emails =  args.users.map ((mail) => mail.email)
//             let hasSameEmails
//             console.log("emails", emails)
//             for (var i = 0; i <= emails.length && !hasSameEmails; i++) {
//                 let current = emails[i]
//                 for(var j = i+1; j <= emails.length && !hasSameEmails; j++) {
//                     if(current == emails[j]){
//                         hasSameEmails = true
//                     } else{
//                         hasSameEmails = false
//                     }
//                 }
//             }
//             console.log("hasSameEmails", hasSameEmails)
//             const emailsNulls = args.users.some((users) => console.log(users)||users==null)
//             const compare = await ctx.models.user.exists(
//                 {
//                     email: {
//                         $in: emails
//                     }
//                 }
//             );
//             console.log("compare", compare ,!emailsNulls ,emails.length==0)
//             if(compare || emailsNulls || emails.length==0 || hasSameEmails){
//                 throw new Error("cant create array of user")
//             } else{
//                 return ctx.models.user.create(args.users);
//             }
//         },
//     },
//     Project: {
//         id: (root) => {
//             return root._id;
//         }
//     }
// }


