"use client";

import { useState, useEffect, useCallback } from 'react';
import $ from 'jquery';

interface Row {
  id: number;
  key: string;
}

const ChequeTable: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([{ id: 0, key: `${Date.now()}-0` }]);
  const [products, setProducts] = useState<string[]>(["Cheque 1", "Cheque 2", "Cheque 3", "Cheque 4"]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const calcTotal = useCallback(() => {
    const taxAmount = (subTotal * tax) / 100;
    setTaxAmount(taxAmount);
    setTotalAmount(subTotal + taxAmount);
  }, [subTotal, tax]);

  const calc = useCallback(() => {
    let total = 0;
    $('#tab_logic tbody tr').each(function () {
      const qty = parseFloat($(this).find('.qty').val() as string) || 0;
      const price = parseFloat($(this).find('.price').val() as string) || 0;
      $(this).find('.total').val((qty * price).toFixed(2));
      total += qty * price;
    });
    setSubTotal(total);
    calcTotal();
  }, [calcTotal]);

  useEffect(() => {
    $('#tab_logic tbody').on('keyup change', calc);
    $('#tax').on('keyup change', calcTotal);
  }, [calc, calcTotal]);

  const addRow = () => {
    const newRow = { id: rows.length, key: `${Date.now()}-${rows.length}` };
    setRows([...rows, newRow]);
  };

  const deleteRow = (key: string) => {
    setRows(rows.filter(row => row.key !== key));
  };

  const optionChecker = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const myOption = e.target.value;
    let s = 0;
    $('#tab_logic tbody tr select').each(function () {
      if ($(this).val() === myOption) s++;
    });
    if (s > 1) {
      alert(`${myOption} has been added already. Try a new one.`);
    }
  };

  return (
    <div className="container">
      <div className="row clearfix">
        <div className="col-md-12">
          <table className="table table-bordered table-hover" id="tab_logic">
            <thead>
              <tr>
                <th className="text-center"> # </th>
                <th className="text-center"> Cheque Number </th>
                <th className="text-center"> Date </th>
                <th className="text-center"> Cheque Amount </th>
                <th className="text-center"> Note </th>
                <th className="text-center"> Actions </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr id={`addr${index}`} key={row.key}>
                  <td>{index + 1}</td>
                  <td>
                    <select
                      className="form-control"
                      name={`product[${index}]`}
                      onChange={optionChecker}
                    >
                      <option value="">Select Cheque</option>
                      {products.map((product, idx) => (
                        <option key={idx} value={product}>
                          {product}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="date"
                      name={`date[${index}]`}
                      placeholder="Enter Date"
                      className="form-control date"
                      step="0"
                      min="0"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name={`chequeAmount[${index}]`}
                      placeholder="Enter Cheque Amount"
                      className="form-control chequeAmount"
                      step="0.00"
                      min="0"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name={`total[${index}]`}
                      placeholder="0.00"
                      className="form-control total"
                      readOnly
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
      <div className="pull-right col-md-8">
&nbsp;&nbsp;
      </div>
        <div className="pull-right col-md-4">
          <table className="table table-bordered table-hover" id="tab_logic_total">
            <tbody>
              
              <tr>
                <th className="text-center">Grand Total</th>
                <td className="text-center">
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

export default ChequeTable;