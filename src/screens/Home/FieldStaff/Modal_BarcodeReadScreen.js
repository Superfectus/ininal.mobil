import React, {useEffect, useState} from 'react';

import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import BarcodeIcon from "../../../components/icons/barcodeIcon";
import BarcodePersonImage from "../../../components/icons/barcodePersonImage";
import {COLORS, modalStyles} from "../../../config/constants";
import {useDispatch, useSelector} from "react-redux";
import {BarCodeScanner} from "expo-barcode-scanner";
import * as user_actions from "../../../actions/user";
import commonHelper from "../../../Other/commonHelper";
import IconPencil from "../../../components/icons/iconPencil";
import IconClose from "../../../components/icons/iconClose";

const BarcodeReadScreen = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scan, setScan] = useState(null);
    const [barcode, setBarcode] = useState(null);
    const [tmpEnteredBarcode, setTmpEnteredBarcode] = useState(null);
    const [promptShow, setPromptShow] = useState(false);

    const home = useSelector((state) => state.home);
    const dispatch = useDispatch();

    useEffect(() => {

        if (home.errorWasteCalculate) {
            Alert.alert(home.errorWasteCalculate);
        }
        
        if (home.wasteRequestState) {
            setBarcode(null);
            navigation.navigate("MySales");
            dispatch(user_actions.wasteTypesRequestCompleted(false));
        }

    }, [home.wasteCalculateResult, home.wasteRequestState]);
    useEffect(() => {
        BarCodeScanner.requestPermissionsAsync().then((result) => {
            const {status} = result;
            setHasPermission(status === 'granted');

            if (hasPermission) {
                setScan(false);
            }
        });
    }, []);

    const handleBarCodeScanned = ({type, data}) => {
        console.debug("entered barcode", data);
        setScan(false);
        const barcode = data ? parseInt(data.trim()) : 0;
        if (barcode.toString().length === 13 && barcode >= 1000000000000 && barcode < 10000000000000) {
            setBarcode(data.trim());
        } else {
            Alert.alert('Hatalı Barkod.\nSadece rakam ve 13 karakterden oluşmalıdır!');
        }
    };

    return scan ?
        (
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
                        onPress={() => setScan(false)}
                    >
                        <Text style={{color: "white"}}>VAZGEÇ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
        :
        (
            <View style={{flex: 1}}>
                <SafeAreaView style={{flexDirection: "column", flex: 1, marginTop: 20}}>
                    <View style={styles.header}>
                        <View style={{
                            height: 25,
                            width: 2,
                            marginRight: 10,
                            backgroundColor: COLORS.green
                        }}></View>
                        <Text style={styles.headerText}>Yüklenecek Miktar</Text>
                        <View style={{
                            backgroundColor: COLORS.green,
                            padding: 8,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 15,
                            flex: 4
                        }}>
                            <View>
                                <Text style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    marginRight: 10
                                }}>{commonHelper.numberWithCommas(home.wasteCalculateResult?.totalPrice)}</Text>
                            </View>
                            <View style={{
                                borderRadius: 24 / 2,
                                width: 24,
                                height: 24,
                                backgroundColor: "#fff",
                                justifyContent: 'center',
                                alignItems: 'center'
                            }} underlayColor='#ccc'>
                                <Text style={{fontSize: 18, color: COLORS.green}}>₺</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 2, justifyContent: "center", alignItems: "center"}}><BarcodePersonImage/></View>
                    <View style={{
                        flex: 2,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        backgroundColor: COLORS.green,
                        justifyContent: "space-around",
                        alignItems: "center"
                    }}>
                        {hasPermission ?
                            <Text style={{fontSize: 10, color: "white"}}>İşleme başladıktan sonra, kamerayı yükleme
                                yapılacak
                                barkoda
                                doğru tutunuz.</Text>
                            :
                            <Text style={{fontSize: 24, color: "red", fontWeight: "bold"}}>Kamera erişim yetkisine
                                ihtiyacımız var. Lütfen öncelikle izin veriniz.</Text>
                        }
                        <BarcodeIcon/>
                        <View style={{flexDirection: "row"}}>

                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    borderRadius: 25,
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

                                    setPromptShow(true);

                                }}>
                                <Text style={{color: COLORS.green, fontWeight: "bold"}}>Barkod Gir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={!hasPermission}
                                style={{
                                    flex: 1,
                                    borderRadius: 25,
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
                                    setScan(true);
                                }}>
                                <Text style={{color: COLORS.green, fontWeight: "bold"}}>Barkod Okut</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    borderRadius: 25,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: 10,
                                    marginLeft: 5,
                                    marginRight: 20,
                                    backgroundColor: "transparent",
                                    borderColor: "#fff",
                                    borderWidth: 1
                                }}
                                onPress={() => {
                                    setBarcode(null);
                                    navigation.goBack();
                                }}>
                                <Text style={{color: "#fff", fontWeight: "bold"}}>VAZGEÇ</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </SafeAreaView>
                {
                    promptShow ?
                        (<View style={modalStyles.modal}>
                            <View style={modalStyles.modalContainer}>
                                <View style={modalStyles.modalHeader}>
                                    <Text style={{fontSize: 20, color: "white", fontWeight: "bold"}}>
                                        BARKOD GİRİŞİ
                                    </Text>
                                </View>
                                <View style={modalStyles.modalBody}>
                                    <TextInput
                                        autoCapitalize='none'
                                        placeholder={"BARKOD"}
                                        keyboardType={"ascii-capable"}
                                        value={tmpEnteredBarcode}
                                        onChange={(event, i) => {
                                            const {text} = event.nativeEvent;
                                            setTmpEnteredBarcode(text);
                                        }}
                                        autoFocus={true}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: COLORS.green,
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            borderRadius: 10,
                                            height: 30,
                                            fontSize: 18
                                        }}
                                    />
                                </View>
                                <View style={modalStyles.modalFooter}>
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            borderRadius: 25,
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
                                            setBarcode(null);
                                            setTmpEnteredBarcode(null);
                                            setPromptShow(false);
                                            navigation.goBack();
                                        }}>
                                        <Text style={{color: COLORS.green, fontWeight: "bold"}}>VAZGEÇ</Text>
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
                                            handleBarCodeScanned({
                                                type: "manual", data: tmpEnteredBarcode
                                            });
                                            setTmpEnteredBarcode(null);
                                            setPromptShow(false);
                                        }}>
                                        <Text style={{color: "#fff", fontWeight: "bold"}}>ONAYLA</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>)
                        : (<></>)
                }
                {
                    barcode && barcode.length > 1 ?
                        (<View style={modalStyles.modal}>
                            <View style={modalStyles.modalContainer}>
                                <View style={modalStyles.modalHeader}>
                                    <Text style={{fontSize: 20, color: "white", fontWeight: "bold"}}>
                                        YÜKLEME ONAYI
                                    </Text>
                                </View>
                                <View style={modalStyles.modalBody}>
                                    <Text style={{
                                        letterSpacing: 1
                                    }}>
                                        <Text style={{fontWeight: "bold"}}>{barcode}</Text> NO'LU BARKODA <Text
                                        style={{fontWeight: "bold"}}>{commonHelper.numberWithCommas(home.wasteCalculateResult?.totalPrice)} TL</Text> YÜKLEME
                                        YAPILACAKTIR: YÜKLEMELER YÖNETİCİ ONAYINA GÖNDERİLECEKTİR
                                    </Text>
                                    <Text style={{fontWeight: "bold", paddingTop: 10}}>
                                        ONAYLIYOR MUSUNUZ?
                                    </Text>
                                </View>
                                <View style={modalStyles.modalFooter}>
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
                                            setTmpEnteredBarcode(barcode);
                                            setPromptShow(true);
                                            setBarcode(null);
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
                                            setTmpEnteredBarcode(null);
                                            setBarcode(null);
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
                                            home.wasteCalculateResult.accountId = barcode;
                                            dispatch(user_actions.paymentRequest(home.wasteCalculateResult));
                                        }}>
                                        <Text style={{color: "#fff", fontWeight: "bold"}}>ONAYLA</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>)
                        : (<></>)
                }
            </View>
        );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.gray,
        shadowColor: "rgba(0,0,0, 0.56)",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.68,
        shadowRadius: 6.27,
        elevation: 20,
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingLeft: 20,
        paddingRight: 20
    },
    headerContext: {
        flexDirection: "column",
        justifyContent: "center",
        flex: 1
    },
    headerText: {
        flex: 9,
        color: COLORS.green,
        fontSize: 20,
        fontWeight: "600"
    }
})

export default BarcodeReadScreen;