import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/Home.css";

function Home() {
    const [products, useProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            const response = await fetch("https://dummyjson.com/products");

            if (!response.ok) {
                alert("Server error");
                return;
            }

            const json = await response.json();

            useProducts(json.products);
        }

        getProducts();
    }, []);

    useEffect(() => {
        if (searchParams.get("search")) {
            useSearchName(searchParams.get("search"));

            SearchProduct(searchParams.get("search"));
        }
    }, []);
    // const [profileInfo, useProfile] = useState(
    //     JSON.parse(localStorage.getItem("user")) || {}
    // );

    // const add_to_cart = (name) => {
    //     const new_cart = profileInfo.cart;
    //     new_cart.push(name);
    //     useProfile({ ...profileInfo, cart: new_cart });
    //     alert(`${name} has been added to the cart`);
    // };

    // useEffect(() => {
    //     localStorage.setItem("user", JSON.stringify(profileInfo));
    // }, [profileInfo]);

    const [searchName, useSearchName] = useState(null);

    const navigate = useNavigate();

    async function SearchProduct(name) {
        const response = await fetch(
            `https://dummyjson.com/products/search?q=${name}`
        );

        if (!response.ok) {
            alert("Server error");
            return;
        }

        const json = await response.json();

        useProducts(json.products);

        navigate(`/products?search=${name}`);
    }

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            <h1>This is home</h1>
            <div id="Shop-searchbar">
                <h2>Search products</h2>
                <form>
                    <label>
                        <input
                            type="text"
                            name="product"
                            onInput={(event) =>
                                useSearchName(event.target.value)
                            }
                            value={searchName}
                        ></input>
                    </label>
                </form>
                <button onClick={() => SearchProduct(searchName)}>
                    Search
                </button>
            </div>
            <div id="Shop-main">
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        data={product}
                        // addCart={() => add_to_cart(product.title)}
                    ></ProductCard>
                ))}
            </div>
        </>
    );
}

export default Home;
