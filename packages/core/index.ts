import { makeInstaller } from '@nue-ui/utils';
import components from './components';
import '@nue-ui/assets';

const installer = makeInstaller(components);

if (PROD) {
    console.info(
        `%c NueUI is running in production mode.`,
        `
                background: linear-gradient(
                    to right,
                    #ff2400, #ff5733, #ff8300, #ffaa00,
                    #ffd14d, #00e436, #00c9ff, #4d80ff,
                    #8333ff, #aa00ff, #ff00cc
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 12px;
                line-height: 1;
                font-family: monospace;
                font-weight: bold;
            `
    );
} else if (DEV) {
    console.info(
        `%c NueUI is running in development mode.`,
        `font-size: 12px; font-weight: bold;`
    );
}

export * from '@nue-ui/components';
export * from '@nue-ui/utils';
export default installer;
