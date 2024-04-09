

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

//Authenticaion page
import Auth from "./Pages/Authentication/Auth"
import Login from "./Pages/Authentication/Login"
import SignUp from "./Pages/Authentication/Signup"


//Home page 
import ChatLayout from "./Pages/Primary/Chat/Chat-layout"

import Others from "./Pages/Primary/Others"
import Profile from "./Pages/Primary/Profile"
import RootLayout from "./Pages/Primary/Root-layout"

//chatview 
import ChatView from "./Pages/Secondary/thread"
//Other people profile page 
import OthersProfile from "./Pages/Secondary/Others-profile"
import ErrorPage from "./Pages/Error-page"
import SecondaryLayout from "./Pages/Secondary/Secondary-layout"


import { links } from "./assets/Vars"
import MessageRequest from "./Pages/Primary/Chat/Message-request"
import Contacts from "./Pages/Primary/Chat/Contacts"
import Inbox from "./Pages/Primary/Chat/Inbox"
import EditPofile from "./Pages/Secondary/Edit-profile"
function App() { 
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route path={links.auth.root} element={<Auth />}>
                    <Route path={links.auth.login} element={<Login />}> </Route>
                    <Route path={links.auth.signup} element={<SignUp />}> </Route>
                </Route >
                <Route path={links.home.root} element={<RootLayout />} errorElement={<ErrorPage />}>
                    <Route path={links.home.root} element={<Profile />}> </Route>
                    <Route path={links.home.inbox.chatLayout} element={<ChatLayout />}> 
                        <Route path={links.home.inbox.request} element={<MessageRequest/>}></Route>
                        <Route path={links.home.inbox.contacts} element={<Contacts/>}></Route>
                        <Route path={links.home.inbox.inbox} element={<Inbox/>}></Route>
                    </Route>
                    <Route path={links.home.others} element={<Others />}></Route>
                    <Route path="*" element={<ErrorPage />}> </Route>
                </Route>
                <Route path={links.sec.root} element={<SecondaryLayout/>} errorElement={<ErrorPage/>}>
                    <Route path={links.sec.inbox} element={<ChatView />}> </Route>
                    <Route path={links.sec.others} element={<OthersProfile />}> </Route>
                    <Route path={links.sec.editProfile} element={<EditPofile/>}> </Route>
                </Route>
            </Route >
        )
    )
    return (
        <RouterProvider router={router} />
    )
}

export default App
