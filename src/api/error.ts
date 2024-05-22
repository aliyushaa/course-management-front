export const errorCatch = (error: any) => {
    const message = error?.response?.data?.msg

    return message
        ? typeof error.response.data.msg === 'object'
            ? message[0]
            : message
        : error.message
}