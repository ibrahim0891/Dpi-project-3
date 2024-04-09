
//Logic

const links = {
    home: {
        root : '/',
        inbox : {
            chatLayout : '/chat-root/',
            inbox : '/chat-root/inbox',
            request: 'chat-root/requests',
            contacts : 'chat-root/contacts'
        },
        others : '/others'
    },
    auth: {
        root: "/auth",
        login : '/auth/login',
        signup : '/auth/signup'
    },
    sec : {
        root: '/sec',
        inbox : '/sec/inbox/:chatID',
        editProfile: '/sec/profile/edit',
        others : '/sec/others/:uid',
        //mod links are used to provide parameters to routes
        //mod means modifiable
        modInbox: '/sec/inbox/', 
        modOthers: '/sec/others/'
    }
}


export {links}