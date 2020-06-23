import React from 'react'
import {useSelector} from 'react-redux'
import { View, Text, ScrollView } from 'react-native'

import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'

import User from '../components/User'

export default function AllUsersScreen({route,navigation}) {

    const ALL_USERS = gql`
        {
            users{
                name,
                username,
                img
            }
        }
    `
    const {error,data,loading} = useQuery(ALL_USERS)
    const {username} = useSelector(state => ({
        ...state.auth
    }))
    return (
        <View style={{backgroundColor:"white"}}>
            {
                loading?
                <Text>Loading...</Text> :
                <ScrollView>
                {
                    data.users.map((user,index) => {
                        if(user.username != username)
                        return <User socRef={route.params.socRef} navigation={navigation} key={index} name={user.name} username={user.username} img={user.img} unread={0} lastMessage={"lorem ipsum some dummy text"} />
                    })
                }
                </ScrollView>
            }
        </View>
    )
}
