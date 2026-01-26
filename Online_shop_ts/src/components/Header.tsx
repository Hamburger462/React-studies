type HeaderProps = {
    totalProducts: number
    totalCartItems: number
}

export function Header({totalProducts, totalCartItems}:HeaderProps){
    return (
        <header>
            <h1>Shop tsx</h1>
            <div>
                Products: {totalProducts}
            </div>
            <span>In cart: {totalCartItems}</span>
        </header>
    )
}