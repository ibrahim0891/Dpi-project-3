
import { Link, useRouteError } from "react-router-dom"

//Ready 

const ErrorPage = () => {
    const error = useRouteError()
    return (
        <div className="error-page">
            <h1 className="error-title">Oops!</h1>

            <p className="error-message">
                Sorry, something went wrong!
            </p>

            <p className="error-details">
                {error.statusText || error.message}
            </p>
            <Link to='/'>Back to homepage</Link>
        </div>

    )
}

export default ErrorPage