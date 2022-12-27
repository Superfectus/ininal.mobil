const commonHelper = () => {
    const numberWithCommas = (number) => {
        if (!number)
            return "";

        const parts = number.toString().split(".");

        if (parts.length === 1)
            return number;

        const lastPart = parts[parts.length - 1];
        parts.splice(parts.length - 1, 1)
        for (let i = 0; i < parts.length; i++)
            parts[i] = parts[i].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return parts.join(".") + "," + lastPart;
    }

    const getErrorMessage = (response) => {
        console.debug("getErrorMessage", response);
        if (response.data && response.data.errors) {
            return response.data && response.data.error && response.data.errors.length > 0
                ? response.data.errors.map((x) => x.message).join(' ')
                : 'İşlem sırasında hata oluştu! Lütfen daha sonra tekrar deneyiniz.';
        }

        if (response.data && response.data.error) {
            return response.data && response.data.error && response.data.error.message
                ? response.data.error.message
                : 'İşlem sırasında hata oluştu! Lütfen daha sonra tekrar deneyiniz.';
        }
    }
    const catchError = (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.debug(error.response.data);
            console.debug(error.response.status);
            console.debug(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.debug(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.debug('Error', error.message);
        }
        console.debug(error.config);
    }

    return {
        numberWithCommas,
        getErrorMessage,
        catchError
    };
}

export default commonHelper();
