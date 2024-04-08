/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

//Ready 

const BackButton = ({ buttonLink, buttonText }) => {
    return (
        <Link to={buttonLink} className="block bg-gray-100 text-gray-700 p-2">
            <button className="py-2 px-4 bg-gray-200">
                {buttonText}
            </button>
        </Link>
    )
}

export default BackButton