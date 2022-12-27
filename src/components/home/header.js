import {View, StyleSheet, Text, SafeAreaView, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Header, Icon} from "react-native-elements";
import * as actions_auth from '../../actions/auth';
import * as actions_user from '../../actions/user';
import * as actions_approver from '../../actions/approver';
import {COLORS} from "../../config/constants";
import {UserType} from "../../constants/enums";
import {setLoading} from "../../actions/loader";

const HomeHeader = () => {
    const home = useSelector((state) => state.home);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <Header containerStyle={styles.header}
                placement="left"
                centerComponent={() => {
                    return (
                        <View style={{flexDirection: "row"}}>
                            <View style={{
                                height: '100%',
                                width: 1,
                                backgroundColor: '#fff',
                                marginRight: 10
                            }}></View>
                            <Text style={styles.headerText}>
                                Merhaba {home.mainInformations ? home.mainInformations.firstname : ""} {home.mainInformations ? home.mainInformations.lastname : ""}.
                            </Text>
                        </View>
                    );
                }}
                rightComponent={() => <View style={{flexDirection: "row"}}>
                    <TouchableOpacity
                        onPressIn={() => {
                            dispatch(setLoading());

                            setTimeout(() => {
                                dispatch(actions_user.getFirstUserInformations());
                                if (home.mainInformations.type === UserType.Approver) {
                                    dispatch(actions_approver.getPendingApproveRequests());
                                } else {
                                    dispatch(actions_user.getMyRequests());
                                    dispatch(actions_user.getWasteTypes());
                                }
                            }, 500);

                        }}
                        style={{
                            width: 50,
                            padding: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            borderColor: "white",
                            borderWidth: 1,
                            borderRadius: 15,
                        }}>
                        <Text style={{color: 'white'}}>Yenile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPressIn={() => dispatch(actions_auth.logout())}
                        style={{
                            width: 50,
                            padding: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            borderColor: "white",
                            borderWidth: 1,
                            borderRadius: 15,
                            marginLeft: 10
                        }}>
                        <Text style={{color: "#fff"}}>Çıkış</Text>
                    </TouchableOpacity>
                </View>}
        />
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.green,
        shadowColor: "rgba(0,0,0, 0.56)",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.68,
        shadowRadius: 6.27,
        elevation: 20,
        height: 100,
    },
    headerContext: {
        flexDirection: "column",
        justifyContent: "center",
        flex: 1
    },
    headerText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600"
    }
})

export default HomeHeader;