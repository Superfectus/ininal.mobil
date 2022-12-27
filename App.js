import * as React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useSelector} from 'react-redux';
import {navigationRef} from './src/services/navRef'
import store from './src/reducers';
import Navigation from "./src/navigation/Navigation";
import {useEffect, useState} from "react";
import {loggedIn} from "./src/actions/auth";
import {Loader} from "./src/components/loader";
import {getAuthAsyncStorage, removeStorage} from "./src/services/storage";
import {wellcomeOpen, wellcomeClose} from './src/actions/wellcome';
import Toast from "react-native-toast-message";

export default function App() {
    const [isLoading, setIsLoading] = useState(false);

    function toggleLoadingState(state) {
        setIsLoading(state === true);
    }

    useEffect( () => {
      const loadData = async () => {
          toggleLoadingState(true);
          const userStorage = await getAuthAsyncStorage();

          if (userStorage.showWellcome)
              store.dispatch(wellcomeOpen());
          else
              store.dispatch(wellcomeClose());

          if (userStorage.token) {
              store.dispatch(loggedIn({
                  user: userStorage.user,
                  token: userStorage.token
              }));
          }

          toggleLoadingState(false);
      };
        loadData();
    }, []);

    return (
        <View style={{flex: 1}}>
            <Provider store={store}>
                <NavigationContainer ref={navigationRef}>
                    <Navigation/>
                </NavigationContainer>
            </Provider>
            {isLoading ?
                (
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
                : (<View/>)}

            <Toast />
        </View>
    );
}
