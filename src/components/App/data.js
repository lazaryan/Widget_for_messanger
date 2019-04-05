const state = {
    actionChat: false,
    actionForm: false,
    actionBlockLink: false,
    error: false,
    reply: false,
    form: {
        name: '',
        email: '',
        phone: '',
        message: ''
    },
    blockLink: {
        url: '',
        qrCode: ''
    },
    chat: [],
    userPhoto: './rChatPHP/women.png',
    message: '',
    pathToAction: './rChatPHP/',
    nameCookies: `rChat-${location.host}`,
    messangerAction: ''
};

export default state;
