import {combineReducers } from 'redux'

const INITIAL_STATE = {
    isLoggedIn : false,
    username:"",
    name:""
}

const USER_INITIAL_STATE = {
    friendList:[],
    img:null,
    name:""
}

// data type of friend 
const INITIAL_FRIEND = {
    username:"",
    name:"",
    messages:[{}],
    unread:0
}

const auth = (state=INITIAL_STATE,action) => {
    switch(action.type){

        case 'LOGIN_USER':
            console.log(state)
            Object.assign(state.isLoggedIn,true)
            return {
                ...state,
                name:action.payload.name,
                username : action.payload.username,
                isLoggedIn : true
            }
        case 'LOGOUT_USER':
            Object.assign(state.isLoggedIn , false)
            return {
                ...state,
                isLoggedIn : false
            }
        default:
            return state
    }
}


const user = (state=USER_INITIAL_STATE,action) => {
    switch(action.type) {
        case 'LOGIN_USER':
            Object.assign(state.name,action.payload.name)
            return{
                ...state,
                name : action.payload.name,
                img: action.payload.img,
                friendList : action.payload.friendList
            }
        case 'ADD_FRIEND':
            return{
                ...state,
                friendList : state.friendList.push(action.payload.friend)
            }    

        case 'ADD_MESSAGE':
            var foundIndex = state.friendList.findIndex(friend => friend.username == action.payload.friend)
            var item = state.friendList.find(friend => friend.username == action.payload.friend)
            // console.log(item.messages)
            var msg = {
                text : action.payload.text,
                from : action.payload.from,
                timestamp:new Date().getTime()
            }
            if(item){
                item.messages.push(msg)
                Object.assign(state.friendList[foundIndex],item)
            }
            else{
                state.friendList.push({
                    username:action.payload.friend,
                    name:action.payload.name,
                    messages:Array.from(msg)
                })
            }
            return state
        case 'SET_MESSAGES':
            var foundIndex = state.friendList.findIndex(friend => friend.username == action.payload.friend)
            var item = state.friendList.find(friend => friend.username == action.payload.friend)
            if(item){
                item.messages = action.payload.msgs
                Object.assign(state.friendList[foundIndex],item)
            }
            else{
                state.friendList.push({
                    username:action.payload.friend,
                    name:action.payload.name,
                    messages:action.payload.msgs
                })
            }
            return state
        
        case 'RECIEVE_MESSAGE':
            var {from,text,name,timestamp} = action.payload    
            console.log('getting message from ',name)
            var foundIndex = state.friendList.findIndex(friend => friend.username == from)
            var item = state.friendList.find(friend => friend.username == from)
            if(item){
                item.unread = item.unread+1
                item.messages.push({text,from,timestamp})
                Object.assign(state.friendList[foundIndex],item)
            }else{
                var friend = {
                    username:from,
                    name:name,
                    messages : [{text,from,timestamp}],
                    unread:1
                }
                state.friendList.push(friend)
            }
            return state
        
        case 'SEE_MESSAGE':
            var foundIndex = state.friendList.findIndex(friend => friend.username == action.payload.username)
            if (foundIndex){
                var item = state.friendList[foundIndex]
                item.unread = 0
                 Object.assign(state.friendList[foundIndex] , item)
            }
            state.friendList[foundIndex].unread = 0
            return state
        default :
            return state
    }
}


const authReducer = combineReducers({auth,user})

export default authReducer