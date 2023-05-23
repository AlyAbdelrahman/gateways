export const validateIpAddress = (currentIp) => {
    const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    return regexExp.test(currentIp);
}
export const validateEmptyString = (text, cb) => {
    return cb(text === '');
}