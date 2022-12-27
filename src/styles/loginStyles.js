import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    top: {
        zIndex: 1,
        flex: 2,
        height: '100%',
        flexDirection: 'column',
        // minHeight: Dimensions.get('window').height * 0.25
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    menuItem: (current, state) => ({
        flex: 1,
        height: 50,
        backgroundColor: 'white',
        shadowColor: '#4D8D6E',
        shadowOffset: { width: 0, height: current ? 3 : 0 },
        shadowOpacity: current ? 0.7 : 0.3,
        shadowRadius: 1,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }),
    menuItemText: (current, state) => ({
        color: '#4D8D6E',
        opacity: state === 'passive' ? 0.4 : 1,
        fontWeight: 'bold',
    }),
    textInput: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 50,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,1)',
        // borderColor: 'black',
        // borderWidth: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        shadowColor: "rgba(0,0,0, 0.56)",
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 0
        },
        elevation: 10,
        shadowRadius: 10,
        marginBottom: 25,
    },
    button_input: {
        // borderColor: 'black',
        // borderWidth: 1,
        shadowColor: "rgba(77,141,100,1)",
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 0
        },
        elevation: 3,
        shadowRadius: 3,
        borderRadius: 27,
        backgroundColor:
            '#4D8D6E',
        width: '100%',
        height: 50,
        marginTop: 50
    }
    // form_container: {
    //     flexDirection: 'column',
    //     width: '85%',
    // },
    // input_label: {
    //     fontSize: 16,
    //     color: 'rgba(0,0,0, 0.5)',
    //     fontWeight: '500',
    // },
    // login_welcome: {
    //     "backgroundColor": "rgba(255, 255, 255, 0)",
    //     "color": "rgba(35, 35, 60, 1)",
    //     "fontSize": 40,
    //     "fontWeight": "700",
    //     "fontStyle": "normal",
    //     "textAlign": "center",
    //     marginBottom: 50
    // },
    // login: {
    //     flex: 1,
    //     flexDirection: "column",
    //     // alignContent: "flex-start",
    //     // justifyContent: 'center'
    // },
    // login_button: {
    //     // color: '#6CC57C',
    //     color: '#23233C',
    //     backgroundColor: "#6CC57C",
    //     height: 50,
    //     width: '100%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 18
    // },
    // login_button_text: {
    //     fontSize: 20,
    //     color: '#fff',
    //     fontFamily: 'Helvetica'
    // },
    // login_input: {
    //     "opacity": 1,
    //     "backgroundColor": "rgba(255, 255, 255, 1)",
    //     "borderRadius": 5,
    //     "shadowColor": "rgb(13,  78,  129)",
    //     "shadowOpacity": 0.050980392156862744,
    //     "shadowOffset": {
    //         "width": 0,
    //         "height": 10
    //     },
    //     elevation: 10,
    //     "shadowRadius": 10,
    //     "width": '100%',
    //     "height": 45,
    //     marginTop: 10,
    //     marginBottom: 20,
    //     paddingLeft: 10,
    //     paddingRight: 10,
    // },
});