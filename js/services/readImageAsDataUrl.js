const readImageAsDataUrl = loadImage => (file) => {
    if (!file) {
        return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
        loadImage(
            file,
            (canvas) => {
                if (canvas.type === 'error') {
                    reject(canvas.error);
                }
                try {
                    resolve(canvas.toDataURL(file.type));
                } catch (error) {
                    reject(error);
                }
            },
            { maxWidth: 200, maxHeight: 40, orientation: true, canvas: true } // Options
        );
    });
};

readImageAsDataUrl.$inject = ['blueimp-load-image'];

export default readImageAsDataUrl;
