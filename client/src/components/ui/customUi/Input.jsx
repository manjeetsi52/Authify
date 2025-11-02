
export const Input = ({classname,type,name,placeholder,value,onChange})=>{
    return (
        <>
            <div className={classname}>
                <input type={type} name={name} id={name} placeholder={placeholder} value={value} onChange={onChange} required/>
            </div>
        </>
    )
}