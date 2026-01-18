import { useNavigate, useSearchParams } from "react-router-dom";

function ProductCard({data, addCart}){
    const user = JSON.parse(localStorage.getItem("user")) || {};

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const card_data = data;
    return (
        <>
            <div className="Card" onClick={() => navigate(`/product/${card_data.id}?search=${searchParams.get("search") || ""}`)}>
                <img src={card_data.thumbnail} alt="logo"></img>
                <p>{card_data.title}</p>
                <div>{card_data.price}</div>
                <div>{card_data.stock > 0 ? `Stock: ${card_data.stock}` : "Out of stock"}</div>
                {/* {card_data.stock > 0 ? (<button onClick={addCart} disabled={!user.isLogin}>Add to cart</button>) : null} */}
            </div>
        </>
    )
}

export default ProductCard;