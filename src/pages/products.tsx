import { Button } from "react-bootstrap";
import { initialProducts, tableSections } from "../lib/utils";
import { useEffect, useState } from "react";
import FormModal from "../components/form-modal";

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [searchInput, setSearchInput] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  useEffect(() => {
    let filteredProducts = initialProducts;

    // Filter By Search...
    if (searchInput !== "") {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(searchInput.trim().toLowerCase())
      );
    }

    // Filter By MaxPrice...
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (item) => item.price <= maxPrice
      );
    }

    // Filter By MinPrice...
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (item) => item.price >= minPrice
      );
    }

    // Filter By Price Between Min and Max Price...
    if (minPrice !== undefined && maxPrice !== undefined) {
      filteredProducts.filter((prod) => {
        return prod.price >= minPrice && prod.price <= maxPrice;
      });
    }

    setProducts(filteredProducts);
  }, [searchInput, minPrice, maxPrice]);

  const handleDeleteProd = (prodId: string) => {
    const fileteredProds = products.filter((prod) => {
      return prod.skuCode !== prodId;
    });
    setProducts(fileteredProds);
  };

  return (
    <>
      <main className="container py-5 min-vh-100">
        {/* ===========Filter-Options=========== */}
        <section className="d-flex align-items-center justify-content-between border-bottom py-2">
          <input
            type="text"
            className="form-control border-2 w-25"
            placeholder="Search products..."
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <div className="d-flex align-items-center gap-2">
            <input
              type="number"
              className="form-control border-2"
              placeholder="Min price..."
              onChange={(e) =>
                setMinPrice(parseFloat(e.target.value) || undefined)
              }
            />

            <input
              type="number"
              className="form-control border-2"
              placeholder="Max price..."
              onChange={(e) =>
                setMaxPrice(parseFloat(e.target.value) || undefined)
              }
            />
          </div>
        </section>

        {/* ===========Products Listings=========== */}
        <section className="container py-3">
          <table className="w-100">
            <thead className="text-center border">
              <tr className="">
                {tableSections &&
                  tableSections.map(({ id, label }) => (
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
              {products &&
                products.map(({ name, skuCode, mrp, price }) => (
                  <tr key={skuCode} className="border-bottom">
                    <td className="fw-medium fs-5 p-2">{name}</td>
                    <td>{skuCode}</td>
                    <td>
                      {mrp.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </td>
                    <td>
                      {price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </td>
                    <td>
                      <Button className="btn btn-secondary">Edit</Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteProd(skuCode)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>

        {/* ===========Product-Form-Model=========== */}
        <section>
          <FormModal />
        </section>
      </main>
    </>
  );
}
