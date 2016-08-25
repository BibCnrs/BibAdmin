const generatePassword = (crypto) => (length) => {
    return crypto.randomBytes(length).toString('base64').slice(0, length).toUpperCase();
};

generatePassword.$inject = ['crypto'];

export default generatePassword;
