import {composeWithDevTools} from 'redux-devtools-extension';
import {
    applyMiddleware,
    combineReducers,
    legacy_createStore,
} from 'redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './auth';
import homeReducer from './home';
import loaderReducer from './loader';
import approverReducer from './approver';

const reducers = combineReducers({
    auth: authReducer,
    home: homeReducer,
    loader: loaderReducer,
    approver: approverReducer,
});

const middleware = [ReduxThunk];

const store = legacy_createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
