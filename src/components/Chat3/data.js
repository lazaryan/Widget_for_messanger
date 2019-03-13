const state = {
    actionChat: false,
    actionForm: false,
    error: false,
    reply: false,
    form: {
        name: '',
        email: '',
        phone: '',
        message: ''
    },
    chat: [],
    userPhoto: '',
    message: '',
    pathToAction: '',
    nameCookies: `rChat-${location.host}`
};

export default state;
