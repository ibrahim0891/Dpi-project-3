/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
//Ready 

const BackButton = ({ buttonLink , titlebarText}) => {
    return (
        <Link to={buttonLink} className=" bg-gray-100 text-gray-700 p-2 flex items-center">
            <button className="py-2 px-4 pr-2">
                <FontAwesomeIcon icon={faChevronLeft} className="mr-2"/>
            </button>
            <div className="text-lg"> {titlebarText} </div>
        </Link>
    )
}

export default BackButton