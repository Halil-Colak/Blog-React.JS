import { createContext, useContext, useState, useEffect } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, isSuccess = true) => {
        setAlert({ message, isSuccess });
    };

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {alert && (
                <div id="alert" className={alert.isSuccess ? 'success' : 'failed'}>
                    <span>{alert.message}</span>
                </div>
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);
