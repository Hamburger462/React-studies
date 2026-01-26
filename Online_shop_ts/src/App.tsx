import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { ProductForm } from "./components/ProductForm";
import { ProductList } from "./components/ProductList";
import type { NewProduct, Product } from "./type/product";

const initialProducts: Product[] = [
  { id: 1, title: "Keyboard", price: 12000 },
  { id: 2, title: "Mouse", price: 7000 },
  { id: 3, title: "Headphones", price: 35000 },
];

type CartItem = {
  product: Product
  amount: number
}

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Корзина как массив продуктов (можно добавлять один и тот же товар много раз)
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(product: Product){
    setCart(cart.map(item => item.product === product ? {...item, amount: item.amount++} : item)
    )
  }

  // Редактирование
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Простой поиск (не обязателен, но удобен)
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.title.toLowerCase().includes(q));
  }, [products, query]);



  function deleteProduct(id: number) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    // На всякий — если удалили товар, который был в редактировании
    setEditingProduct((prev) => (prev?.id === id ? null : prev));
    // Удалим его же из корзины, чтобы не было "мертвых" позиций
    
  }

  function startEdit(product: Product) {
    setEditingProduct(product);
    // Можно проскроллить наверх к форме — по желанию:
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function createProduct(newProduct: NewProduct) {
    const nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    const product: Product = {
      id: nextId,
      title: newProduct.title,
      price: newProduct.price,
    };

    setProducts((prev) => [product, ...prev]);
  }

  function updateProduct(updated: Product) {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));

    // Если этот товар уже лежит в корзине — обновим его и там
   

    setEditingProduct(null);
  }



  const totalProducts = products.length;
 

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16, display: "grid", gap: 16 }}>
      <Header totalProducts={totalProducts} totalCartItems={cart.length} />

      <div style={{ display: "grid", gap: 10 }}>
        <ProductForm
          initialProduct={editingProduct}
          onCreate={createProduct}
          onUpdate={updateProduct}
          onCancel={() => setEditingProduct(null)}
        />

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: "1 1 260px" }}
          />

        

       
        </div>
      </div>

      <main style={{ display: "grid", gap: 10 }}>
        <h2 style={{ margin: 0 }}>Товары</h2>

        <ProductList
          items={filteredProducts}
          onDelete={deleteProduct}
          onAddToCart={addToCart}
          onEdit={startEdit}
        />
      </main>

      
    </div>
  );
}