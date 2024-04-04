
//Logic

const links = {
    home: {
        root : '/',
        inbox : '/inbox',
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
        others : '/sec/inbox/:uid',
        //mod links are used to provide parameters to routes
        //mod means modifiable
        modInbox: '/sec/inbox/', 
        modOhers: '/sec/others/'
    }
}


export {links}