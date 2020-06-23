import React,{useEffect,useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {View,Text,Image,StyleSheet,FlatList,TouchableOpacity, Dimensions} from 'react-native'
import io from 'socket.io-client'

import Feather from 'react-native-vector-icons/Feather'

import User from '../components/User'
import {recieveMessage} from '../actions/index'



const {width,height} = Dimensions.get('screen')

export default function HomeScreen({navigation}) {
    

    
    const {username} = useSelector(state => ({
        ...state.auth
    }))
    const {friendList} = useSelector(state => ({
        ...state.user
    }))
    const dispatch = useDispatch()
    const socRef = useRef(null)

    useEffect(() => {
        socRef.current = io("https://f45235db40c9.ngrok.io")
        socRef.current.emit('online',{username,id:socRef.current.id})
        socRef.current.on('online users',({online}) => {
            console.log('online users are',online)
        })

        socRef.current.on('message',({text,from,timestamp,name}) => {
            dispatch(recieveMessage({text,from,timestamp,name}))
        })
    },[])  
    
    // Add way to remove unread
   
    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
            <Text style={styles.headerText}>Messages</Text>
            <Feather name='search'  size={24} />
            </View>
            
                <FlatList data={friendList} 
                keyExtractor={item => item.username}
                renderItem={({item,index}) => (
                <User 
                socRef={socRef} 
                navigation={navigation} 
                key={index} name={item.name} 
                username={item.username}
                img={item.img} 
                unread={item.unread} 
                lastMessage={item.messages && item.messages[item.messages.length -1 ] ? item.messages[item.messages.length - 1].text : ""} />
                )} 

                ListEmptyComponent={() => (
                    <View style={styles.noData}>
                        <Image source={require('../assets/no-data.png')} style={styles.noDataImg}/>
                        <Text>No messages</Text>
                    </View>
                )}
                />
            <TouchableOpacity style={styles.allUserContainer} onPress={() => navigation.navigate('All',{
                socRef:socRef
            })}>
                <View style={styles.allUser}>
                    <Feather name={"message-circle"} size={24} color='white' />
                </View>
            </TouchableOpacity>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        paddingTop:50,
        backgroundColor:'white'
    },  
    header:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:20
    },  
    headerText:{
        fontSize:24,
        fontWeight:'bold'
    },
    allUser : {
        position:'relative',
        height:50,
        width:50,
        borderRadius:25,
        right:10,
        bottom:10,
        justifyContent:'center',
        alignItems:'center',
        zIndex:99999999,
        backgroundColor:"#2663ff"
    },
    allUserContainer:{
        position:'absolute',
        bottom:0,
        right:10
    },
    noData:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:height-200
    },
    noDataImg:{
        width:"80%",
        height:200
    }
})