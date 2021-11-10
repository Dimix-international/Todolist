import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {WeatherCardContainer} from "../features/Weather/WeatherCardContainer";
import {CircularProgress, LinearProgress} from "@material-ui/core";
import {
    CustomizedSnackbars,
    SNACKBARS_TRIGGER
} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {Login} from "../features/Login/Login";
import {BrowserRouter, Route} from "react-router-dom";
import {Button} from "@mui/material";
import {logOutTC} from "../features/Login/auth_reducer";


type AppType = {
    demo?: boolean
}
function App({demo = false}: AppType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const error = useSelector<AppRootStateType, null | string>(state => state.app.error);
    const dispatch = useDispatch();
    //состояние инициализации
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    //чтобы появилась кнопка вылогинится
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    //производим инициализацию
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    //вылогиниваемся
    const logOutHandler = () => {
        dispatch(logOutTC());
    }

    if (!isInitialized) { //показываем крутилку пока не проинициализируемся
        return <CircularProgress style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            translate: '-50%, -50%',
        }}/>
    }
    return (
        <BrowserRouter>
            <div style={{padding: '20px 0', position: 'relative'}}>
                {status === 'loading' && <LinearProgress/>}
                <div className="App">

                    {/*кнопка вылогинивания*/}
                    {
                        isLoggedIn && <Button
                            style={{
                                position: 'absolute',
                                top: 10,
                                left: 30,
                            }}
                            variant="outlined"
                            onClick={logOutHandler}
                        >
                            Log out
                        </Button>
                    }

                    <Route exact path={'/'}
                           render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>

                    <CustomizedSnackbars
                        error={error}
                        dispatch={dispatch}
                        triggerName={SNACKBARS_TRIGGER.APP_TODOLIST}
                    />
                </div>
                <WeatherCardContainer demo={demo}/>
            </div>
        </BrowserRouter>
    );
}


export default App;


