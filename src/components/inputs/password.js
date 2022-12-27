import {Text, TextInput, View, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faKey, faPerson, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import {useSelector} from "react-redux";

export const PwdTextInput = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const loader = useSelector((state) => state.loader);

    return (
        <View style={{flex:1, flexDirection: 'row', width: '100%'}}>
            <View style={{maxWidth: 30, flex:1, justifyContent: 'center'}}>
                <FontAwesomeIcon size={20} icon={faKey} color='rgba(41,41,41,0.62)'/>
            </View>
            <TextInput
                placeholder="Şifre"
                keyboardType={"ascii-capable"}
                secureTextEntry={!isVisible}
                style={{flex: 8}}
                disabled={loader.isLoading}
                onChangeText={(rawText) => {
                    if (props.onTextEntry && typeof (props.onTextEntry) === 'function') {
                        props.onTextEntry(rawText);
                    }
                }}
            />
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} onPress={() => {
                setIsVisible(!isVisible);
            }}>
                <FontAwesomeIcon size={20} icon={isVisible ? faEyeSlash : faEye} color='rgba(41,41,41,0.62)'/>
            </TouchableOpacity>
        </View>
    );
}