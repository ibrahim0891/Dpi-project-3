/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
//Ready 

const BackButton = ({ buttonLink , titlebarText , additionalInfo }) => {
    return (
        <Link to={buttonLink} className="sticky top-0 md:top-14 bg-gray-100 text-gray-700 p-2 flex items-center justify-between z-10">
            <div className="flex items-center justify-start">
                 <button className="py-2 px-4 pr-2">
                    <FontAwesomeIcon icon={faChevronLeft} className="mr-2"/>
                </button>
                <div className="text-lg"> {titlebarText} </div>
            </div>
               
            <div className="pr-4">{additionalInfo}</div>
        </Link>
    )
}

export default BackButton