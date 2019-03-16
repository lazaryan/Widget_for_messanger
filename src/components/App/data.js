const state = {
    actionChat: false,
    actionForm: false,
    actionBlockLink: false,
    error: false,
    reply: true,
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
    userPhoto: '',
    message: '',
    pathToAction: './rChatPHP/',
    nameCookies: `rChat-${location.host}`,
    messangerAction: ''
};

export default state;
