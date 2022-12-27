import React, {useEffect, useState} from 'react';

import {
    View,
    Text,
    Image,
    Alert,
    ListView,
    ScrollView,
    TextInput,
    Button,
    TouchableOpacity, StyleSheet
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import * as user_actions from "../../../actions/user";
import {COLORS} from "../../../config/constants";

const MySalesScreen = ({route, navigation}) => {
    const home = useSelector((state) => state.home);
    const loader = useSelector((state) => state.loader);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(user_actions.getMyRequests());
    }, [home.wasteRequestState]);

    useEffect(() => {
        if (home.paymentRequestsError)
            Alert.alert(home.paymentRequestsError);
    }, [home.paymentRequestsError]);


    const [activeRow, setActiveRow] = useState(-1);
    const getRow = (data, i) => {
        console.debug("data " + i, data);
        return (
            <View key={i}>
                <TouchableOpacity
                    onPress={() => {
                        setActiveRow(activeRow === i ? -1 : i);
                    }} key={data.id} style={styles.tableRow(i)}>
                    <View style={{flex: 1, paddingLeft: 5}}>
                        <Text style={{fontWeight: "bold"}}>{activeRow === i ? "-" : "+"}</Text>
                    </View>
                    <View style={{flex: 4}}>
                        <Text>{data.accountId}</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text>{data.totalPrice} ₺</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text>{data.status}</Text>
                    </View>
                </TouchableOpacity>
                {activeRow === i ? (
                        <View style={{marginBottom: 15, flexDirection: "row"}}>
                            <View style={{flex: 1}}/>
                            <View style={{flex: 4}}>

                                <Text style={{fontWeight: "bold"}}>Atıklar</Text>
                                {data.contents.map((x) => (<Text>{x.typeName + " " + x.amount + " kg"}</Text>))}
                            </View>
                            <View style={{flex: 2}}>
                                <Text style={{fontWeight: "bold"}}>Tarih</Text>
                                <Text>{data.dateCreated ? data.dateCreated : ''}</Text>
                            </View>
                            <View style={{flex: 2}}>
                                <Text style={{fontWeight: "bold"}}>Açıklama</Text>
                                <Text>{data.description}</Text>
                            </View>
                        </View>
                    )
                    : (<></>)
                }
            </View>);
    }

    return (<View style={{flexDirection: "column", flex: 1, margin: 10}}>
        {!home.paymentRequests || home.paymentRequests.length === 0 ? (
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}><Text style={{
                    fontSize: 24,
                    color: "red"
                }}>{loader.isLoading ? "Yükleniyor..." : "Kayıt Bulunamadı"}</Text></View>)
            : (
                <View style={{flex: 1}}>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <View style={{flex: 1}}><Text style={{color: "#fff"}}>#</Text></View>
                            <View style={{flex: 4}}><Text style={{color: "#fff"}}>Barkod</Text></View>
                            <View style={{flex: 2}}><Text style={{color: "#fff"}}>Tutar</Text></View>
                            <View style={{flex: 2}}><Text style={{color: "#fff"}}>Durum</Text></View>
                        </View>
                        <ScrollView style={styles.tableBody}>
                            {home.paymentRequests.map(getRow)}
                            {/*    return (<View key={i} style={[styles.tableRow, {backgroundColor: (i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.1)")}]}>*/}
                            {/*      */}
                            {/*    </View>);*/}
                            {/*})}*/}
                        </ScrollView>
                    </View>
                </View>
            )
        }
    </View>);
}

const styles = StyleSheet.create({
    table: {
        flexDirection: "column", flex: 9,
        backgroundColor: "white",
        shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        borderRadius: 10,
    },
    tableHeader: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "row",
        height: 32,
        backgroundColor: COLORS.green,
        alignItems: "center",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    tableBody: {
        flex: 9,
        padding: 10,
        paddingBottom: 0,
        paddingTop: 0,
    },
    tableRow: (i) => {
        return {
            flex: 1,
            height: 25,
            marginBottom: 2,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: (i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.1)")
        };
    },
});

export default MySalesScreen;