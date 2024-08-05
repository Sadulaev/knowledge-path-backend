type ValidationResultType = {
    type: string,
    path?: string,
    msg: string,
}

export default (validationResult: ValidationResultType[]) => {
    if (validationResult.length) {
        const result: { [key: string]: string | string[] } = {};

        validationResult.forEach(error => {
            if (error.path) {
                result[error.path] = error.msg;
            } else {
                result['no_field_errors'] = result['no_field_errors'] ? [...result['no_field_errors'], error.msg] : [error.msg]
            }
        })

        return result;
    }

    return false;
}