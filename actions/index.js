export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"

import ApolloClient,{gql} from 'apollo-boost'


const client = new ApolloClient({
    uri:"https://8b8429f2d295.ngrok.io/graphql"
})



export const loginUser = (payload) => {
    return dispatch => {
        return client.query({
            query:gql`
                {
                    loginUser(username:"${payload.username}",password:"${payload.password}"){
                        name,
                        username,
                        friendList{
                            username,
                            name,
                            messages{
                                text,
                                from,
                                timestamp
                            },
                            unread
                        }
                    }
                }
            `
        }).then(res => {
            if(res.data.loginUser)
                dispatch({
                    type:LOGIN_USER,
                    payload : res.data.loginUser
                })
        })
    }
}
export const logOut = (payload) => {
    return{
        type:LOGOUT_USER,
        payload
    }
}


export const addMessageToState = (payload) => {
    return {
        type :"ADD_MESSAGE",
        payload
    }
}

export const setMessages = (payload) => {
    return {
        type: 'SET_MESSAGES',
        payload
    }
}

export const recieveMessage = (payload) => {
    return {
        type:'RECIEVE_MESSAGE',
        payload
    }
}

export const seenMessage = (payload) => {
    return{
        type:'SEE_MESSAGE',
        payload
    }
}