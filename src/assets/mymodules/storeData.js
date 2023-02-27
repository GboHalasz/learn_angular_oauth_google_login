const storeData = () => {

    const storeInSessionStorage = (key, jSonData) => {        
        sessionStorage.setItem(key, jSonData);
    }

    const removeFromStorage = (key) => {
        sessionStorage.removeItem(key);        
    }

    return {storeInSessionStr: storeInSessionStorage, removeFromStorage}
}
