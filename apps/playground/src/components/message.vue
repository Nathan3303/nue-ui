<template>
    <nue-div wrap>
        <nue-button theme="small" @click="createMessage"> Basic </nue-button>
        <nue-button theme="small" @click="createMessageWithIcon">
            With icon
        </nue-button>
        <nue-button theme="small" @click="createMessageWithDuration">
            With 5 seconds duration
        </nue-button>
        <nue-button theme="small" @click="createCloseManualMessage">
            With close button (close manually)
        </nue-button>
    </nue-div>
    <nue-div wrap>
        <nue-button theme="small" @click="createSuccessMessage">
            Success type
        </nue-button>
        <nue-button theme="small" @click="createErrorMessage">
            Error type
        </nue-button>
        <nue-button theme="small" @click="createWarningMessage">
            Warning type
        </nue-button>
        <nue-button theme="small" @click="createInfoMessage">
            Info type
        </nue-button>
        <nue-button theme="small" @click="createLogMessage">
            Log type
        </nue-button>
    </nue-div>
    <nue-div wrap>
        <nue-button theme="small" @click="createSmallMessage">
            Small size
        </nue-button>
        <nue-button theme="small" @click="createNormalMessage">
            Normal size
        </nue-button>
        <nue-button theme="small" @click="createLargeMessage">
            Large size
        </nue-button>
    </nue-div>
</template>

<script setup lang="ts">
    import { NueMessage } from 'nue-ui';

    function createMessage() {
        NueMessage({ message: 'This is a message' });
    }

    function createMessageWithIcon() {
        NueMessage({
            message: 'This is a message with icon',
            icon: 'success'
        });
    }

    function createMessageWithDuration() {
        NueMessage({
            message: 'This is a message with 5 seconds duration',
            duration: 5000
        });
    }

    function createCloseManualMessage() {
        NueMessage({
            message: 'This is a message with close button (close manually)',
            duration: 0
        });
    }

    function createSuccessMessage() {
        NueMessage.success('This is a success message.');
    }

    function createErrorMessage() {
        NueMessage.error('This is an error message.');
    }

    function createWarningMessage() {
        NueMessage.warn('This is a warning message.');
    }

    function createInfoMessage() {
        NueMessage.info('This is an info message.');
    }

    function createLogMessage() {
        NueMessage.log('This is a log message.');
    }

    function createSmallMessage() {
        NueMessage({
            message: 'This is a small message.',
            size: 'small'
        });
    }

    function createNormalMessage() {
        NueMessage({
            message: 'This is a large message.'
        });
    }

    function createLargeMessage() {
        NueMessage({
            message: 'This is a large message.',
            size: 'large'
        });
    }
</script>
