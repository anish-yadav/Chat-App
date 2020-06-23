import React from 'react'
import { View, Text,Image,StyleSheet,TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

export function HeaderCenter({name}) {
    return (
            <View style={styles.nameContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.status}>Last active 24 Aug</Text>
            </View>
    )
}

export function HeaderRight() {
    return(
        <View style={styles.left}>
            <Feather name='phone' size={18} style={styles.button} />
            <Feather name='video' size={18} style={styles.button} />
            <Feather name='more-vertical' size={18} style={styles.button} />
        </View>
    )
}

export function HeaderLeft({img,navigation}) {
    return(
        <TouchableOpacity onPress={() => navigation.push('Home')} >
        <View style={styles.left}>
            <Feather name="arrow-left" size={24} />
            <Image source={img} style={styles.img} />
        </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
    },
    nameContainer:{
        flexDirection:'column',
        justifyContent:"center",
        paddingLeft:20
    },
    img:{
        width:40,
        height:40,
        borderRadius:20
    },
    options:{
        flexDirection:"row"
    },
    name:{
        fontSize:16,
        color:'black'
    },
    status:{
        fontSize:12,
        color:'#c6c6c6'
    },
    left:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        justifyContent:'center'
    },
    button:{
        marginHorizontal:10
    }
})