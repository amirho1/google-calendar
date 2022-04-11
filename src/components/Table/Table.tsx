import React, { FC, useMemo } from "react";
import styles from "./Table.module.scss";

export type PrimitivesT =
  | string
  | boolean
  | JSX.Element
  | number
  | null
  | bigint;

export interface RowValueObjectI {
  value: PrimitivesT;
  cv: (value: RowValueObjectI) => JSX.Element;
}

export interface Row {
  [props: string]: PrimitivesT;
}

export interface HeadersObjI {
  name: string;
  cb: (header: HeadersObjI) => JSX.Element;
}

export type HeadersI = (string | HeadersObjI)[];

interface TableProps {
  headers: HeadersI;
  rows: Row[];
  className?: string;
  thClassName?: string;
  trClassName?: string;
  theadClassName?: string;
  tbodyClassName?: string;
  tdClassName?: string;
}

function mapHeaders(
  headers: HeadersI,
  thClassName?: string,
  trClassName?: string
) {
  return (
    <tr className={trClassName} id="trInHead">
      {headers.map((header, i) => {
        return (
          <th key={i} className={thClassName}>
            {typeof header === "string" ? header : header.cb(header)}
          </th>
        );
      })}
    </tr>
  );
}

function mapRows(
  rows: Row[],
  headers: HeadersI,
  trClassName?: string,
  tdClassName?: string
) {
  return rows.map((row, index) => (
    <tr className={trClassName} key={index}>
      {headers.map((header, i) => (
        <td className={tdClassName} key={i}>
          {row[typeof header === "string" ? header : header.name]}
        </td>
      ))}
    </tr>
  ));
}

const Table: FC<TableProps> = ({
  headers,
  rows,
  className,
  thClassName,
  trClassName,
  theadClassName,
  tbodyClassName,
  tdClassName,
}) => {
  const mappedHeaders = useMemo(
    () => mapHeaders(headers, thClassName, trClassName),
    [headers, thClassName, trClassName]
  );

  const mappedRows = useMemo(
    () => mapRows(rows, headers, trClassName, tdClassName),
    [headers, rows, tdClassName, trClassName]
  );

  return (
    <table className={`${styles.Table} ${className}`} data-testid="Table">
      <thead className={theadClassName}>{mappedHeaders}</thead>
      <tbody className={tbodyClassName} date-testid="tbody">
        {mappedRows}
      </tbody>
    </table>
  );
};

export default Table;
