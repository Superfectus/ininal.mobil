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
import {BarCodeScanner} from "expo-barcode-scanner";
import * as user_actions from "../../../actions/user";
import {useDispatch, useSelector} from "react-redux";
import {COLORS} from "../../../config/constants";
import HomeHeader from "../../../components/home/header";
import commonHelper from "../../../Other/commonHelper";
import IconPencil from "../../../components/icons/iconPencil";
import IconClose from "../../../components/icons/iconClose";

const ReadDataQrScreen = ({navigation}) => {
    const home = useSelector((state) => state.home);
    const dispatch = useDispatch();

    const [hasPermission, setHasPermission] = useState(false);
    const [scan, setScan] = useState(false);
    const [kilograms, setKilograms] = useState(0);
    const [waste, setWaste] = useState(null);

    useEffect(() => {
        BarCodeScanner.requestPermissionsAsync().then((result) => {
            const {status} = result;
            setHasPermission(status === 'granted');

            if (status === 'granted') {
                setScan(true);
            }
        });
    }, []);
    const handleBarCodeScanned = ({type, data}) => {
        setScan(false);
        if (data && data.trim().length > 0) {
            setKilograms(parseInt(data));
        } else {
            Alert.alert('Hatalı Barkod');
        }
    };

    if (!scan && kilograms <= 0)
        setScan(true);
    
    return (scan
        ? (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <BarCodeScanner
                    onBarCodeScanned={scan ? handleBarCodeScanned : () => {
                    }}
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    style={[StyleSheet.absoluteFill, {backgroundColor: "black"}]}
                >
                </BarCodeScanner>
                <View style={{position: "absolute", bottom: 0, marginBottom: 50}}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "red",
                            borderColor: "white",
                            borderWidth: 1,
                            borderRadius: 10,
                            width: 100,
                            height: 30,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{color: "white"}}>VAZGEÇ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
        : kilograms > 0
            ? (
                <View style={{flex: 1}}>
                    <HomeHeader/>

                    <View style={{flexDirection: "column", flex: 1, marginRight: 10, marginLeft: 10}}>
                        <View style={{
                            flex: 1,
                            height: 70,
                            alignItems: "center",
                            flexDirection: "row",
                            marginBottom: 10,
                        }}>
                            <Text style={{flex: 3}}>Atık Miktarı</Text>
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <View style={{flexDirection: "column", justifyContent: "center", marginRight: 5}}>
                                    <Text style={{fontWeight: "400", fontSize: 26}}>{kilograms}</Text>
                                </View>
                                <View style={{
                                    borderRadius: 36 / 2,
                                    width: 36,
                                    height: 36,
                                    backgroundColor: COLORS.green,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }} underlayColor='#ccc'>
                                    <Text style={{fontSize: 25, color: "white"}}>KG</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <View style={{flex: 1}}><Text style={{color: "#fff"}}>#</Text></View>
                                <View style={{flex: 4}}><Text style={{color: "#fff"}}>Atık Türü</Text></View>
                            </View>
                            <View style={styles.tableBody}>
                                <ScrollView>
                                    {home.wastes.map((data, i) => {
                                        return (<TouchableOpacity onPress={() => {
                                            const newData = Object.assign({}, data,);

                                            newData.amount = kilograms;
                                            newData.totalPrice = kilograms * data.unitPrice;

                                            setWaste(newData);
                                        }} key={i} style={styles.tableRow}>
                                            <View style={{flex: 1}}>
                                                <Image
                                                    source={{uri: data.imagePath}}
                                                    style={{width: 32, height: 32, flex: 1}}
                                                />
                                            </View>
                                            <View style={{flex: 4}}>
                                                <Text>{data.title}</Text>
                                            </View>
                                        </TouchableOpacity>);
                                    })}
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                    {waste != null ? (
                        <View style={styles.modal}>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalHeader}>
                                    <Text style={{fontSize: 20, color: "white", fontWeight: "bold"}}>
                                        SEÇİM ONAYI
                                    </Text>
                                </View>
                                <View style={styles.modalBody}>
                                    <Text style={{
                                        letterSpacing: 1
                                    }}>
                                        <Text style={{fontWeight: "bold"}}>Atık Cinsi</Text> {waste.title}
                                    </Text>
                                    <Text style={{
                                        letterSpacing: 1
                                    }}>
                                        <Text style={{fontWeight: "bold"}}>KG</Text> {kilograms}
                                    </Text>
                                    <Text style={{fontWeight: "bold", paddingTop: 10}}>
                                        DEVAM ETMEK İSTİYOR MUSUNUZ?
                                    </Text>
                                </View>
                                <View style={styles.modalFooter}>
                                    <TouchableOpacity
                                        style={{
                                            borderRadius: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: 10,
                                            marginLeft: 5,
                                            marginRight: 5,
                                            backgroundColor: "white",
                                            borderColor: "#4D8D6E",
                                            borderWidth: 1
                                        }}
                                        onPress={() => {
                                            setKilograms(0);
                                            setWaste(null);
                                            setScan(true);
                                        }}>
                                        <IconPencil/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            borderRadius: 10,
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: 10,
                                            backgroundColor: "white",
                                            borderColor: "red",
                                            borderWidth: 1
                                        }}
                                        onPress={() => {
                                            setKilograms(0);
                                            setWaste(null);
                                            setScan(false);
                                            navigation.goBack();
                                        }}>
                                        <IconClose color={"red"}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            borderRadius: 25,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: 10,
                                            marginLeft: 5,
                                            marginRight: 5,
                                            borderColor: "#fff",
                                            backgroundColor: COLORS.green,
                                            borderWidth: 1
                                        }}
                                        onPress={() => {
                                            navigation.navigate("BarcodeRead");
                                            dispatch(user_actions.calculateWasteTypes([waste]));

                                            setKilograms(0);
                                            setWaste(null);
                                            setScan(true);
                                        }}>
                                        <Text style={{color: "#fff", fontWeight: "bold"}}>ONAYLA</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ) : (<></>)}
                </View>
            )
            : <View></View>);
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

    modal: {
        position: "absolute",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalContainer: {
        width: 250,
        height: 300,
        maxWidth: "100%",
        maxHeight: "100%",
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "white",
        borderRadius: 15,
        borderWidth: 0,
    },
    modalHeader: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.green,
        shadowColor: "rgba(0,0,0, 0.56)",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.68,
        shadowRadius: 6.27,
        elevation: 20,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 65
    },
    modalBody: {
        flex: 4,
        justifyContent: "center",
        paddingLeft: 15,
        paddingRight: 15,
    },
    modalFooter: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        paddingBottom: 10
    }

});

export default ReadDataQrScreen;