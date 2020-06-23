const { GraphQLString, GraphQLBoolean, GraphQLObjectType, GraphQLSchema} = require('graphql')

const {gql} = require('apollo-server-express')
const User = require('./User')
const IterApi = require('../helper/iter')

module.exports.typeDefs = gql`
# data types here
type Message {
    text:String,
    from : String,
    timestamp :String
}
type Friend {
    username : String,
    name:String,
    messages : [Message],
    unread:Int
}
 type User {
     id : String,
     name : String,
     username : String,
     friendList : [Friend],
     img: [String]
 }


 # Query types her 
 type Query {
     users :[User],
     user(username:String):User,
     loginUser(username:String,password:String):User
 }

 type Mutation {
     addUser(name:String,username:String):User,
     deleteUser(username:String):User,
     addFriend(username:String,friend:String,msg:String):User
     
 }
`

module.exports.resolvers  = {
    Query:{
        users : async () => await User.find({}) ,
        user : async (parent,args) => await User.findOne({username:args.username}) ,
        loginUser : async (parent,args) => {
            let user = IterApi.login(args.username,args.password)
            if(user)
                 return await User.findOne({username:args.username}) 
            else
                return {"status":"404"}
        }
    },
    Mutation:{
        addUser : async (parent,args) => {
            let newUser = new User()
            newUser.name = args.name,
            newUser.username = args.username
            await newUser.save()
        },
        addFriend : async (parent,args) => {
            return User.addFriend(args.username,args.friend,args.msg)
        }
        
    }
}