const mongoose = require('mongoose')
var bcrypt = require('bcryptjs');

const {MessageSchema} = require('./Message')

const FriendSchema = new mongoose.Schema({
    username:String,
    name:String,
    messages:[MessageSchema],
    unread:{
        type:Number,
        default:0
    }
})


const UserSchema = new mongoose.Schema({
    name: String,
    email:String,
    username : String ,
    rooms : [String] ,
    socket : Object,
    friendList :[FriendSchema]
})

var User = module.exports = mongoose.model('User',UserSchema)


module.exports.createUser = (newUser, callback) =>{
    bcrypt.genSalt(10, function(err, salt) {
        newUser.salt = salt;
         
        bcrypt.hash(newUser.masterPassword, salt, function(err, hash) {
            newUser.password = bcrypt.hashSync(newUser.password,salt);
            newUser.save(callback);
          });
    });
    
    
}
module.exports.updateUser = (id,callback) => {
    User.findById(id,(err,user) => {
        if (user) {
            user = newUser;
            user.save(callback)
        }
    })
}
module.exports.addFriend = (name,username,friend,msg,isSentByMe) => {
    let msgs = []
    msgs.push({text:msg,from:isSentByMe?username:friend,timestamp:new Date().getTime()})
    let frndList = {
        username : friend,
        name:name,
        messages : msgs
    }
    return User.findOneAndUpdate({username},{$push:{friendList:frndList}})
}
module.exports.addMessage = async (message,from,to) => {
    // Getting the user whom message is sent
    let user = await User.findOne({username:to})
    // Get all the conversation with that person
    let currMessages = user.friendList.filter(friend => friend.username === from)
    // Adding message to *to's* conversation 
    if(currMessages){
        currMessages.push({text:message,from:from,timestamp:new Date().getTime()})
        return User.findOneAndUpdate({username:to},{$set:{'friendList.$.messages':currMessages}})
    }else{
        this.addFriend(user.name,to,from,message,false)
    }

    // For the from's person
    user = await User.findOne({username:from})
    // Get all the conversation with that person
    currMessages = user.friendList.filter(friend => friend.username === to)
    // Adding message to *to's* conversation 
    if(currMessages){
        currMessages.push({text:message,from:from,timestamp:new Date().getTime()})
        return User.findOneAndUpdate({username:from},{$set:{'friendList.$.messages':currMessages}})
    }else{
        this.addFriend(user.name,from,to,message,true)
    }
   
}


User.findByEmail = (email,callback) => {
    User.findOne({email},callback)
}
User.findByContact = (contact,callback) => {
    console.log('Finding by contact ',contact)
    User.findOne({contact},callback)
}

