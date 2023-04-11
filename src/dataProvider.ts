import { DataProvider, fetchUtils, Options } from 'react-admin';
import { stringify } from 'query-string';
import jsonServerProvider from 'ra-data-json-server';
import loadImage from 'blueimp-load-image';

const apiUrl = import.meta.env.VITE_BIBAPI_HOST + '/admin';

const httpClient = (url: string, options: Options = {}) => {
    const requestHeaders = (options.headers ||
        new Headers({
            Accept: 'application/json',
        })) as Headers;
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }

    requestHeaders.set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`,
    );
    return fetchUtils.fetchJson(url, { ...options, headers: requestHeaders });
};

/**
 * Convert a `Image` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertImageToBase64 = (file: File) => {
    if (!file) {
        return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
        loadImage(
            file,
            (image) => {
                const canvas = image as HTMLCanvasElement;
                try {
                    resolve(canvas.toDataURL(file.type));
                } catch (error) {
                    reject(error);
                }
            },
            { maxWidth: 200, maxHeight: 40, orientation: true, canvas: true }, // Options
        );
    });
};

const jsonServerDataProvider = jsonServerProvider(apiUrl, httpClient);

const uploadFile = async (name: string, file: File) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);

    return await fetch(`${apiUrl}/medias`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }).then((response) => response.json());
};

const dataProvider: DataProvider = {
    ...jsonServerDataProvider,
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const filters = fetchUtils.flattenObject(params.filter);

        const query: any = {
            _page: page || 1,
            _perPage: perPage || 10,
        };

        query._sortField = field;
        query._sortDir = order.toLocaleLowerCase() || 'asc';

        if (Object.keys(filters).length > 0) {
            query._filters = JSON.stringify(filters);
        }

        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(
                headers?.get('content-range')?.split('/')?.pop() ?? '0',
                10,
            ),
        }));
    },
    update: async (resource, params) => {
        if (
            resource === 'licenses' &&
            params.data?.pdf?.src &&
            !params.data?.pdf?.src.includes('data:application/pdf')
        ) {
            const file = await uploadFile(
                params.data.pdf.title,
                params.data.pdf.rawFile,
            );
            return jsonServerDataProvider.update(resource, {
                ...params,
                data: {
                    ...params.data,
                    pdf: { src: file.url, title: file.name },
                },
            });
        }

        if (
            !params.data.image ||
            (typeof params.data.image === 'string' &&
                params.data.image.includes('base64'))
        ) {
            // fallback to the default implementation
            return jsonServerDataProvider.update(resource, params);
        }

        const base64Image = await convertImageToBase64(
            params.data.image.rawFile,
        );
        return jsonServerDataProvider.update(resource, {
            ...params,
            data: {
                ...params.data,
                image: base64Image,
            },
        });
    },
    create: async (resource, params) => {
        if (resource === 'licenses' && params.data?.pdf?.src) {
            const file = await uploadFile(
                params.data.pdf.title,
                params.data.pdf.rawFile,
            );
            return jsonServerDataProvider.create(resource, {
                ...params,
                data: {
                    ...params.data,
                    pdf: { src: file.url, title: file.name },
                },
            });
        }

        if (resource === 'medias') {
            const file = await uploadFile(
                params.data.name,
                params.data.file.rawFile,
            );
            return { data: { ...file } };
        }

        if (
            !params.data.image ||
            (typeof params.data.image === 'string' &&
                params.data.image.includes('base64'))
        ) {
            // fallback to the default implementation
            return jsonServerDataProvider.create(resource, params);
        }
        const base64Image = await convertImageToBase64(
            params.data.image.rawFile,
        );
        return jsonServerDataProvider.create(resource, {
            ...params,
            data: {
                ...params.data,
                image: base64Image,
            },
        });
    },
    setCommonLicense: (licenseId: number) => {
        return fetch(`${apiUrl}/licenses/${licenseId}/common`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    },
};

export default dataProvider;
