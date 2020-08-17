interface Header {
    key: string;
    name: string;
}

export interface HeaderData {
    tableName: string;
    headers: Header[];
}

interface TableData {
    headerData: HeaderData;
    contentData: any;
}

export default TableData;
