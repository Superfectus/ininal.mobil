import * as Services from '../services';
import React, {useEffect, useState} from 'react';
import {Keyboard, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import * as styles from '../styles';
// import PhoneTextInput from '../components/inputs/phone';
import {PwdTextInput} from '../components/inputs/password';
import Header from '../components/headerSvg/header';
import CustomButton from '../components/inputs/customButton';
import {Alert, StyleSheet} from 'react-native';
import * as actions_auth from '../actions/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UserNameTextInput} from "../components/inputs/username";
import * as Network from "expo-network";
import * as navigation from "../services/navRef";

const LoginForm = ({navigation}) => {
    const auth = useSelector((state) => state.auth);

    const {errorMessageLogin} = auth;
    const dispatch = useDispatch();
    const loader = useSelector((state) => state.loader);

    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const handleForm = (key, value) => {
        setForm((currentForm) => ({
            ...currentForm,
            [key]: value,
        }));
    };

    return (
        <View style={{flexDirection: 'column', width: '100%'}}>
            <View style={styles.loginStyles.textInput}>
                <UserNameTextInput
                    style={{width: '100%', height: '100%'}}
                    onChangeText={(val) => {
                        handleForm('username', val.trim());
                    }}

                />

            </View>
            <View style={styles.loginStyles.textInput}>
                <PwdTextInput autoCapitalize='none' placeholder={"Şifre"} style={{height: '100%'}}
                              onTextEntry={(val) => {
                                  try {
                                      handleForm('password', val && val.trim() ? val.trim() : '');
                                  } catch (e) {
                                      handleForm('password', val);
                                  }
                              }}></PwdTextInput>

            </View>
            {
                errorMessageLogin ?
                    <View style={{alignItems: 'center', marginTop: 20}}>
                        <Text style={customStyles.errorMessage}>{errorMessageLogin}</Text>
                    </View>
                    : <></>
            }
            <View>
                <CustomButton
                    isLoading={loader.isLoading}
                    text='GİRİŞ YAP'
                    isLoadingText="Giriş Yapılıyor..."
                    onPress={() => {
                        Keyboard.dismiss();
                       
                        dispatch(actions_auth.login(form.username, form.password));
                            
                    }}
                    style={{
                        backgroundColor: '#4D8D6E'
                        , justifyContent: 'center'
                        , alignItems: 'center'
                        , color: 'white'
                        , width: '100%'
                        , height: 50
                        , borderRadius: 10
                    }}/>
            </View>
        </View>

    );
}
const ForgetPasswordForm = ({navigation}) => {
    const auth = useSelector((state) => state.auth);

    const loader = useSelector((state) => state.loader);

    const [form, setForm] = useState({
        username: ''
    });

    const handleForm = (key, value) => {
        setForm((currentForm) => ({
            ...currentForm,
            [key]: value,
        }));
    };
    useEffect(()=>{
        if (auth.pwdSendCode && auth.pwdSendCode.result) {
            console.debug("navigate to NewPasswordEnter")
            navigation.navigate('NewPasswordEnter');
        }
    },[auth.pwdSendCode])
    const dispatch = useDispatch();

    return (
        <View style={{flexDirection: 'column', width: '100%'}}>
            <View style={styles.loginStyles.textInput}>
                <UserNameTextInput
                    style={{width: '100%', height: '100%'}}
                    onChangeText={(val) => {
                        handleForm('username', val.trim());
                    }}
                />

            </View>

            <View>
                <CustomButton
                    isLoading={loader.isLoading}
                    text='KOD GÖNDER'
                    isLoadingText="İşlem yapılıyor..."
                    onPress={() => {
                        Keyboard.dismiss();
                        dispatch(actions_auth.sendPasswordCode(form.username));
                    }}
                    style={{
                        backgroundColor: '#4D8D6E'
                        , justifyContent: 'center'
                        , alignItems: 'center'
                        , color: 'white'
                        , width: '100%'
                        , height: 50
                        , borderRadius: 10
                    }}/>
            </View>
        </View>
    );
}
const NewPasswordEnter = ({navigation}) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const loader = useSelector((state) => state.loader);

    const [form, setForm] = useState({
        password: '',
        repassword: '',
        code: ''
    });

    const handleForm = (key, value) => {
        setForm((currentForm) => ({
            ...currentForm,
            [key]: value,
        }));
    };


    useEffect(()=>{
        if (auth.pwdResetResult && auth.pwdResetResult.result) {
            console.debug("navigate to Login")
            navigation.navigate('Login');
            Alert.alert("Şifreniz değiştirilmiştir. Giriş yapabilirsiniz.")
        }
    },[auth.pwdResetResult])
    
    useEffect(() => {
        console.debug("!auth.pwdSendCode.result || !auth.pwdSendCode.username", !auth.pwdSendCode.result || !auth.pwdSendCode.username);
        if (!auth.pwdSendCode.result || !auth.pwdSendCode.username) {
            navigation.navigate("ForgetPassword");
        }
    }, [])

    return (
        <View style={{flexDirection: 'column', width: '100%'}}>
            <View style={styles.loginStyles.textInput}>
                <TextInput
                    style={{width: '100%', height: '100%'}}
                    autoCapitalize='none' placeholder={"Doğrulama kodu"}
                    onChangeText={(val) => {
                        handleForm('code', val.trim());
                    }}
                    onChange={(event, i) => {
                        const {text} = event.nativeEvent;

                        handleForm('code', text.trim());
                    }}
                />

            </View>
            <View style={styles.loginStyles.textInput}>
                <PwdTextInput autoCapitalize='none' placeholder={"Şifre"} style={{height: '100%'}}
                              onTextEntry={(val) => {
                                  try {
                                      handleForm('password', val && val.trim() ? val.trim() : '');
                                  } catch (e) {
                                      handleForm('password', val);
                                  }
                              }}></PwdTextInput>

            </View>
            <View style={styles.loginStyles.textInput}>
                <PwdTextInput autoCapitalize='none' placeholder={"Şifre Tekrarı"} style={{height: '100%'}}
                              onTextEntry={(val) => {
                                  try {
                                      handleForm('repassword', val && val.trim() ? val.trim() : '');
                                  } catch (e) {
                                      handleForm('repassword', val);
                                  }
                              }}></PwdTextInput>
            </View>
            <View>
                <CustomButton
                    isLoading={loader.isLoading}
                    text='KAYDET'
                    isLoadingText="İşlem yapılıyor..."
                    onPress={ () => {
                        Keyboard.dismiss();

                         dispatch( actions_auth.resetPassword(form));
                    }}
                    style={{
                        backgroundColor: '#4D8D6E'
                        , justifyContent: 'center'
                        , alignItems: 'center'
                        , color: 'white'
                        , width: '100%'
                        , height: 50
                        , borderRadius: 10
                    }}/>
            </View>
        </View>
    );
}

const SignInScreen = ({navigation}) => {
    const Tab = createBottomTabNavigator();
    const [activeRoute, setActiveRoute] = useState("Login");

    return (
        <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={styles.loginStyles.top}>
                <Header>
                    <View style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{fontSize: 32, fontWeight: 'bold', color: 'white', paddingTop: 25}}>
                            Atık Toplama
                        </Text>
                    </View>
                </Header>
                {/* Menu */}
                <View style={styles.loginStyles.menu}>
                    <TouchableOpacity style={styles.loginStyles.menuItem(activeRoute === "Login")} onPress={() => {
                        if (activeRoute !== "Login")
                            navigation.navigate('Login');
                    }}>
                        <Text
                            style={styles.loginStyles.menuItemText(activeRoute === "Login", activeRoute !== "Login" ? "passive" : null)}>Üye
                            Girişi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginStyles.menuItem(activeRoute !== "Login")} onPress={() => {
                        if (activeRoute === "Login")
                            navigation.navigate('ForgetPassword');
                    }}>
                        <Text
                            style={styles.loginStyles.menuItemText(activeRoute === "ForgetPassword", activeRoute !== "ForgetPassword" ? "passive" : null)}>Şifremi
                            Unuttum</Text>
                    </TouchableOpacity>
                </View>
                {/* Menu END */}
            </View>
            <View style={{flex: 5, marginTop: 50, flexDirection: 'row', justifyContent: 'flex-start', padding: 50}}>

                <Tab.Navigator tabBar={() => {
                }} screenListeners={props => {
                    setActiveRoute(props.route.name);
                }}>
                    <Tab.Screen options={{
                        headerShown: false,
                        tabBarStyle: 'none'
                    }} name="Login" component={LoginForm}/>
                    <Tab.Screen options={{
                        headerShown: false,
                        tabBarStyle: 'none'
                    }} name="ForgetPassword" component={ForgetPasswordForm}/>
                    <Tab.Screen options={{
                        headerShown: false,
                        tabBarStyle: 'none'
                    }} name="NewPasswordEnter" component={NewPasswordEnter}/>
                </Tab.Navigator>
            </View>
        </View>
    );
}

const customStyles = StyleSheet.create({
    errorMessage: {
        color: '#ff0000'
    }
});

export default SignInScreen;
