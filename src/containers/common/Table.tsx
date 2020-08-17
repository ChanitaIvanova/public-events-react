import React from "react";
// eslint-disable-next-line no-unused-vars
import TableData from "./table.interfaces";

const Table = ({ headerData, contentData }: TableData) => {
    if (contentData.length === 0) {
        return <div>There is no data to be displayed</div>;
    }
    const tableRows = contentData.map((data: any) => {
        const rowData = headerData.headers.map((header: any) => {
            // eslint-disable-next-line react/jsx-key
            return <td>{data[header.key]}</td>;
        });
        return <tr key={data.id}>{rowData}</tr>;
    });
    return (
        <div>
            <h1>{headerData.tableName}</h1>
            <table>
                <thead>
                    <tr>
                        {headerData.headers.map((header: any) => {
                            // eslint-disable-next-line react/jsx-key
                            return <th>{header.name}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
        </div>
    );
};

export default Table;
