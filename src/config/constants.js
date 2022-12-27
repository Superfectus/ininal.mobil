import {StyleSheet} from "react-native";

export const API_URL = 'https://redefinetest.ininal.com/api/';
export const COLORS = {
    green: "#4D8D6E",
    gray: "#F5F5F5"
}


export const modalStyles = StyleSheet.create({
    modal: {
        position: "absolute",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalContainer: {
        width: 250,
        height: 300,
        maxWidth: "100%",
        maxHeight: "100%",
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "white",
        borderRadius: 15,
        borderWidth: 0,
    },
    modalHeader: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.green,
        shadowColor: "rgba(0,0,0, 0.56)",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.68,
        shadowRadius: 6.27,
        elevation: 20,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 65
    },
    modalBody: {
        flex: 4,
        justifyContent: "center",
        paddingLeft: 15,
        paddingRight: 15,
    },
    modalFooter: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        paddingBottom: 10
    }
})