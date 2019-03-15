const state = {
    actionChat: true,
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
        url: ''
    },
    chat: [],
    userPhoto: '',
    message: '',
    pathToAction: '',
    nameCookies: `rChat-${location.host}`,
    messangerAction: ''
};

export default state;
