import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import * as svgs from '../svg/welcomeSvgs';
import {useDispatch} from "react-redux";
import {wellcomeClose} from "../actions/wellcome"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WelcomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <svgs.GreenBackground style={styles.greenBackGround}></svgs.GreenBackground>
            <svgs.Cloud style={styles.cloud}></svgs.Cloud>
            <svgs.People style={styles.people} />
            <View>
                <Text style={styles.title}>
                    Merhaba!
                </Text>
            </View>
            <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={() =>{
                    dispatch(wellcomeClose());
                }} style={styles.buttonGroup.button} >
                    <Text style={styles.buttonGroup.button.text}>
                        Giriş Yap
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    people: {
        position: 'absolute',
        top: '15%',
        left: 0,
    },
    title: {
        fontSize: 40,
        fontWeight: '600',
        color: 'white',
        marginTop: 70,
        marginLeft: 20
    },
    cloud: {
        position: 'absolute',
        left: '-2%',
        top: '5%'
    },
    greenBackGround: {
        position: 'absolute',
        left: "-50%",
        top: 900 * (900 / windowHeight) * -.3,
        width: 840 * (840 / windowWidth),
        height: 900 * (900 / windowHeight),
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

export default WelcomeScreen;