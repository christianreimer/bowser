const encodeState = (state) => {
    return btoa(JSON.stringify(state));
}

const decodeState = (state) => {
    return JSON.parse(btoa(state));
}

