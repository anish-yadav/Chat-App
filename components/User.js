import React from 'react'
import { View, TouchableOpacity, Image,Text,StyleSheet} from 'react-native'

import {
    useFonts,
    NunitoSans_600SemiBold,
    NunitoSans_400Regular
} from '@expo-google-fonts/dev'

export default function User({name,img,lastMessage,navigation,username,socRef,online,unread}) {
    let rand = Math.floor(Math.random()*6)
    if(!img)
        img = require(`../assets/profile/1.jpg`)
    
    let [fontsLoaded] = useFonts({
        NunitoSans_600SemiBold,
        NunitoSans_400Regular
    })
    if(!fontsLoaded)
        return(
            <View>
                <Text>Loading</Text>
            </View>
        )
    return (
        <TouchableOpacity  onPress={() => {
            navigation.navigate('Message',{
                img:img,
                name:name,
                username:username,
                socRef
            })}

            }>
            <View style={styles.container}>
                <Image style={styles.image} source={img} />
                {
                    online?
                    <View style={styles.online}>

                    </View>:
                    <Text></Text>
                }
                <View style={styles.user}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.lastMessage}>{lastMessage}</Text>
                </View>
                {
                    unread > 0? 
                    <View style={styles.unread}>
                    <Text style={{color:'white',fontSize:12}}>{unread}</Text>
                    </View>
                :   <Text></Text>
                }
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height:80,
        alignItems:'center',
        borderBottomColor:"#FAFAFA",
        borderBottomWidth:1,
        paddingHorizontal:20
    },
    image:{
        height:50,
        width:50,
        borderRadius:25
    },
    user:{
        flexDirection:'column',
        paddingLeft:20
    },
    name:{
        fontSize:16
    },
    lastMessage:{
        color:"#c6c6c6"
    },
    online:{
        position:'absolute',
        left:55,
        bottom:15,
        height:10,
        width:10,
        borderRadius:8,
        backgroundColor:'#00D72F'
    },
    unread:{
        backgroundColor:"#2663ff",
        height:20,
        width:20,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
        position:'absolute',
        right:20
    }
})