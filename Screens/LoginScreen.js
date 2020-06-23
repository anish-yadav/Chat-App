import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {View,Text,TextInput,TouchableOpacity,Image,StyleSheet} from 'react-native'

import { loginUser } from '../actions/index'

export default function LoginScreen() {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <Image source={require('../assets/chat.png')} style={styles.image} />
            <View style={styles.inputContainer}>
                <FontAwesome name="user-o" size={24} color="#2663ff" />
                <TextInput style={styles.input} placeholder="enter username" onChangeText={text => setUsername(text)} keyboardType={'number-pad'}/>
            </View>  
            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={24} color="#2663ff" />
                <TextInput style={styles.input} placeholder="password" secureTextEntry={true} onChangeText={text => setPassword(text)} />
            </View>  

            <TouchableOpacity onPress={() => dispatch(loginUser({username,password}))}>
                <View style={styles.loginButton}>
                    <Text style={styles.buttonText}>Login</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:50,
        backgroundColor:"white"
    },
    inputContainer:{
        flexDirection:"row",
        width:"100%",
        paddingVertical:10,
        justifyContent:"center",
        alignItems:"center",
    },
    input:{
        marginLeft:10,
        fontSize:16,
        height:40,
        width:"100%",
    },
    loginButton:{
        backgroundColor:"#2663ff",
        width:100,
        alignItems:'center',
        paddingVertical:10,
        marginTop:50,
        borderRadius:6
    },
    buttonText:{
        fontSize:16,
        color:'white'
    },
    image:{
        width:200,
        height:150
    }
})