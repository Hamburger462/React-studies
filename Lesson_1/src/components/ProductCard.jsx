function ProductCard(props){
    const card_data = props.data;
    return (
        <>
            <div className="Card">
                <img src={card_data.img} alt="logo"></img>
                <p>{card_data.title}</p>
                <div>{card_data.price}</div>
                <div>{card_data.isStocked}</div>
            </div>
        </>
    )
}

export default ProductCard;