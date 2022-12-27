import { View, Text, Button, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';

export default function CustomButton(props) {
    props = props || {
        isLoading: false,
        style: {}
    };

    
    return (
        <TouchableOpacity
            disabled={props.isLoading}
            onPress={() => {
                if (props.onPress) {
                    props.onPress();
                }
            }}
            style={props.style}
        >
            <View
                style={[props.style, { opacity: props.isLoading ? 0.5 : 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}
            >
                <View style={{ flex: 1 }}>{
                    props.isLoading ? <ActivityIndicator size='small' color='white' style={{ marginRight: 20 }} /> : <></>
                }</View>
                <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[props.textStyle ? props.textStyle : { color: 'white', fontWeight: 'bold', fontSize: 16 }]}>
                        {props.isLoading && props.isLoadingText ? props.isLoadingText : props.text}
                    </Text>
                </View>
                <View style={{ flex: 1 }} />
            </View>
        </TouchableOpacity >
    );
}