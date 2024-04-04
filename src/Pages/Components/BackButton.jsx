/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const BackButton = ({ buttonLink, buttonText }) => {
    return (
        <Link to={buttonLink} className="block bg-gray-800 text-white p-2">
            <button className="py-2 px-4 bg-gray-700">
                {buttonText}
            </button>
        </Link>
    )
}

export default BackButton