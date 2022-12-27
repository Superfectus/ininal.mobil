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
    TouchableOpacity, StyleSheet, Keyboard
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {COLORS} from "../../../config/constants";
import {setLoadingComplete} from "../../../actions/loader";
import * as user_actions from "../../../actions/user";
import commonHelper from "../../../Other/commonHelper";


const WasteEnterScreen = ({navigation}) => {
    const home = useSelector((state) => state.home);
    const loader = useSelector((state) => state.loader);
    const dispatch = useDispatch();


    useEffect(() => {

        if(home.wasteCalculateResult){
            navigation.navigate("BarcodeRead");
        }
        else
        if (home.errorsGettingMainInformations) {
            setTimeout(() => {
                Alert.alert(home.errorsGettingMainInformations);
            }, 10)
        }
    }, [home.wasteCalculateResult, home.errorsGettingMainInformations]);

    let hasAnyWaste = false;
    const limits = home.mainInformations && home.mainInformations.limits ? home.mainInformations.limits.filter((x) => x.type === "DailyLimit") : [];
    const remainingLimit = limits.length === 0 ? 0 : limits[0].remainingLimit;

    const wasteList = home.wastes;

    if (wasteList && wasteList.length > 0) {
        hasAnyWaste = wasteList.filter((x) => x.amount && x.amount > 0).length > 0;
    }

    const onChangeText = (i, val, data) => {
        let waste = wasteList[i];
        console.debug("waste data", data);
        console.debug("waste data 1", waste);
        waste.amount = val ? (parseFloat(val) ? parseFloat(val) : 0) : 0;
        waste.totalPrice = waste.amount > 0 ? commonHelper.numberWithCommas((waste.unitPrice * waste.amount).toFixed(2)) : 0;

        dispatch(setLoadingComplete());
    }

    return (<View style={{flexDirection: "column", flex: 1, marginRight: 10, marginLeft: 10}}>
        <View style={{
            flex: 1,
            height: 70,
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 10,
        }}>
            <Text style={{flex: 3}}>Kalan Günlük Yükleme Limiti</Text>
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={{flexDirection: "column", justifyContent: "center", marginRight: 5}} allowFontScaling={true}>
                    <Text style={{fontWeight: "400", fontSize: 26}} allowFontScaling={true}>{remainingLimit}</Text>
                </View>
                <View style={{
                    borderRadius: 36 / 2,
                    width: 36,
                    height: 36,
                    backgroundColor: COLORS.green,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} underlayColor='#ccc'>
                    <Text style={{fontSize: 25, color: "white"}}> ₺</Text>
                </View>
            </View>
        </View>
        <View style={styles.table}>
            <View style={styles.tableHeader}>
                <View style={{flex: 1}}><Text style={{color: "#fff"}}>#</Text></View>
                <View style={{flex: 4}}><Text style={{color: "#fff"}}>Atık Türü</Text></View>
                <View style={{flex: 2}}><Text style={{color: "#fff"}}>KG</Text></View>
                <View style={{flex: 2}}><Text style={{color: "#fff"}}>TL</Text></View>
            </View>
            <View style={styles.tableBody}>
                <ScrollView>
                    {wasteList.map((data, i) => {
                        return (<View key={i} style={styles.tableRow}>
                            <View style={{flex: 1}}>
                                <Image
                                    source={{uri: data.imagePath}}
                                    style={{width: 32, height: 32, flex: 1}}
                                />
                            </View>
                            <View style={{flex: 4}}>
                                <Text>{data.title}</Text>
                            </View>
                            <View style={{flex: 2}}>
                                <TextInput style={{
                                    backgroundColor: COLORS.gray,
                                    width: "100%",
                                    height: 36,
                                    paddingLeft: 10,
                                    borderRadius: 10,
                                }}
                                           placeholder={"0"}
                                           keyboardType={"numeric"}
                                           onChangeText={(val) => onChangeText(i, val, data)}
                                           returnKeyType={"done"}
                                           value={data.amount ? data.amount.toString() : ""}
                                           onKeyPress={(e) => {
                                               if (e.nativeEvent.key === "done") {
                                                   Keyboard.dismiss();
                                               }
                                           }}
                                           onChange={(event) => {
                                               const {text} = event.nativeEvent;

                                               onChangeText(i, text, data);
                                           }}/>

                            </View>
                            <View style={{flex: 2, alignItems: "flex-end"}}>
                                <Text>{data.totalPrice} ₺</Text>
                            </View>
                        </View>);
                    })}
                </ScrollView>
            </View>
        </View>
        <View style={{margin: 15}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 10}}>

                <TouchableOpacity disabled={!hasAnyWaste}
                                  style={[{opacity: hasAnyWaste ? 1 : 0.4}, styles.yukleBtn]}
                                  onPress={() => {
                                      dispatch(user_actions.calculateWasteTypes(wasteList));
                                  }}>
                    <Text style={{color: COLORS.green, fontWeight: "600", fontSize: 16}}>Yükle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.yukleBtn} onPress={() => {
                    navigation.navigate("ReadDataWithQr");
                }}>
                    <Text style={{color: COLORS.green, fontWeight: "600", fontSize: 16}}>QR kod ile yükle</Text>
                </TouchableOpacity>

            </View>

        </View>
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
    tableRow: {
        flex: 1,
        height: 40,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    yukleBtn: {
        backgroundColor: "#fff",
        borderColor: COLORS.green,
        borderRadius: 25,
        borderWidth: 1,
        height: 32,
        width: 160,
        justifyContent: "center",
        alignItems: "center"
    },
    emirlerimBtn: {
        borderRadius: 15,
        height: 36,
        backgroundColor: COLORS.green,
        justifyContent: "center",
        alignItems: "center"
    },

});

export default WasteEnterScreen;