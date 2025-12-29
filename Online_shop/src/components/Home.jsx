import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import "../styles/Home.css";

function Home() {
    const [profileInfo, useProfile] = useState(
        JSON.parse(localStorage.getItem("user")) || {}
    );

    const add_to_cart = (name) => {
        const new_cart = profileInfo.cart;
        new_cart.push(name);
        useProfile({ ...profileInfo, cart: new_cart });
        alert(`${name} has been added to the cart`);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(profileInfo));
    }, [profileInfo]);

    const products = [
        {
            title: "Wireless Mouse",
            price: 19.99,
            img: "/assets/images/wireless-mouse.png",
            isStocked: true,
        },
        {
            title: "Mechanical Keyboard",
            price: 89.99,
            img: "/assets/images/mechanical-keyboard.png",
            isStocked: false,
        },
        {
            title: "USB-C Hub",
            price: 29.5,
            img: "/assets/images/usb-c-hub.png",
            isStocked: true,
        },
        {
            title: "27-inch Monitor",
            price: 249.99,
            img: "/assets/images/monitor-27.png",
            isStocked: true,
        },
        {
            title: "Noise Cancelling Headphones",
            price: 159.0,
            img: "/assets/images/headphones.png",
            isStocked: false,
        },
    ];

    return (
        <>
            <h1>This is home</h1>
            <div id="Shop-main">
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        data={product}
                        addCart={() => add_to_cart(product.title)}
                    ></ProductCard>
                ))}
            </div>
        </>
    );
}

export default Home;
