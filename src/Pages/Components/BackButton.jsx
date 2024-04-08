/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
//Ready 

const BackButton = ({ buttonLink, buttonText }) => {
    return (
        <Link to={buttonLink} className="block bg-gray-100 text-gray-700 p-2">
            <button className="py-2 px-4">
                <FontAwesomeIcon icon={faChevronLeft} className="mr-2"/>
            </button>
        </Link>
    )
}

export default BackButton