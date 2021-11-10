


export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cityName');
        if (serializedState === null) {
            return 'Москва';
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (city:string) => {
    try {
        const serializedState = JSON.stringify(city);
        localStorage.setItem('cityName', serializedState);
    } catch {
        // ignore write errors
    }
};