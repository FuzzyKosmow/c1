import StarRating from "../StarRating";

// Updated CartView Component to Display Product Options
interface CartViewProps {
  productDetails: ProductDetails | null;
  quantity: number;
  setQuantity: (quantity: number) => void;
  onNext: () => void;
  loadingProduct: boolean;
}
interface ProductDetails {
  id: number;
  name: string;
  price: number;
  discount_price: number;
  rating: number;
  images: string[];
}
function CartView({
  productDetails,
  quantity,
  setQuantity,
  onNext,
  loadingProduct,
}: CartViewProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
      {productDetails ? (
        <div>
          <ProductCardDetails product={productDetails} />
          <div className="mt-4">
            <label htmlFor="quantity" className="block text-sm font-semibold">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 px-2 py-1 border rounded-md"
            />
          </div>
        </div>
      ) : (
        (loadingProduct && <p>Loading...</p>) || (
          <p>There is no product to display</p>
        )
      )}
    </div>
  );
}
// Used to display a card that show image on the left. Then on the right top down: name , price, rating.
const ProductCardDetails = ({ product }: { product: ProductDetails }) => {
  return (
    <div className="flex border p-4 rounded-lg">
      <img src={product.images[0]} alt={product.name} className="w-24 h-24" />
      <div className="ml-4">
        <h4 className="font-semibold">{product.name}</h4>
        <p>{product.price.toLocaleString()}₫</p>
        <StarRating rating={product.rating} />
      </div>
    </div>
  );
};

export default CartView;
