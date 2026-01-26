import { useEffect, useMemo, useState } from "react";
import type { NewProduct, Product } from "../type/product";

type ProductFormProps = {
  /** Если передали товар — форма в режиме редактирования */
  initialProduct?: Product | null;

  /** Создание нового товара */
  onCreate: (product: NewProduct) => void;

  /** Сохранение изменений существующего товара */
  onUpdate: (product: Product) => void;

  /** Закрыть/отменить (например, выйти из режима редактирования) */
  onCancel?: () => void;
};

export function ProductForm({
  initialProduct,
  onCreate,
  onUpdate,
  onCancel,
}: ProductFormProps) {
  const isEdit = Boolean(initialProduct);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string>("");

  const [touched, setTouched] = useState(false);

  // Подставляем данные при входе в режим редактирования / смене товара
  useEffect(() => {
    setTitle(initialProduct?.title ?? "");
    setPrice(initialProduct ? String(initialProduct.price) : "");
    setTouched(false);
  }, [initialProduct]);

  const normalizedTitle = title.trim();

  const priceNumber = useMemo(() => {
    // Разрешаем ввод "12,5"
    const normalized = price.replace(",", ".").trim();
    if (normalized === "") return NaN;
    return Number(normalized);
  }, [price]);

  const titleError =
    touched && normalizedTitle.length === 0 ? "Введите название товара" : "";

  const priceError =
    touched && (!Number.isFinite(priceNumber) || priceNumber <= 0)
      ? "Цена должна быть числом больше 0"
      : "";

  const isValid = normalizedTitle.length > 0 && Number.isFinite(priceNumber) && priceNumber > 0;

  function resetForm() {
    setTitle("");
    setPrice("");
    setTouched(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);

    if (!isValid) return;

    if (initialProduct) {
      onUpdate({
        ...initialProduct,
        title: normalizedTitle,
        price: Math.round(priceNumber), // если хочешь хранить только целые тг
      });
    } else {
      onCreate({
        title: normalizedTitle,
        price: Math.round(priceNumber),
      });
    }

    resetForm();
  }

  function handleCancel() {
    // если редактирование — обычно нужно выйти из edit режима
    if (onCancel) onCancel();
    resetForm();
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
      <h3 style={{ margin: 0 }}>{isEdit ? "Редактирование товара" : "Добавление товара"}</h3>

      <label style={{ display: "grid", gap: 6 }}>
        <span>Название</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Например: Keyboard"
        />
        {titleError && <small style={{ color: "crimson" }}>{titleError}</small>}
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        <span>Цена (тг)</span>
        <input
          type="text"
          inputMode="decimal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Например: 12000"
        />
        {priceError && <small style={{ color: "crimson" }}>{priceError}</small>}
      </label>

      <div style={{ display: "flex", gap: 10 }}>
        <button type="submit" disabled={!isValid}>
          {isEdit ? "Сохранить" : "Добавить"}
        </button>

        <button type="button" onClick={handleCancel}>
          {isEdit ? "Отмена" : "Очистить"}
        </button>
      </div>
    </form>
  );
}