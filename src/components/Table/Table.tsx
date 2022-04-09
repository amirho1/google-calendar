import React, { FC, useMemo } from "react";
import styles from "./Table.module.scss";

export type PrimitivesT =
  | string
  | boolean
  | JSX.Element
  | number
  | null
  | bigint;

export type RowValueT = PrimitivesT | JSX.Element | RowValueT[];

export interface Row {
  [props: string]: RowValueT;
}

interface TableProps {
  headers: string[];
  rows: Row[];
  className?: string;
  thClassName?: string;
  trClassName?: string;
  theadClassName?: string;
  tbodyClassName?: string;
  tdClassName?: string;
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
    () => (
      <tr className={trClassName} id="trInHead">
        {headers.map((header, i) => (
          <th key={i} className={thClassName}>
            {header}
          </th>
        ))}
      </tr>
    ),
    [headers, thClassName, trClassName]
  );

  const MappedRows = useMemo(
    () =>
      rows.map((row, index) => (
        <tr className={trClassName} key={index}>
          {headers.map((header, i) => (
            <td className={tdClassName} key={i}>
              {row[header]}
            </td>
          ))}
        </tr>
      )),
    [headers, rows, tdClassName, trClassName]
  );

  return (
    <table className={`${styles.Table} ${className}`} data-testid="Table">
      <thead className={theadClassName}>{mappedHeaders}</thead>
      <tbody className={tbodyClassName}>{MappedRows}</tbody>
    </table>
  );
};

export default Table;
