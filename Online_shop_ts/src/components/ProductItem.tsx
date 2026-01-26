import type {Product} from "../type/product"

type ProductItemProps = {
    product: Product
    index: number,
    onAddToCart: (product: Product) => void
    onDelete: (id:number) => void
    onEdit: (product: Product) => void
}

export function ProductItem({product, index, onAddToCart, onDelete, onEdit} : ProductItemProps){
    return (
        <div>
            <div>
                {index + 1}. {product.title}
            </div>
            <div>
                Cost: {product.price} tg
            </div>
            <div>
                <button onClick={() => onAddToCart(product)}>Add to cart</button>
                <button onClick={() => onEdit(product)}>Edit</button>
                <button onClick={() => onDelete(product.id)}>Delete</button>
            </div>
        </div>
    )
}