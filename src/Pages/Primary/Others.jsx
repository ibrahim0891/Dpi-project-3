import { Link } from "react-router-dom"
import { links } from "../../assets/Vars"

//Under development

const Others = () => {
    return (
        <div>
            <h1> Others people page</h1>
            links will be replaced <br />
            <Link to={links.sec.modOthers+1}> People 1 </Link>
            <Link to={links.sec.modOthers+2}> People 2 </Link>
            <Link to={links.sec.modOthers+3}> People 3</Link>
        </div>
    )
}

export default Others