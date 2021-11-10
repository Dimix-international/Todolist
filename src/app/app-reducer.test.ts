
import {
    appReducer,
    InitialStateType,
    setAppErrorAC,
    setAppStatusAC
} from "./app-reducer";


let startState: InitialStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
})

test('status  should be change', () => {

    const endState = appReducer(startState, setAppStatusAC('loading'))
    expect(endState.status).toBe('loading');

})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setAppErrorAC('some error'))
    expect(endState.error).toBe('some error');

})
