import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProdDetail } from "../lib/utils";

type FormFields = {
  name: string;
  skuCode: string;
  mrp: number;
  price: number;
};

interface EditModalProps {
  product: ProdDetail | null;
  show: boolean;
  onClose: () => void;
  updateProd: (updatedProd: ProdDetail) => void;
}

function EditModal({ product, show, onClose, updateProd }: EditModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>();

  // Populate the form with the product details when the modal is shown
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        skuCode: product.skuCode,
        mrp: product.mrp,
        price: product.price,
      });
    } else {
      reset();
    }
  }, [product, reset]);

  // Handle form submission and update the product
  const onSubmit: SubmitHandler<FormFields> = (formData) => {
    const updatedProd: ProdDetail = {
      id: product?.id || Date.now().toString(),
      name: formData.name,
      skuCode: formData.skuCode,
      mrp: formData.mrp,
      price: formData.price,
    };

    updateProd(updatedProd);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column gap-2"
        >
          <div>
            <label htmlFor="prodName" className="fw-medium">
              Product Name
            </label>
            <input
              type="text"
              id="prodName"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Enter product name..."
              {...register("name", { required: "Product name is required." })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="skuCode" className="fw-medium">
              SKU Code
            </label>
            <input
              type="text"
              id="skuCode"
              className={`form-control ${errors.skuCode ? "is-invalid" : ""}`}
              placeholder="Enter SKU code..."
              {...register("skuCode", {
                required: "SKU code is required.",
                minLength: {
                  value: 8,
                  message: "SKU Code must have at least 8 characters.",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: "SKU Code must contain both letters and numbers.",
                },
              })}
            />

            {errors.skuCode && (
              <p className="text-danger">{errors.skuCode.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="mrp" className="fw-medium">
              MRP
            </label>
            <input
              type="number"
              id="mrp"
              className={`form-control ${errors.mrp ? "is-invalid" : ""}`}
              placeholder="Enter product MRP..."
              {...register("mrp", {
                required: "Product MRP is required.",
                min: {
                  value: 0,
                  message: "MRP must be a positive number.",
                },
              })}
            />
            {errors.mrp && <p className="text-danger">{errors.mrp.message}</p>}
          </div>

          <div>
            <label htmlFor="price" className="fw-medium">
              Price
            </label>
            <input
              type="number"
              id="price"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              placeholder="Enter product price..."
              {...register("price", {
                required: "Product price is required.",
                min: {
                  value: 0,
                  message: "Price must be a positive number.",
                },
              })}
            />
            {errors.price && (
              <p className="text-danger">{errors.price.message}</p>
            )}
          </div>

          <Button type="submit" className="btn btn-success">
            Save Changes
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
