import React from "react";
// eslint-disable-next-line no-unused-vars
import TableData, { Header } from "./table.interfaces";

const Table = ({ headerData, contentData }: TableData) => {
    if (contentData.length === 0) {
        return (
            <div>
                <h1>{headerData.tableName}</h1>
                <div className='card-panel red lighten-2 center'>
                    There is no data to be displayed!
                </div>
            </div>
        );
    }
    const tableRows = contentData.map((data: any) => {
        const rowData = headerData.headers.map((header: Header) => {
            if (header.isComponent) {
                const Component = data[header.key]["component"];
                const props = data[header.key]["props"];
                return (
                    <td key={header.key + data.id}>
                        <Component {...props}></Component>
                    </td>
                );
            }
            // eslint-disable-next-line react/jsx-key
            return <td key={header.key + data.id}>{data[header.key]}</td>;
        });
        return <tr key={data.id}>{rowData}</tr>;
    });
    return (
        <div>
            <h1>{headerData.tableName}</h1>
            <table className='highlight'>
                <thead>
                    <tr>
                        {headerData.headers.map((header: any) => {
                            // eslint-disable-next-line react/jsx-key
                            return <th key={header.name}>{header.name}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
        </div>
    );
};

export default Table;
