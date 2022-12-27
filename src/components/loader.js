import {ActivityIndicator, Text, View} from 'react-native'
import React from 'react'
import {useSelector} from "react-redux";

export function Loader({props}) {

    const loader = useSelector((state) => state.loader);

    return loader.isLoading
        ? (
            <View style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.6)',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color="#00ff00"/>
            </View>
        )
        : (<View></View>);
}
