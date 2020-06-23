import React,{useState} from 'react'
import { View, Text,StyleSheet,TextInput,TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

export default function MessageInput({addMessage}) {
    let [message,setMessage] = useState("")
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Feather style={styles.item} name="smile" size={20}/>
                <TextInput 
                    style={styles.input} 
                    multiline={true} 
                    placeholder="Type a message" 
                    value={message}  
                    onChangeText={text => setMessage(text) }/>
                <Feather style={styles.item} name="paperclip" size={20}/>
                <Feather style={styles.item} name="camera"  size={20} />
            </View>
            <TouchableOpacity onPress={ () => {
                addMessage(message)
                setMessage('')
            }}>
            <View style={styles.send}>
                <Feather name='send' size={24} color="#fff" />
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer:{
        flexDirection:'row',
        paddingHorizontal:10,
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:"#fff",
        height:50,
        borderRadius:25,
    },
    container:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'space-between',
        paddingVertical:5,
    },
    item : {
        paddingHorizontal:5
    },
    input:{
        width:"52%",
        fontSize:18
    },
    send:{
        marginHorizontal:5,
        backgroundColor:"#2663ff",
        height:50,
        width:50,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center'
    }
})
