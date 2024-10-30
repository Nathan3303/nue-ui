export default function () {
    if (PROD) {
        console.info('You are using NueUI in production mode.');
    } else if (DEV) {
        console.info('You are using NueUI in development mode.');
    }
}
