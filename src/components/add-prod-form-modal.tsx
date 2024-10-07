import { useState } from "react";
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

interface AddProdFormModalProps {
  getNewProd: (prod: ProdDetail) => void;
}

function AddProdFormModal({ getNewProd }: AddProdFormModalProps) {
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    reset();
    setShow(true);
  };

  const onSubmit: SubmitHandler<FormFields> = (formData) => {
    const newProduct: ProdDetail = {
      id: Date.now().toString(),
      ...formData,
    };
    getNewProd(newProduct);
    reset();
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" className="fw-medium" onClick={handleShow}>
        Add Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column gap-2"
          >
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
              })}
            />
            {errors.skuCode && (
              <p className="text-danger">{errors.skuCode.message}</p>
            )}

            <label htmlFor="mrp" className="fw-medium">
              MRP
            </label>
            <input
              type="number"
              id="mrp"
              className={`form-control ${errors.mrp ? "is-invalid" : ""}`}
              placeholder="Enter product MRP..."
              {...register("mrp", { required: "Product MRP is required." })}
            />
            {errors.mrp && <p className="text-danger">{errors.mrp.message}</p>}

            <label htmlFor="price" className="fw-medium">
              Price
            </label>
            <input
              type="number"
              id="price"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              placeholder="Enter product price..."
              {...register("price", { required: "Product price is required." })}
            />
            {errors.price && (
              <p className="text-danger">{errors.price.message}</p>
            )}

            <Button type="submit" className="btn btn-success">
              Add Product
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProdFormModal;
