import React from "react";

const withHeaderAndContentData = (headerData: any): any => (
    // eslint-disable-next-line comma-dangle
    WrappedComponent: any
): any => {
    // eslint-disable-next-line react/display-name
    return ({ contentData }: any) => {
        return (
            <WrappedComponent
                headerData={headerData}
                contentData={contentData}
            ></WrappedComponent>
        );
    };
};

export default withHeaderAndContentData;
