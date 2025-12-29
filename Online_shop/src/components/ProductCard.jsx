function ProductCard({data, addCart}){
    const user = JSON.parse(localStorage.getItem("user")) || {};

    const card_data = data;
    return (
        <>
            <div className="Card">
                <img src={card_data.img} alt="logo"></img>
                <p>{card_data.title}</p>
                <div>{card_data.price}</div>
                <div>{card_data.isStocked ? "In stock" : "Out of stock"}</div>
                {card_data.isStocked ? (<button onClick={addCart} disabled={!user.isLogin}>Add to cart</button>) : null}
            </div>
        </>
    )
}

export default ProductCard;