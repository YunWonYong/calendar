import { FC, useEffect } from "react";

const ErrorPage: FC<{ errorMessage: string }> = ({ errorMessage }) => {
    useEffect(() => {
        const logging = async () => {
            // [TODO] errorMessage logging
            // fetch

            console.error(errorMessage);
        };
        logging();
    }, [errorMessage]);
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>시스템 오류</h1>
            <p>서비스 이용에 불편을 드려 죄송합니다.</p>
        </div>
    );
};

export default ErrorPage;