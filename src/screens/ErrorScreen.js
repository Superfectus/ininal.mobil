import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {useDispatch} from "react-redux";
import {setCheckNetwork, setLoadingComplete} from "../actions/loader";
import {COLORS} from "../config/constants";

export const NoNetworkScreen = ({message, btn}) => {
    const dispatch = useDispatch();
    
    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: COLORS.green }}>
            <View>
                <Text style={styles.title}>
                    {message ? message : "İnternet bağlantısı olmadığı için şu anda işlem yapamazsınız!"}
                </Text>
            </View>
            <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={() =>{
                    if(btn && btn.click)
                        btn.click();    
                    else
                        dispatch(setCheckNetwork(true));
                }} style={styles.buttonGroup.button} >
                    <Text style={styles.buttonGroup.button.text}>
                        {btn && btn.text ? btn.text : "Tekrar Dene"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: '600',
        color: 'white',
        marginTop: 70,
        marginLeft: 20
    },
    greenBackGround: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
    },
    buttonGroup: {
        position: 'absolute',
        bottom: '10%',
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        button: {
            width: 350,
            height: 60,
            backgroundColor: 'white',
            borderRadius: 25,
            borderWidth: 2,
            borderColor: '#4D8D6E',
            justifyContent: 'center',
            alignItems: 'center',
            text: {
                color: '#4D8D6E',
            }
        },
    },
})
