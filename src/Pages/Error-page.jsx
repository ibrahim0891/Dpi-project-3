
import { Link, useRouteError } from "react-router-dom"

//Ready 

const ErrorPage = () => {
    const error = useRouteError()
    return (
        <div className="p-8 flex flex-col items-center aspect-[9/16] justify-center">
            <h1 className="text-red-800 text-4xl font-bold ">Oops!</h1>

            <p className="mt-2 text-xl ">
                Sorry, we encounterd an error!
            </p>

            <p className="p-6 bg-red-100 text-red-900 font-mono my-4 text-center w-full">
                {error.statusText || error.message}
            </p>
            <Link to='/' className="text-sm text-blue-500 hover:bg-blue-100 p-2">Back to homepage</Link>
        </div>

    )
}

export default ErrorPage