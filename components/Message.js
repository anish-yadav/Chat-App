import React from 'react'
import {useSelector} from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'

export default function Message({message}) {
    const {username} = useSelector(state => ({
        ...state.auth
    }))
    return (
        <View style={styles.container}>
            {
                message.from === username ?
                <View style={styles.fromMe}>
                    <Text style={styles.myText}>{message.text}</Text>
                </View>
                :
                <View style={styles.fromYou}>
                    <Text style={styles.yourText}>{message.text}</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    },
    fromMe:{
        justifyContent:'center',
        alignItems:"flex-end"
    },
    fromYou:{
        justifyContent:'center',
        alignItems:"flex-start"
    },
    myText:{
        maxWidth:"80%",
        backgroundColor:"#2663ff",
        paddingHorizontal:20,
        paddingVertical:5,
        marginVertical:4,
        color:"#fff",
        fontSize:16,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    },
    yourText:{
        maxWidth:"80%",
        backgroundColor:"white",
        paddingHorizontal:20,
        paddingVertical:5,
        marginVertical:4,
        color:"#616161",
        fontSize:16,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    }
})