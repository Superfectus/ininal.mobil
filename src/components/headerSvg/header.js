import * as React from "react"
import {Dimensions, StyleSheet, View} from "react-native";
import Svg, {
    Defs,
    LinearGradient,
    Stop,
    ClipPath,
    Path,
    G,
    Rect,
} from "react-native-svg"

export default function Header(params) {
    
    return (
        <View
            style={styles.bg}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                style={[params.props && params.props.style ? params.props.style : {}, StyleSheet.absoluteFillObject]}
                // viewBox={`0 0 ${originalWidth} ${originalHeight}`}
                {...params.props}
            >
                <Defs>
                    <LinearGradient id="grad"
                                    x1={1}
                                    x2={-0.035}
                                    y2={1}>
                        <Stop offset={0} stopColor="#4d8d6e"/>
                        <Stop offset={1} stopColor="#5fb288"/>
                    </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grad)"/>

            </Svg>
            {params.children}
        </View>
    );
}

const styles = StyleSheet.create({

    bg: {
        width: '100%',
        height: '100%',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 5,
        zIndex: 2
    }

});