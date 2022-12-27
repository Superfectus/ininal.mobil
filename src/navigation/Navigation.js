import * as React from "react";
import SignInScreen from "../screens/SignInScreen";
import WellcomeScreen from '../screens/WellcomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from "react-redux";
import HomeHeader from "../components/home/header";
import HomeScreen from "../screens/Home/HomeScreen";
import {View} from "react-native";
import {Loader} from "../components/loader";
import {NoNetworkScreen} from "../screens/ErrorScreen";
import * as Network from "expo-network";
import {useEffect, useState} from "react";
import {setCheckNetwork, setLoadingComplete} from "../actions/loader";

const Stack = createStackNavigator();

export default function Navigation(props) {
    const home = useSelector((state) => state.home);
    const auth = useSelector((state) => state.auth);
    const loader = useSelector((state) => state.loader);
    const dispatch = useDispatch();
    
    const [hasNetwork, setHasNetwork] = useState(true);

    useEffect(() => {
        if(loader.checkNetwork){
            Network.getNetworkStateAsync().then((re) => {
                console.debug("network check success")
                setHasNetwork(true);
            }).catch((err) => {
                console.debug("network check failed")
                setHasNetwork(false);
            }).finally(() => {
                dispatch(setCheckNetwork(false));
            });
        }
    }, [loader.checkNetwork]);


    return <View style={{flex: 1}}><Stack.Navigator>
        {hasNetwork ?
            auth.token ?
                <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}/>
                : (home.showWellcome ?
                        <Stack.Screen options={{headerShown: false}} name="Wellcome" component={WellcomeScreen}/>
                        :
                        <Stack.Screen options={{headerShown: false}} name="SignInScreen" component={SignInScreen}/>
                )
            : <Stack.Screen options={{headerShown: false}} name="NoNetwork" component={NoNetworkScreen}/>
        }

    </Stack.Navigator>
        <Loader/>
    </View>
}
