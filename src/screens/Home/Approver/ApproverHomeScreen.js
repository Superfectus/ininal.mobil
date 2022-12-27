import React, {useEffect, useState} from 'react';

import {View, StyleSheet, Text, TouchableOpacity, Alert, ScrollView, TextInput} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {COLORS, modalStyles} from "../../../config/constants";
import HomeHeader from "../../../components/home/header";
import * as approverActions from "../../../actions/approver";
import Toast from "react-native-toast-message";
import {COMPLETE_OPERATION} from "../../../constants/approver";

const ApproverHomeScreen = ({navigation}) => {
    const home = useSelector((state) => state.home);
    const approver = useSelector((state) => state.approver);
    const dispatch = useDispatch();
    const [activeRow, setActiveRow] = useState(-1);
    const [promptShow, setPromptShow] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState({id:'',description:''});
    useEffect(() => {
        dispatch(approverActions.getPendingApproveRequests(1));
    }, []);

    if (approver.operationComplete) {
        Toast.show({
            type: 'success',
            text: '',
            text1: 'İşlem Başarılı'
        });
        dispatch(approverActions.getPendingApproveRequests(1));
        dispatch({
            type: COMPLETE_OPERATION,
            payload: false
        });
    }

    useEffect(() => {
        if (approver.error)
            Alert.alert(approver.error);
    }, [approver.error]);

    const getRow = (data, i) => {
        return (
            <View key={i}>
                <TouchableOpacity
                    onPress={() => {
                        setActiveRow(activeRow === i ? -1 : i);
                    }} key={data.id} style={styles.tableRow(i)}>
                    <View style={{flex: 1}}>
                        <Text style={{fontWeight: "bold", fontSize: 18}}>{activeRow === i ? "-" : "+"}</Text>
                    </View>
                    <View style={{flex: 4}}>
                        <Text>{data.createdUser.firstname} {data.createdUser.lastname}</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text>{data.contents.map((x) => x.amount).reduce((a, b) => a + b, 0)}</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text>{data.totalPrice} ₺</Text>
                    </View>
                    {!data.status ? (<></>) : data.status === "Pending"
                        ? (
                            <View style={{flex: 5, flexDirection: "row", justifyContent: "space-around"}}>
                                <TouchableOpacity onPress={() => {
                                    Alert.alert(null, "Onaylama işlemi yapılacaktır. Devam etmek istiyor musunuz?", [
                                        {
                                            onPress: () => {
                                                dispatch(approverActions.approveRequest(data.id));
                                            },
                                            style: "default",
                                            text: "Evet"
                                        },
                                        {
                                            onPress: () => {
                                            },
                                            style: "cancel",
                                            text: "İptal"
                                        }
                                    ]);
                                }} style={{
                                    padding: 3,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: COLORS.green
                                }}><Text style={{fontWeight: "bold", color: "green"}}>Onayla</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setSelectedRequest(data);
                                    setPromptShow(true);
                                }} style={{
                                    padding: 3,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: "red",
                                }}><Text style={{fontWeight: "bold", color: "red"}}>Reddet</Text></TouchableOpacity>
                            </View>
                        ) : data.status === "Rejected" ? (
                            <View style={{flex: 5}}>
                                <Text>Reddedilmiş</Text>
                            </View>
                        ):(
                            <View style={{flex: 5}}>
                                <Text>Onaylanmış</Text>
                            </View>
                        )
                    }
                </TouchableOpacity>
                {activeRow === i ? (
                        <View style={{marginBottom: 15,flexDirection: "row"}}>
                            <View style={{flex: 1}}/>
                            <View style={{flex: 4}}>
                                <Text style={{fontWeight: "bold"}}>Atıklar</Text>
                                {data.contents.map((x) => (<Text>{x.typeName + " " + x.amount + " kg"}</Text>))}
                            </View>
                            <View style={{flex: 2}}>
                                <Text style={{fontWeight: "bold"}}>Tarih</Text>
                                <Text >{data.dateCreated}</Text>
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
    const limit = home.mainInformations && home.mainInformations.limits ? home.mainInformations.limits.filter((x) => x.type === "DailyLimit") : [];
    
    const RejectTheRequest = () =>{
        Alert.alert(null, "Reddetme işlemi yapılacaktır. Devam etmek istiyor musunuz?", [
            {
                onPress: () => {
                    dispatch(approverActions.rejectRequest(selectedRequest.id, selectedRequest.description));
                },
                style: "default",
                text: "Evet"
            },
            {
                onPress: () => {
                },
                style: "cancel",
                text: "İptal"
            }
        ]);
    }
    return (
        <View style={{flexDirection: "column", flex: 1}}>
            <HomeHeader/>
            <View style={{flex: 1, margin: 10}}>
                <View style={{flexDirection: "column", flex: 8}}>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <View style={{flex: 1}}><Text style={{color: "#fff"}}>#</Text></View>
                            <View style={{flex: 4, justifyContent:"flex-start", flexDirection: "row"}}><Text style={{color: "#fff"}}>Kullanıcı</Text></View>
                            <View style={{flex: 2, justifyContent:"flex-start", flexDirection: "row"}}><Text style={{color: "#fff"}}>Miktar</Text></View>
                            <View style={{flex: 2, justifyContent:"flex-start", flexDirection: "row"}}><Text style={{color: "#fff"}}>Tutar</Text></View>
                            <View style={{flex: 4, justifyContent:"flex-start", flexDirection: "row"}}><Text style={{color: "#fff"}}>Durum</Text></View>
                        </View>
                        <ScrollView style={styles.tableBody}>
                            {approver.requests.map((data, i) => getRow(data, i))}
                        </ScrollView>
                    </View>
                </View>
                <View style={{flexDirection: "column", flex: 4, justifyContent: "space-around"}}>
                    <TouchableOpacity onPress={() => {
                        Alert.alert(null, "Tüm istekler onaylanacaktır. Devam etmek istiyor musunuz?", [
                            {
                                onPress: () => {
                                    dispatch(approverActions.approveAllPendingRequest());
                                },
                                style: "default",
                                text: "Evet"
                            },
                            {
                                onPress: () => {
                                },
                                style: "cancel",
                                text: "İptal"
                            }
                        ]);
                    }} style={{
                        borderWidth: 1,
                        borderColor: COLORS.green,
                        backgroundColor: COLORS.green,
                        borderRadius: 10,
                        padding: 20,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Text style={{
                            fontSize: 18,
                            flexWrap: "wrap",
                            color: "white",
                            fontWeight: "bold"
                        }}>
                            TÜM BEKLEYENLERİ ONAYLA
                        </Text>
                    </TouchableOpacity>
                    <View style={{
                        borderWidth: 1,
                        borderColor: "white",
                        backgroundColor: "white",
                        shadowColor: "rgba(0,0,0,0.5)",
                        shadowOffset: {height: 2},
                        shadowOpacity: 0.5,
                        shadowRadius: 1,
                        elevation: 1,
                        borderRadius: 10,
                        padding: 20,
                    }}>
                        <Text style={{fontSize: 18, flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}>
                            Kalan toplam yüklenebilir belediye bakiyesi: <Text
                            style={{fontWeight: "bold"}}>{limit && limit.length > 0 ? limit[0].remainingLimit : 0}</Text> TRY
                        </Text>
                    </View>
                </View>
            </View>


            {
                promptShow ?
                    (<View style={modalStyles.modal}>
                        <View style={modalStyles.modalContainer}>
                            <View style={modalStyles.modalHeader}>
                                <Text style={{fontSize: 20, color: "white", fontWeight: "bold"}}>
                                    AÇIKLAMA
                                </Text>
                            </View>
                            <View style={modalStyles.modalBody}>
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder={"Açıklama"}
                                    keyboardType={"ascii-capable"}
                                    onChange={(event, i) => {
                                        const {text} = event.nativeEvent;
                                        selectedRequest.description = text;
                                    }}
                                    multiline={true}
                                    autoFocus={true}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: COLORS.gray,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        borderRadius: 10,
                                        fontSize: 16,
                                        flex:1,
                                        marginTop:10,
                                        marginBottom:10
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
                                        setPromptShow(false);
                                        setSelectedRequest(null);
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
                                        setPromptShow(false);
                                        RejectTheRequest();
                                        setSelectedRequest(null);
                                    }}>
                                    <Text style={{color: "#fff", fontWeight: "bold"}}>ONAYLA</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>)
                    : (<></>)
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
    tableRow: (i) => ({
        flex: 1,
        height: 35,
        marginBottom: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: (i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.1)")
    }),
});

export default ApproverHomeScreen;
