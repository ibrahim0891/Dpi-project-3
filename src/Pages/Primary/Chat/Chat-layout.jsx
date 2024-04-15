import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { links } from '../../../assets/Vars';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom' 


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
        { label: 'Contacts', path: links.home.inbox.contacts }
    ];

    return (
        <div>
            <nav className='flex bg-gray-100 p-2 justify-between gap-2 text-center'>
                {tabs.map((tab, index) => (
                    <Link
                        key={index}
                        onClick={() => toggleActiveState(index)}
                        to={tab.path}
                        className={`w-1/2 text-sm bg-white p-2 rounded-lg relative ${activeTab === index ? 'activeTab' : ''}`}
                    >
                        {tab.label}  
                    </Link>
                ))}
            </nav>
            <Outlet></Outlet>
        </div>
    )
}

export default ChatLayout