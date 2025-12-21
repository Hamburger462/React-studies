function ProductCard({data, addCart}){
    const card_data = data;
    return (
        <>
            <div className="Card">
                <img src={card_data.img} alt="logo"></img>
                <p>{card_data.title}</p>
                <div>{card_data.price}</div>
                <div>{card_data.isStocked ? "In stock" : "Out of stock"}</div>
                {card_data.isStocked ? (<button onClick={addCart}>Add to cart</button>) : null}
            </div>
        </>
    )
}

export default ProductCard;