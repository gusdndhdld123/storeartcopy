import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    return(
        <div className="flex bg-blue-500">
            <h1 className="text-white text-[48px] py-2 pl-[200px] hover:cursor-pointer" onClick={()=>{navigate("/")}}>StoreArt-Copy</h1>
        </div>
    )
}
export default Navbar