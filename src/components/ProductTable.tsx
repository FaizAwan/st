import React, { useState, useEffect, useCallback } from 'react';
import { getDatabase, ref, get } from 'firebase/database';

interface Row {
  id: number;
  key: string;
  product: string;
  qty: number;
  price: number;
  total: number;
}

interface ProductTableProps {
  setProductTableData: (data: Row[]) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ setProductTableData }) => {
  const [rows, setRows] = useState<Row[]>([{ id: 0, key: `${Date.now()}-0`, product: "", qty: 0, price: 0, total: 0 }]);
  const [products, setProducts] = useState<string[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      const db = getDatabase();
      const productsRef = ref(db, 'Products');
      try {
        const snapshot = await get(productsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const productNames = data ? Object.keys(data).map(key => data[key].name) : [];
          setProducts(productNames);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Calculate subtotal and update rows
  const calc = useCallback(() => {
    let total = 0;
    const updatedRows = rows.map(row => {
      const qty = row.qty || 0;
      const price = row.price || 0;
      const rowTotal = qty * price;
      total += rowTotal;
      return { ...row, total: rowTotal };
    });
    setRows(updatedRows);
    setSubTotal(total);
  }, [rows]);

  // Calculate total amount including tax
  const calcTotal = useCallback(() => {
    const taxAmount = (subTotal * tax) / 100;
    setTaxAmount(taxAmount);
    setTotalAmount(subTotal + taxAmount);
  }, [subTotal, tax]);

  // Update external state with current rows data
  useEffect(() => {
    setProductTableData(rows);
  }, [rows, setProductTableData]);

  // Handle adding a new row
  const addRow = () => {
    event.preventDefault();
    const newRow = { id: rows.length, key: `${Date.now()}-${rows.length}`, product: "", qty: 0, price: 0, total: 0 };
    setRows(prevRows => [...prevRows, newRow]);
  };

  // Handle deleting a row
  const deleteRow = (key: string) => {
    setRows(prevRows => prevRows.filter(row => row.key !== key));
  };

  // Handle changing a row's data
  const handleRowChange = (index: number, field: string, value: string | number) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  // Validate option selection
  const optionChecker = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const myOption = e.target.value;
    const count = rows.filter(row => row.product === myOption).length;
    if (count > 1) {
      alert(`${myOption} has already been selected. Please choose a different product.`);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row clearfix">
        <div className="col-md-12">
          <table className="table table-bordered table-hover" id="tab_logic">
            <thead>
              <tr>
                <th> # </th>
                <th> Urdu Name </th>
                <th> Product </th>
                <th> Lot No. </th>
                <th> Packing </th>
                <th> Qty </th>
                <th> T.Weight </th>
                <th> Price </th>
                <th> Bag Rate </th>
                <th> Per KG Rate </th>
                <th> Total </th>
                <th> Less W </th>
                <th> Add W </th>
                <th> Actions </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.key}>
                  <td>{index + 1}</td>
                  <td>Urdu Name</td>
                  <td>
                    <select
                      className="form-control"
                      name={`product[${index}]`}
                      value={row.product}
                      onChange={(e) => {
                        handleRowChange(index, 'product', e.target.value);
                        optionChecker(e);
                      }}
                    >
                      <option value="">Select Product</option>
                      {products.map((product, idx) => (
                        <option key={idx} value={product}>
                          {product}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>Lot No.</td>
                  <td>Packing</td>
                  <td>
                    <input
                      type="number"
                      name={`qty[${index}]`}
                      placeholder="Enter Qty"
                      className="form-control qty"
                      value={row.qty}
                      onChange={(e) => handleRowChange(index, 'qty', parseFloat(e.target.value))}
                    />
                  </td>
                  <td>T.Weight</td>
                  <td>
                    <input
                      type="number"
                      name={`price[${index}]`}
                      placeholder="Enter Unit Price"
                      className="form-control price"
                      value={row.price}
                      onChange={(e) => handleRowChange(index, 'price', parseFloat(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name={`bag_rate[${index}]`}
                      placeholder="Enter Bag Rate"
                      className="form-control price"
                      value={row.price}
                      onChange={(e) => handleRowChange(index, 'bag_rate', parseFloat(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name={`per_kg_rate[${index}]`}
                      placeholder="Enter Per KG Rate"
                      className="form-control price"
                      value={row.price}
                      onChange={(e) => handleRowChange(index, 'per_kg_rate', parseFloat(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name={`total[${index}]`}
                      placeholder="Enter Total"
                      className="form-control total"
                      value={row.total}
                      onChange={(e) => handleRowChange(index, 'total', parseFloat(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name={`less_w[${index}]`}
                      placeholder="Enter Less W"
                      className="form-control price"
                      value={row.price}
                      onChange={(e) => handleRowChange(index, 'less_w', parseFloat(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name={`add_w[${index}]`}
                      placeholder="Enter Add W"
                      className="form-control total"
                      value={row.total}
                      onChange={(e) => handleRowChange(index, 'add_w', parseFloat(e.target.value))}
                    />
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteRow(row.key)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row clearfix">
        <div className="col-md-12">
          <button onClick={addRow} className="btn btn-success pull-left">
            Add Row
          </button>
        </div>
      </div>
      <div className="row clearfix" style={{ marginTop: 20 }}>
        <div className="pull-right col-md-8">&nbsp;&nbsp;</div>
        <div className="pull-right col-md-4">
          <table className="table table-bordered table-hover" id="tab_logic_total">
            <tbody>
              <tr>
                <th>Grand Total</th>
                <td>
                  <input
                    type="number"
                    name="total_amount"
                    id="total_amount"
                    placeholder="0.00"
                    className="form-control"
                    value={totalAmount.toFixed(2)}
                    readOnly
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
