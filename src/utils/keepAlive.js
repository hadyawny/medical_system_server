import fetch from 'node-fetch';

export const keepAlive = (url, interval = 14 * 60 * 1000) => {
    const ping = () => {
        fetch(url)
            .then(res => res.text())
            .then(text => console.log(`Keep-alive ping successful: ${text}`))
            .catch(err => console.error(`Error in keep-alive ping: ${err}`));
    };
    setInterval(ping, interval);
};
