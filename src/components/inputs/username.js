import { TextInput, View} from 'react-native'
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {useSelector} from "react-redux";

export const UserNameTextInput = (props) => {
    const loader = useSelector((state) => state.loader);

    return (
        <View style={{flexDirection: 'row', width: '100%'}}>
            <View style={{maxWidth: 30, flex:1, width: '100%', justifyContent: 'center'}}>
                <FontAwesomeIcon size={20} icon={faUser} color='rgba(41,41,41,0.62)'/>
            </View>
            <TextInput
                autoCapitalize='none'
                placeholder={"Kullanıcı Adı"}
                keyboardType={"ascii-capable"}
                {...props}
                disabled={loader.isLoading}
                onChange={(event, i) => {
                    const {text} = event.nativeEvent;

                    if(props.onChangeText && typeof props.onChangeText === "function"){
                        props.onChangeText(text);
                    }
                }}
                style={[props.style, {flex: 8}]}
            />
        </View>
    );
}