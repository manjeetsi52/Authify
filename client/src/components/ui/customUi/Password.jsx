import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Password = ({classname,name,placeholder,value,onChange,iconClass})=>{
     const [showPassword, setShowPassword] = useState(false);
    return(
        <>
        <div className={classname}>
                <input type={showPassword ? "text" : "password"} name={name} id={name} placeholder={placeholder} value={value} onChange={onChange} required/>
                <span className={iconClass} onClick={() => setShowPassword((prev) => (prev = !prev))}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
        </>
    )
}