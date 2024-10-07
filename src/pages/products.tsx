import { Button } from "react-bootstrap";
import { initialProducts, ProdDetail, tableSections } from "../lib/utils";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import AddProdFormModal from "../components/add-prod-form-modal";
import EditModal from "../components/edit-prod-form-modal";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProdDetail[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProdDetail[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [editProd, setEditProd] = useState<ProdDetail | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Load products from local storage on component mount
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
    }
  }, []);

  // Update local storage whenever products change
  useEffect(() => {
    if (products.length >= 1) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  // Function to add or update product
  const handleNewProd = (newProd: ProdDetail) => {
    setProducts((prevProducts) => {
      const existingProduct = prevProducts.find(
        (prod) => prod.id === newProd.id
      );

      if (existingProduct) {
        return prevProducts.map((prod) =>
          prod.id === newProd.id ? newProd : prod
        );
      }

      return [...prevProducts, newProd];
    });
  };

  const handleDeleteProd = (skuCode: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prevProducts) =>
        prevProducts.filter((prod) => prod.skuCode !== skuCode)
      );
    }
  };

  // Function to handle edit product
  const handleEditProd = (prod: ProdDetail) => {
    setEditProd(prod);
    setShowEditModal(true);
  };

  // Function to close edit modal
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditProd(null);
  };

  // Function to handle filtering by search and price range
  useEffect(() => {
    let updatedProducts = products;

    // Filter by search input
    if (searchInput.trim()) {
      updatedProducts = updatedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    // Filter by price range
    if (minPrice !== undefined) {
      updatedProducts = updatedProducts.filter(
        (prod) => prod.price >= minPrice
      );
    }
    if (maxPrice !== undefined) {
      updatedProducts = updatedProducts.filter(
        (prod) => prod.price <= maxPrice
      );
    }

    setFilteredProducts(updatedProducts);
  }, [searchInput, minPrice, maxPrice, products]);

  return (
    <main className="container py-5 min-vh-100">
      {/* ===========Filter-Options=========== */}
      <section className="d-flex flex-column flex-md-row align-items-start gap-2 justify-content-between border-bottom py-2">
        <input
          type="text"
          className="form-control border-2 flex-grow-1"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
          <input
            type="number"
            className="form-control border-2"
            placeholder="Min price..."
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setMinPrice(isNaN(value) ? undefined : value);
            }}
          />
          <input
            type="number"
            className="form-control border-2"
            placeholder="Max price..."
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setMaxPrice(isNaN(value) ? undefined : value);
            }}
          />
        </div>
      </section>

      {/* ===========Products Listings=========== */}
      <section className="container py-3">
        <div className="table-responsive">
          <table className="table w-100">
            <thead className="text-center border">
              <tr>
                {tableSections.map(({ id, label }) => (
                  <th
                    key={id}
                    className="p-2 border border-black bg-secondary-subtle"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center border">
              {filteredProducts.map((prod) => (
                <tr key={prod?.id} className="border-bottom">
                  <td className="fw-medium fs-5 p-2">{prod.name}</td>
                  <td>{prod.skuCode.toUpperCase()}</td>
                  <td>
                    {Number(prod.mrp).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                  <td>
                    {Number(prod.price).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                  <td>
                    <Button
                      className="btn btn-secondary"
                      onClick={() => handleEditProd(prod)}
                    >
                      <FaEdit />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteProd(prod.skuCode)}
                    >
                      <MdDelete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===========Add/Edit Product Modals=========== */}
      <section>
        {/* Add Product Form Modal */}
        <AddProdFormModal getNewProd={handleNewProd} />

        {/* Edit Product Modal */}
        {showEditModal && editProd && (
          <EditModal
            show={showEditModal}
            product={editProd}
            updateProd={handleNewProd}
            onClose={closeEditModal}
          />
        )}
      </section>
    </main>
  );
}
