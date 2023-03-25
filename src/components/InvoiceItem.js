import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableField';

function InvoiceItem(props) {
  const { onItemizedItemEdit, currency, onRowDel, items, onRowAdd } = props;

  const itemTable = items.map((item) => {
    return (
      <ItemRow onItemizedItemEdit={onItemizedItemEdit} item={item} onDelEvent={() => onRowDel(item)} key={item.id} currency={currency} />
    )
  });

  function onRowAddHandler() {
    onRowAdd();
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {itemTable}
        </tbody>
      </Table>
      <Button className="fw-bold" onClick={onRowAddHandler}>Add Item</Button>
    </div>
  );
}

function ItemRow(props) {
  const { onItemizedItemEdit, item, currency } = props;

  function onDelEventHandler() {
    props.onDelEvent();
  }

  return (
    <tr>
      <td style={{ width: '100%' }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: item.name,
            id: item.id,
          }} />
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description",
            value: item.description,
            id: item.id
          }} />
      </td>
      <td style={{ minWidth: '70px' }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: item.quantity,
            id: item.id,
          }} />
      </td>
      <td style={{ minWidth: '130px' }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            leading: currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value: item.price,
            id: item.id,
          }} />
      </td>
      <td className="text-center" style={{ minWidth: '50px' }}>
        <BiTrash onClick={onDelEventHandler} style={{ height: '33px', width: '33px', padding: '7.5px' }} className="text-white mt-1 btn btn-danger" />
      </td>
    </tr>
  );
}

export default InvoiceItem;
