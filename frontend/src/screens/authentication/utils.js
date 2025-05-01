export const validateEmptyFileds = (fields) => {

    console.log('fields--->', fields)
    const keys = Object.keys(fields);
    let hasError = null;
    for (let i = 0; i < keys.length; i++) {
        if (!fields[keys[i]]) {
            hasError = `${keys[i]} cannot be empty!`;
            break;
        }
    }
    if (hasError) {
        return hasError;
    }
    if (fields.password != fields.confirmPassword) {
        return 'Password are not Matching!'
    }

    return null;
}