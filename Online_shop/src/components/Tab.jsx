import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import "../styles/Tab.css";

function Tab(props) {
    const current_tab = props.tab;

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

    const guest = {
        avatar: null,
        full_name: "John Doe",
        username: "Guest",
        address: "Somewhere street",
        cart: [],
    };

    const add_to_cart = (name) => {
        const new_cart = profileInfo.cart;
        new_cart.push(name);
        useProfile({...profileInfo, cart: new_cart});
        alert(`${name} has been added to the cart`);
    }

    const [profileInfo, useProfile] = useState(JSON.parse(localStorage.getItem("profile")) || guest);

    useEffect(() => {
        localStorage.setItem("profile", JSON.stringify(profileInfo));
    }, [profileInfo]);

    useEffect(() => {
        document.title = profileInfo.username
    }, [profileInfo.username]);

    const shop_temp = (
        <section>
            <h1>Shop</h1>
            <div id="Shop-main">
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        data={product}
                        addCart={() => add_to_cart(product.title)}
                    ></ProductCard>
                ))}
            </div>
        </section>
    );

    const profile_temp = (
        <section>
            <h1>Profile</h1>
            <img src={profileInfo.avatar} alt="logo"></img>
            <div>{profileInfo.full_name}</div>
            <div>{profileInfo.username}</div>
            <div>{profileInfo.address}</div>
            <section>
                <h2>Cart:</h2>
                {profileInfo.cart.length == 0 ? (
                    <div>
                        Your cart is empty. Add some items to see them here
                    </div>
                ) : (
                    <ul>
                        {profileInfo.cart.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}
            </section>
        </section>
    );

    switch (current_tab) {
        case "shop":
            return shop_temp;
        case "profile":
            return profile_temp;
    }
}

export default Tab;
