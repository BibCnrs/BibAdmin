const replaceHttpsPoint = (url) =>
    url.indexOf('https') === 0 ? url.replace(/\./g, '-') : url;

const normalizeHttpsUrl = (url) => {
    if (!url) {
        return '';
    }
    const [main, ...rest] = url.split('?');
    const parameter = rest.join('?');
    if (!parameter) {
        return replaceHttpsPoint(url);
    }

    return `${replaceHttpsPoint(main)}?${parameter}`;
};

const proxifyUrl = () => (gate, url) =>
    `http://${gate}.bib.cnrs.fr/login?url=${normalizeHttpsUrl(url)}`;

proxifyUrl.$inject = [];

export default proxifyUrl;
