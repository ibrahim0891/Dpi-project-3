

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

//Authenticaion page
import Auth from "./Pages/Authentication/Auth"
import Login from "./Pages/Authentication/Login"
import SignUp from "./Pages/Authentication/Signup"


//Home page 
import Inbox from "./Pages/Primary/Inbox"
import Others from "./Pages/Primary/Others"
import Profile from "./Pages/Primary/Profile"
import RootLayout from "./Pages/Primary/Root-layout"

//chatview 
import ChatView from "./Pages/Secondary/ChatView"
//Other people profile page 
import OthersProfile from "./Pages/Secondary/OthersProfile"
import ErrorPage from "./Pages/ErrorPage"
import SecondaryLayout from "./Pages/Secondary/SecondaryLayout"


import { links } from "./assets/Vars"
function App() { 
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path={links.auth.root} element={<Auth />}>
                    <Route path={links.auth.login} element={<Login />}> </Route>
                    <Route path={links.auth.signup} element={<SignUp />}> </Route>
                </Route >
                <Route path={links.home.root} element={<RootLayout />} errorElement={<ErrorPage />}>
                    <Route path={links.home.root} element={<Profile />}> </Route>
                    <Route path={links.home.inbox} element={<Inbox />}> </Route>
                    <Route path={links.home.others} element={<Others />}></Route>
                    <Route path="*" element={<ErrorPage />}> </Route>
                </Route>
                <Route path={links.sec.root} element={<SecondaryLayout/>}>
                    <Route path={links.sec.inbox} element={<ChatView />}> </Route>
                    <Route path={links.sec.others} element={<OthersProfile />}> </Route>
                </Route>
            </Route >
        )
    )
    return (
        <RouterProvider router={router} />
    )
}

export default App
