
//Logic

const links = {
    home: {
        root : '/',
        profile: '/profile' ,
        inbox : {
            chatLayout : '/chat-root/',
            inbox : '/chat-root/inbox',
            request: 'chat-root/requests',
            contacts : 'chat-root/contacts'
        },
        peoples : {
            peopleLayout : '/people-root',
            others : 'pople-root/others',
            incomingRequest : 'people-root/requests',
            outgoingRequest : 'people-root/sent-requests'
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
        modOthers: '/sec/others/',
        createPost : '/sec/create-post',
    }
}


export {links}