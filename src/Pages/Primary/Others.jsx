import { Link } from "react-router-dom"

const Others = () => {
    return (
        <div>
            <h1> Others people page</h1>
            <Link to='/others/1'> People 1 </Link>
            <Link to='/others/2'> People 2 </Link>
            <Link to='/others/3'> People 3</Link>
        </div>
    )
}

export default Others