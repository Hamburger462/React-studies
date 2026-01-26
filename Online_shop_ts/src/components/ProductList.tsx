import type { Product } from "../type/product";
import { ProductItem } from "./ProductItem";

type ProductListProps = {
    items: Product[]
    onAddToCart: (product: Product) => void
    onDelete: (id: number) => void
    onEdit: (product: Product) => void
}

export function ProductList({items, onAddToCart, onDelete, onEdit}: ProductListProps){
    if(items.length === 0) return <p>There is no items</p>

    return (
        <div>
            {items.map((p, i) => (
                <ProductItem
                key={p.id}
                product={p}
                index={i}
                onAddToCart={onAddToCart}
                onDelete={onDelete}
                onEdit={onEdit}
                ></ProductItem>
            ))}
        </div>
    )
}