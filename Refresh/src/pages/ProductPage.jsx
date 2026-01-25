import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Product.css";

function ProductPage() {
    const params = useParams();

    const [product, useProduct] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        async function getProduct(id) {
            const response = await fetch(
                `https://dummyjson.com/products/${id}`
            );

            if (!response.ok) {
                alert("Couldn't find the product data");
                return;
            }

            const json = await response.json();

            useProduct(json);
        }

        getProduct(params.id);
    }, []);

    const navigate = useNavigate();

    if (!product) return;

    return (
        <>
            <button onClick={() => navigate(`/?search=${searchParams.get("search")}`)}>Go back</button>
            <div id="Product-main">
                <div>
                    <img id="Product-img" src={product.images[0]}></img>
                </div>
                <div>
                    <h1>{product.title}</h1>
                    <div>{product.description}</div>
                    <div>{product.price}</div>
                </div>
            </div>
        </>
    );
}

export default ProductPage;
