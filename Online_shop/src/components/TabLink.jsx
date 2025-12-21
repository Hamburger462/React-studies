function TabLink({name, changeTab}){
    return (
    <>
        <div className="Tab" onClick={changeTab}>
            {name}
        </div>
    </>
    )
}

export default TabLink;