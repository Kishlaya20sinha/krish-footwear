import { createContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [account, setAccount] = useState('');

    useEffect(() => {
        const savedAccount = localStorage.getItem('account');
        const savedToken = localStorage.getItem('token');
        if (savedAccount && savedToken) {
            setAccount(savedAccount);
        }
    }, []);

    const setAccountAndPersist = (name) => {
        if (name) {
            localStorage.setItem('account', name);
        } else {
            localStorage.removeItem('account');
            localStorage.removeItem('token');
        }
        setAccount(name);
    };

    return (
        <DataContext.Provider value={{ account, setAccount: setAccountAndPersist }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
