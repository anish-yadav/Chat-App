import 'react-native-gesture-handler'
import React,{useEffect} from 'react';
import { Provider,useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import Feather from 'react-native-vector-icons/Feather'

import store from './app/store'

import LoginScreen from './Screens/LoginScreen'
import {HeaderCenter,HeaderLeft, HeaderRight} from './components/MessageHeader'

import HomeScreen from './Screens/HomeScreen'
import MessageScreen from './Screens/MessageScreen'
import ProfileScreen from './Screens/ProfileScreen'
import SettingsScreen from './Screens/SettingsScreen'
import AllUsersScreen from './Screens/AllUsersScreen'
import AudioCallScreen from './Screens/AudioCallScreen'

const Tabs = createBottomTabNavigator()
const Stack = createStackNavigator()

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'https://8b8429f2d295.ngrok.io/graphql',
      credentials: 'cross-origin'
    })
  ]),
  cache: new InMemoryCache()
});


const getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';

  if (routeName != 'Home') {
    return false;
  }

  return true;
}

const MyStack = () => (
  <Stack.Navigator>
    <Stack.Screen component={HomeScreen} name="Home" options={{
      headerShown:false
    }}/>
    <Stack.Screen component={MessageScreen} name="Message" 
    options={({ route,navigation }) => ({
       title: route.params.name ,
       username : route.params.username,
       socRef:route.params.socRef,
       headerTitle:props => <HeaderCenter name={route.params.name} img={route.params.img} />,
       headerLeft:props => <HeaderLeft  navigation={navigation} img={route.params.img} />,
       headerRight : props => <HeaderRight navigation={navigation} name={route.params.name} img={route.params.img}   />
       })}/>
       <Stack.Screen component={AllUsersScreen} name="All" />
       <Stack.Screen component={AudioCallScreen} name="AudioCall" 
       options={({route,navigation}) => ({
          headerShown:false,
          name : route.params.name,
          img:route.params.img
       })} />
  </Stack.Navigator>
)


const AppChild = () => {
  const {isLoggedIn}= useSelector(state => ({
    ...state.auth
  }))

  return (
    <ApolloProvider client={client}>

      
        {isLoggedIn ? 
        <NavigationContainer>
          <Tabs.Navigator 
            screenOptions={({route}) =>({
              tabBarIcon : ({focused,color,size}) => {
                let iconName;

                if (route.name === 'HomeScreen') {
                  iconName = 'message-circle'
                } else if (route.name === 'Profile') {
                  iconName = 'user'
                }else if(route.name === 'Settings'){
                  iconName = 'settings'
                }
    
                // You can return any component that you like here!
                return <Feather name={iconName} size={size} color={color} />;
              }
            })}
            tabBarOptions={{
              activeTintColor: '#2663ff',
              inactiveTintColor: 'gray',
              showLabel: false
            }}
            
            >
            <Tabs.Screen component={MyStack} name="HomeScreen" options={
              ({route}) => ({
                tabBarVisible: getTabBarVisibility(route)
              })
              }/>
            <Tabs.Screen component={ProfileScreen} name="Profile" />
            <Tabs.Screen component={SettingsScreen} name="Settings" />
          </Tabs.Navigator>

         </NavigationContainer>

          :
          <LoginScreen />
        }
      </ApolloProvider>
  )
}


export default function App() {
 
  console.log('rendering app.js')
  return (
    <Provider store={store}>
      <AppChild />
    </Provider>
  );
}


