import React,{ useState,useEffect,useRef } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {View,Text, StyleSheet,FlatList,ImageBackground } from 'react-native'
import io from 'socket.io-client'

import {seenMessage,setMessages} from '../actions/index'

import MessageInput from '../components/MessageInput'
import Message from '../components/Message'

export default function MessageScreen({route,navigation}) {

    const {username,name} = useSelector(state => ({
        ...state.auth
    }))
    const {friendList} = useSelector(state => ({
        ...state.user
    }))
    const dispatch = useDispatch()
    const flatlist = useRef(null)

    const [inmsg,setinMsg] = useState([])
    const friend = friendList.find(friend => friend.username == route.params.username)
    const [msgs,setMsgs] = useState(inmsg)
    // if(friend)
    //     setMsgs(friend.messages)
    const socRef = route.params.socRef
    const [key,incr] = useState(1)

    const sendMessage = (text)  => {
        setMsgs(msgs => [...msgs,{text,from:username,timestamp:new Date().getTime(),key:key,name:route.params.name}])
        //dispatch(addMessageToState({friend:route.params.username,text,from:username,name:route.params.name}))
        incr(key+1)
        // console.log('sending message',text,socRef.current.id)
        socRef.current.emit('send message',{text,to:route.params.username,from:username,name:name})
    }

    const recieveMessage = ({text,from}) => {
        setMsgs(msgs => [...msgs,{text,from,timestamp:new Date().getTime(),key:key}])
        //dispatch(addMessageToState({friend:route.params.username,text,from,name:route.params.name}))
        incr(key+1)
    }


    useEffect(() => {
        if(friend){
            console.log('frined',friend)
            setMsgs(friend.messages)
            dispatch(seenMessage({username:route.params.username}))
        }
        console.log('running angain',username)
        socRef.current.on('message',({text,from}) => {
            // console.log('recieving message',text,from)
            if(text.length > 0)
            if(navigation.isFocused()){
                console.log('getting message from messaage screen')
                recieveMessage({text,from})
            }
        })
    },[])

    useEffect(() => {
        return () => {
            console.log('updating state with',msgs)
            if(msgs.length > 0)
                dispatch(setMessages({friend:route.params.username,name:route.params.name,msgs:msgs}))
        }
    },[msgs])


    return(
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background.png')} style={styles.image}>
            <FlatList
            data={msgs}
            extraData={msgs}
            keyExtractor={item => item.timestamp.toString()}
            ref={ref => flatlist.current = ref}
            style={{paddingHorizontal:10}}
            onContentSizeChange={() => flatlist.current.scrollToEnd({animated:true})}
            renderItem={({item}) => (
                <Message message={item} />
            )}
            />
            <View style={styles.input}>
            <MessageInput addMessage={sendMessage}/>
            </View>
            </ImageBackground>
        </View>
    )

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ccc",
        justifyContent:'space-between'
    },  
    input:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom:5,
        height:50
    },
    image:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }
})