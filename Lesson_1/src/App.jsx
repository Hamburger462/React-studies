import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
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
        {products.map((product) => 
          (<ProductCard data={product}>

          </ProductCard>)
        )}
      </>
    );
}

export default App;
