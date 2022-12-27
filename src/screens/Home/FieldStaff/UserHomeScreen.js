import React, {useEffect, useState} from 'react';

import {
    View,
    StyleSheet,
    Text,
    Image,
    Alert,
    ListView,
    ScrollView,
    TextInput,
    Button,
    TouchableOpacity
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {COLORS} from "../../../config/constants";
import * as user_actions from "../../../actions/user";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import WasteEnterScreen from "./Tab_WasteEnterScreen";
import BarcodeReadScreen from "./Modal_BarcodeReadScreen";
import ReadDataQrScreen from "./Modal_ReadDataQrScreen";
import MySalesScreen from "./Tab_MySalesScreen";
import {setLoading} from "../../../actions/loader";
import HomeHeader from "../../../components/home/header";

const UserHomeScreen = ({navigation}) => {
    const auth = useSelector((state) => state.auth);
    const home = useSelector((state) => state.home);
    const loader = useSelector((state) => state.loader);
    const dispatch = useDispatch();

    const Tab = createBottomTabNavigator();
    const [activeRoute, setActiveRoute] = useState("WasteEnter");


    useEffect(() => {
        dispatch(user_actions.getWasteTypes());
    }, []);

    return (
        <Tab.Navigator
            tabBar={(props) => {
                var propName = Object.getOwnPropertyNames(props.descriptors).filter(x => x.indexOf(activeRoute) > -1)[0];
                const activeRouteDescriptor = props.descriptors[propName];
                if (activeRouteDescriptor && activeRouteDescriptor.options["presentation"] && activeRouteDescriptor.options["presentation"] === "modal")
                    return (<></>);

                return (<View style={{width: "100%", alignItems: "center", justifyContent: "center", marginBottom: 10}}>
                    <View style={{
                        backgroundColor: COLORS.green,
                        borderRadius: 10,
                        width: "92%",
                        flexDirection: "row",
                        height: 50,
                        justifyContent: "space-between"
                    }}>
                        <TouchableOpacity
                            style={styles.navigateBtn(activeRoute === "WasteEnter")}
                            onPress={() => {
                                props.navigation.navigate("WasteEnter");
                            }}>
                            <Text style={styles.btnText(activeRoute === "WasteEnter")}>Anasayfa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navigateBtn(activeRoute === "MySales")} onPress={() => {
                            props.navigation.navigate("MySales");
                        }}
                        press
                        >
                            <Text style={styles.btnText(activeRoute === "MySales")}>Yükleme Emirlerim</Text>
                        </TouchableOpacity>
                    </View>
                </View>);
            }}
            screenListeners={props => {
                setActiveRoute(props.route.name);
            }}>
            <Tab.Group screenOptions={{header: () => <HomeHeader/>}}>
                <Tab.Screen name="WasteEnter" component={WasteEnterScreen}/>
                <Tab.Screen name="MySales" component={MySalesScreen}/>
            </Tab.Group>
            <Tab.Group screenOptions={{
                headerShown: false, presentation: 'modal'
            }}>
                <Tab.Screen name="BarcodeRead" component={BarcodeReadScreen}/>
                <Tab.Screen name="ReadDataWithQr" component={ReadDataQrScreen}/>
            </Tab.Group>
        </Tab.Navigator>);
};

const styles = StyleSheet.create({
    navigateBtn: (isActiveRoute) => {
        return {
            flex: 1,
            borderWidth: 1,
            borderColor: "white",
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            backgroundColor: isActiveRoute ? "#F5F5F5" : "transparent",
            textColor: isActiveRoute ? "#000" : "white",
        }
    },
    btnText: (isActiveRoute) => {
        return {color: isActiveRoute ? "#000" : "#fff", fontWeight: "600", fontSize: 16};
    }
});

export default UserHomeScreen;
