import React, {useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {loginTC} from "./auth_reducer";
import {AppRootStateType} from "../../app/store";
import { Redirect } from 'react-router-dom';


export const Login = React.memo(() => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAppStatusAC('succeeded'));
    }, [dispatch])

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);


    const formik = useFormik({
        validate: (values) => { //при каждом нажатии мы будет попадать в эту функцию и будут приходить values
            if (!values.email) {
                return {
                    email: 'Email is required!'
                }
            }
            if (!values.password) {
                return {
                    password: 'password is required!'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            //придут все значения из формы
            dispatch(loginTC(values))
        },
    });

    if(isLoggedIn) { // если залогинины то переходим на главную
        return <Redirect to={'/'} />
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form
                onSubmit={formik.handleSubmit}> {/*оборачиваем всю разметку в form*/}
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            //чтобы formik смог собрать данные из формы
                            {...formik.getFieldProps('email')} //чтобы передать набор всех пропсов - содержаться value
                        />
                        {formik.errors.email ?
                            <div>{formik.errors.email}</div> : null} {/*отображение ошибки*/}

                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />

                        {formik.errors.password ?
                            <div>{formik.errors.password}</div> : null} {/*отображение ошибки*/}

                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps('rememberMe')}
                                checked={formik.values.rememberMe} // т.к. checked это boolean значение
                            />}
                        />
                        <Button type={'submit'} variant={'contained'}
                                color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
})
