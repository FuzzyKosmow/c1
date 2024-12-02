import { useState, useEffect } from "react";
import { getCategoriesAPI } from "@/services/api/product/product-list";
import { addProduct, updateProduct } from "@/services/api/admin/product-op";
import {
  createCategoryAPI,
  deleteCategoryAPI,
} from "@/services/api/admin/category-op";
interface ProductFormModalProps {
  product: IAdminProduct | null;
  closeModal: () => void;
}
// Do not modify, may break.
export default function ProductFormModal({
  product,
  closeModal,
}: ProductFormModalProps) {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [discountPrice, setDiscountPrice] = useState(
    product?.discountPrice || ""
  );
  const [rating, setRating] = useState(product?.rating || 0);
  const [availability, setAvailability] = useState(
    product?.availability || false
  );
  const [importPrice, setImportPrice] = useState(product?.importPrice || 0);

  const [images, setImages] = useState(product?.images || []);
  const [description, setDescription] = useState(product?.description || "");

  const [isBestSeller, setIsBestSeller] = useState(
    product?.isBestSeller || false
  );
  const [isPopular, setIsPopular] = useState(product?.isPopular || false);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured || false);
  const [releaseDate, setReleaseDate] = useState(
    product?.releaseDate || new Date()
  );
  const [isNewArrival, setIsNewArrival] = useState(
    product?.isNewArrival || false
  );
  // Categories management
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newCategoryIsPopular, setNewCategoryIsPopular] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  const [categories, setCategories] = useState<ICategoryDTO[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(
    product?.categories.map((c) => c.id) || []
  );
  // Fetch all categories to display in the multi-select
  useEffect(() => {
    async function fetchCategories() {
      const res = await getCategoriesAPI();
      setCategories(res as unknown as ICategoryDTO[]);
    }
    fetchCategories();
  }, []);
  // Category add and delete handlers
  // Add new category function
  const handleAddCategory = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAddCategoryModal(true);
  };

  const submitNewCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      alert("Category name cannot be empty");
      return;
    }
    if (!newCategoryImage.trim()) {
      alert("Category image URL cannot be empty");
      return;
    }
    if (!newCategoryDescription.trim()) {
      alert("Category description cannot be empty");
      return;
    }
    // Check if the category already exists
    if (categories.some((cat) => cat.name === newCategoryName.trim())) {
      alert("Category already exists");
      return;
    }
    const payload = {
      name: newCategoryName.trim(),
      image: newCategoryImage.trim(),
      description: newCategoryDescription.trim(),
      isPopular: false,
    };
    try {
      const res = await createCategoryAPI(payload);
      setCategories([...categories, res]);
      setShowAddCategoryModal(false);
      setNewCategoryName("");
      setNewCategoryImage("");
      setNewCategoryDescription("");
      } catch (error) {
      console.error("Failed to add category", error);
    }
  };

  // Toggle checkbox for categories
  const handleCategoryToggle = (categoryId: number) => {
    if (selectedCategoryIds.includes(categoryId)) {
      setSelectedCategoryIds((prev) => prev.filter((id) => id !== categoryId));
    } else {
      setSelectedCategoryIds((prev) => [...prev, categoryId]);
    }
  };

  // Delete category with warning
  // Prevent default as well
  const handleCategoryDelete = (e: React.MouseEvent, categoryId: number) => {
    e.preventDefault();
    setCategoryToDelete(categoryId);
    setShowDeleteWarning(true);
  };

  // Confirm category delete
  const confirmCategoryDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryToDelete !== null) {
      try {
        await deleteCategoryAPI(categoryToDelete);
        setCategories((prev) =>
          prev.filter((cat) => cat.id !== categoryToDelete)
        );
        setShowDeleteWarning(false);
        setCategoryToDelete(null);
      } catch (error) {
        console.error("Failed to delete category", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Make sure its above 1970. If not set it to null
    // If it is null, it will be set to null in the payload
    const releaseDateValid = new Date(releaseDate) > new Date("1970-01-01");
    const payload = {
      name,
      price: price,
      discountPrice: discountPrice || null,
      rating: rating,
      availability,
      importPrice: importPrice,
      images,
      description,
      isBestSeller,
      isFeatured,
      isPopular,
      isNewArrival,
      // Release date in the format "YYYY-MM-DD"
      releaseDate: releaseDateValid ? releaseDate : null,
      categoryIds: selectedCategoryIds, // Send selected category IDs
    };

    try {
      // convert payload to IAMProduct
      const p = payload as UpsertProductDTO;
      if (product) {
        // Update product
        await updateProduct(product.id.toString(), p);
      } else {
        // Create product
        await addProduct(p);
      }
      closeModal(); // Close modal after successful submit
    } catch (error) {
      console.error("Failed to save product", error);
    }
  };

  // Color, Image, Storage, Specification management

  // Images
  const addImage = () => setImages([...images, ""]);
  const updateImage = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-60 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-3/4 max-h-[90%] overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {product ? "Edit Product" : "Create New Product"}
        </h2>
        <div className="overflow-y-auto max-h-[70vh]">
          <form onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {/* Price */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {/* Discount Price */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Discount Price
              </label>
              <input
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Rating */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Rating
              </label>
              <input
                type="number"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Availability */}
            <div className="mb-6 flex items-center">
              <label
                className="block text-sm font-medium text-gray-700 mr-4"
                title="If the product is available for purchase. Will be changed to availability which track inventory later."
              >
                Available
              </label>
              <input
                type="checkbox"
                checked={availability}
                onChange={(e) => setAvailability(e.target.checked)}
                className="w-5 h-5 accent-blue-500"
              />
            </div>
            {/* Import Price */}
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                title="Used to calculate profit margin. The profit margin is calculated as (Price Sold - Import Price) / Price sold * 100"
              >
                Import Price
              </label>
              <input
                type="number"
                value={importPrice}
                onChange={(e) => setImportPrice(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center border border-gray-300 rounded-md px-2 py-1 bg-gray-100"
                  >
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedCategoryIds.includes(category.id)}
                        onChange={() => handleCategoryToggle(category.id)}
                        className="accent-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {category.name}
                      </span>
                    </label>
                    <button
                      className="text-red-500 hover:text-red-700 ml-3"
                      onClick={(e) => handleCategoryDelete(e, category.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={handleAddCategory}
                >
                  Add Category
                </button>
              </div>
            </div>
            {/* Modal for Adding a New Category */}
            {showAddCategoryModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Add New Category
                  </h3>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter category name"
                  />
                  <input
                    type="text"
                    value={newCategoryImage}
                    onChange={(e) => setNewCategoryImage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mt-2"
                    placeholder="Enter category image URL"
                  />
                  <textarea
                    value={newCategoryDescription}
                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mt-2"
                    placeholder="Enter category description"
                  />
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Is Popular
                    </label>
                    <input
                      type="checkbox"
                      checked={newCategoryIsPopular}
                      onChange={(e) =>
                        setNewCategoryIsPopular(e.target.checked)
                      }
                      className="w-5 h-5 accent-blue-500"
                    />
                  </div>

                  <div className="flex justify-end mt-4 space-x-2">
                    <button
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                      onClick={() => setShowAddCategoryModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      onClick={submitNewCategory}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Modal for Deleting a Category */}
            {showDeleteWarning && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold mb-4 text-red-600">
                    Warning
                  </h3>
                  <p className="text-sm text-gray-700 mb-6">
                    Are you sure you want to delete this category? This will
                    remove it from all associated products.
                  </p>
                  <div className="flex justify-end mt-4 space-x-2">
                    <button
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                      onClick={() => setShowDeleteWarning(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={confirmCategoryDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Images */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Images
              </label>
              {images.map((image, index) => (
                <div key={index} className="flex items-center mb-2 space-x-3">
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => updateImage(index, e.target.value)}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImage}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add Image
              </button>
            </div>
            {/* Description */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Best Seller */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Is Best Seller
              </label>
              <input
                type="checkbox"
                checked={isBestSeller}
                onChange={(e) => setIsBestSeller(e.target.checked)}
                className="w-5 h-5 accent-blue-500"
              />
            </div>
            {/* Featured */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Is Featured
              </label>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-5 h-5 accent-blue-500"
              />
            </div>
            {/* Popular */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Is Popular
              </label>
              <input
                type="checkbox"
                checked={isPopular}
                onChange={(e) => setIsPopular(e.target.checked)}
                className="w-5 h-5 accent-blue-500"
              />
            </div>
            {/* Release Date */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Release Date
              </label>
              <input
                type="date"
                value={
                  releaseDate
                    ? releaseDate.toString().split("T")[0]
                    : new Date().toISOString().split("T")[0]
                }
                onChange={(e) => setReleaseDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* New Arrival */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Is New Arrival
              </label>
              <input
                type="checkbox"
                checked={isNewArrival}
                onChange={(e) => setIsNewArrival(e.target.checked)}
                className="w-5 h-5 accent-blue-500"
              />
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {product ? "Save Changes" : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
