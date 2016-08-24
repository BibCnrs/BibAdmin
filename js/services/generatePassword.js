const generatePassword = (crypto) => () => {
    return crypto.randomBytes(10).toString('base64').slice(0,10).toUpperCase();
};

generatePassword.$inject = ['crypto'];

export default generatePassword;
