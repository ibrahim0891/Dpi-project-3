import { useEffect, useState } from "react";
import { links } from "../../../assets/Vars";
import { onValue, ref } from "firebase/database";
import { auth, database } from "../../../../firebase";
import { Link , useNavigate , Outlet} from "react-router-dom";
import Badge from "../../../Common/Badge";

const PeopleLayout = () => {
    const redirectToDefault = useNavigate();
    let [badgeNumber ,setBadgeNumber] = useState(null)
    useEffect(() => {
        redirectToDefault(links.home.peoples.others)
        onValue(ref(database, `/requests/${auth.currentUser.uid}`), (snapshot) => {
            let data = snapshot.val()
                let temp = []
                for (let i in data) {
                    temp.push(data[i])
                }
                setBadgeNumber(temp.length)
        })
        
    },[])
    
    const [activeTab, setActiveTab] = useState(0);
    const toggleActiveState = (index) => {
        setActiveTab(index === activeTab ? null : index);
    }

    const tabs = [
        { label: 'Peoples', path: links.home.peoples.peopleLayout },
        { label: 'Received ', path: links.home.peoples.incomingRequest},
        { label: 'sent', path: links.home.peoples.outgoingRequest }
    ];
    
    return (
        <div className="md:flex w-full md:h-full ">
            <nav className='flex md:flex-col md:w-1/4 bg-gray-100 p-2 justify-between gap-2 text-center'>
                {tabs.map((tab, index) => (
                    <Link
                        key={index}
                        onClick={() => toggleActiveState(index)}
                        to={tab.path}
                        className={`w-1/3 md:w-full text-sm bg-white p-2 rounded-lg relative ${activeTab === index ? 'activeTab' : ''}`}
                    >
                        {tab.label} {tab.label == 'Received ' && badgeNumber ? <Badge badgeText={badgeNumber}/> : null } 
                    </Link>
                ))}
            </nav>
            <div className="md:w-3/4 px-4">

            <Outlet></Outlet>
            </div>
        </div>
    )
}

export default PeopleLayout