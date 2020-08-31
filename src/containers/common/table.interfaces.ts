export interface Header {
    key: string;
    name: string;
    isComponent?: boolean;
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
