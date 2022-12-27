import React, {useEffect} from 'react';

import {View, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {UserType} from "../../constants/enums";
import ApproverHomeScreen from "./Approver/ApproverHomeScreen";
import UserHomeScreen from "./FieldStaff/UserHomeScreen";
import store from "../../reducers";
import * as userActions from "../../actions/user";
import * as authActions from "../../actions/auth";
import {NoNetworkScreen} from "../ErrorScreen";

const HomeScreen = ({navigation}) => {
    const home = useSelector((state) => state.home);
    const dispatch = useDispatch();

    useEffect(() => {
        store.dispatch(userActions.getFirstUserInformations());
    }, []);

    console.debug("home.mainInformations", home.mainInformations)
    if (!home.mainInformations || (home.mainInformations.type !== UserType.Approver && home.mainInformations.type !== UserType.User))
        return (<NoNetworkScreen message={"Bilgiler Yükleniyor..."} btn={{
            text: "Çıkış",
            click: () => {
                dispatch(authActions.logout());
            }
        }}/>);

    return (<View style={{flex: 1, flexDirection: "column"}}>

        {
            home.mainInformations.type === UserType.Approver ? <ApproverHomeScreen/> : <UserHomeScreen/>
        }

        {/*<View style={{position: 'absolute', width: '100%', height: '100%', left: 0, top: 0}}>*/}
        {/*    <Loader/>*/}
        {/*</View>*/}
    </View>);
};

export default HomeScreen;
