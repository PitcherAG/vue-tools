export let source = 'modal';
export let fireEventCount = 0;

export function fireEvent(name, params) {
    return new Promise((resolve, reject) => {
        let eventID = fireEventCount++;

        const callback = `fireEventCB${eventID}`;
        const errorCallback = `fireEventErrorCB${eventID}`;

        if (!params) {
            params = {};
        }

        params.callBackFunc = callback;
        params.callBack = callback;
        params.errorFunc = errorCallback;
        params.source = this.source;

        function cleanupEvent() {
            delete window[callback];
            delete window[errorCallback];
        }

        window[callback] = (res) => {
            if (res.startsWith('{') || res.startsWith('[')) {
                try {
                    resolve(JSON.parse(res));
                } catch (e) {
                    reject('Invalid JSON')
                }
            } else {
                resolve(res);
            }

            cleanupEvent();
        };

        window[errorCallback] = (error) => {
            reject(error);
            cleanupEvent();
        };

        if (window.hasOwnProperty('Ti')) {
            window.Ti.App.fireEvent(name, params);
        } else {
            reject('Ti not found');
        }
    });
}