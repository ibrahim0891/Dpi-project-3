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
        <div className='md:flex'>
            <nav className='flex md:flex-col md:w-1/4 bg-gray-100 p-2 justify-between gap-2 text-center'>
                {tabs.map((tab, index) => (
                    <Link
                        key={index}
                        onClick={() => toggleActiveState(index)}
                        to={tab.path}
                        className={`w-1/2 md:w-full p-2 relative border rounded-md shadow-inner ${activeTab === index ? ' bg-gray-700 text-white ' : 'bg-white'}`}
                    >
                        {tab.label}
                    </Link>
                ))}
            </nav>
            <div className='w-full md:w-3/4 p-4'>

                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default ChatLayout