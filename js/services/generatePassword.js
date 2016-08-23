const generatePassword = (crypto) => {
    return crypto.randomBytes(20).toString('base64');
}

generatePassword.$inject = ['crypto'];

export default generatePassword;
