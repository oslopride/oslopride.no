import React from "react";
import styled from "styled-components";

const Table = styled.table`
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 3px solid #ddd;

  :first-child {
    border-top: 3px solid #ddd;
  }
`;

const TableData = styled.td`
  padding: 10px 0;

  :first-child {
    font-weight: bold;
    padding-right: 10px;
  }
`;

const FeaturedDatesTable = ({ className, dates }) => (
  <Table className={className}>
    <tbody>
      {dates.map(({ _key: key, date, title }) => (
        <TableRow key={key}>
          <TableData>{title}</TableData>
          <TableData>{date}</TableData>
        </TableRow>
      ))}
    </tbody>
  </Table>
);

export default FeaturedDatesTable;
