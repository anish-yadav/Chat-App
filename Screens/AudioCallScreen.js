import React,{useState} from 'react'
import { View, Text, StyleSheet,Image } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

export default function AudioCallScreen({navigation,route}) {
    const [status,setStatus] = useState('Connecting..')
    return (
        <View style={styles.container}>
            <Image source={route.params.img} style={styles.img} />
            <Text style={styles.name}>{route.params.name}</Text>
            <Text style={styles.status}>{status}</Text>
            <View style={styles.end}>
                <Feather name={'phone'} style={styles.endIcon}  />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container :{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        width:100,
        height:100,
        borderRadius:50
    },
    name:{
        fontSize:16,
        marginTop:20
    },
    status:{
        color:"#2663ff"
    },
    end:{
        backgroundColor:"#DA181B",
        width:50,
        height:50,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center'
    },
    endIcon:{
        transform:[{
            rotateZ:'140deg'
        }],
        color:'white'
    }
})