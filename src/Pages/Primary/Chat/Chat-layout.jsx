import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { links } from '../../../assets/Vars';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Badge from '../../../Common/Badge';
import { onValue, ref } from 'firebase/database';
import { auth, database } from '../../../../firebase';
const ChatLayout = () => {
    const redirectToDefault = useNavigate();
    useEffect(() => {
        redirectToDefault(links.home.inbox.inbox)
    }, [])

    const [activeTab, setActiveTab] = useState(0);
    const toggleActiveState = (index) => {
        setActiveTab(index === activeTab ? null : index);
    }

    const tabs = [
        { label: 'Inbox', path: links.home.inbox.inbox },
        { label: 'Requests', path: links.home.inbox.request },
        { label: 'Contacts', path: links.home.inbox.contacts }
    ];

    let [badgeNumber ,setBadgeNumber] = useState(null)
    useEffect(() => {
        onValue(ref(database, `/requests/${auth.currentUser.uid}`), (snapshot) => {
            let data = snapshot.val()
            let temp = []
            for (let i in data) {
                temp.push(data[i])
            }
            setBadgeNumber(temp.length)
        })
    },[])
    return (
        <div>
            <nav className='flex bg-gray-100 p-2 justify-between gap-2 text-center'>
                {tabs.map((tab, index) => (
                    <Link
                        key={index}
                        onClick={() => toggleActiveState(index)}
                        to={tab.path}
                        className={`w-1/3 text-sm bg-white p-2 rounded-lg relative ${activeTab === index ? 'activeTab' : ''}`}
                    >
                        {tab.label} {tab.label == "Requests" && badgeNumber? <Badge badgeText={badgeNumber}></Badge> : null}
                    </Link>
                ))}
            </nav>
            <Outlet></Outlet>
        </div>
    )
}

export default ChatLayout