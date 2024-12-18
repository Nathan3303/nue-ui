<template>
    <demo title="Message 消息提示">
        <nue-div vertical>
            <nue-div>
                <nue-button @click="createMessage">基础消息提示</nue-button>
                <nue-button @click="createMessageWithIcon">
                    带图标的消息提示
                </nue-button>
                <nue-button @click="createMessageWithDuration">
                    消息提示：5 秒的自动关闭时间
                </nue-button>
                <nue-button @click="createCloseManualMessage">
                    消息提示：手动关闭
                </nue-button>
            </nue-div>
            <nue-div>
                <nue-button @click="createSuccessMessage">
                    消息提示：成功类型
                </nue-button>
                <nue-button @click="createErrorMessage">
                    消息提示：失败类型
                </nue-button>
                <nue-button @click="createWarningMessage">
                    消息提示：警告类型
                </nue-button>
                <nue-button @click="createInfoMessage">
                    消息提示：基础类型
                </nue-button>
                <nue-button @click="createLogMessage">
                    消息提示：日志类型
                </nue-button>
            </nue-div>
            <nue-div>
                <nue-button @click="createSmallMessage">
                    小型消息提示
                </nue-button>
                <nue-button @click="createLargeMessage">
                    大型消息提示
                </nue-button>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import NueMessage from '@nue-ui/components/message/message';
import Demo from '../layouts/demo.vue';

function createMessage() {
    NueMessage({ message: '基础消息提示' });
}

function createMessageWithIcon() {
    NueMessage({
        message: '带图标的消息提示',
        icon: 'success'
    });
}

function createMessageWithDuration() {
    NueMessage({
        message: '消息提示：5 秒的自动关闭时间',
        duration: 5000
    });
}

function createCloseManualMessage() {
    NueMessage({
        message: '消息提示：手动关闭',
        duration: 0
    });
}

function createSuccessMessage() {
    NueMessage.success('消息提示：成功类型');
}

function createErrorMessage() {
    NueMessage.error('消息提示：错误类型');
}

function createWarningMessage() {
    NueMessage.warn('消息提示：警告类型');
}

function createInfoMessage() {
    NueMessage.info('消息提示：基础类型');
}

function createLogMessage() {
    NueMessage.log('消息提示：日志类型');
}

function createSmallMessage() {
    NueMessage({
        message: '小型消息提示',
        size: 'small'
    });
}

function createLargeMessage() {
    NueMessage({
        message: '大型消息提示',
        size: 'large'
    });
}
</script>
