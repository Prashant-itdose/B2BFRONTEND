import React, { useEffect } from 'react';

const NoDataMessage = ({ show, setShow }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false); // Unmount after 2 seconds
            }, 2000);

            return () => clearTimeout(timer); // Cleanup timer
        }
    }, [show, setShow]);

    return (
        <>
            {show && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(8px)', // Blur effect
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#ffffff',
                            padding: '2rem',
                            borderRadius: '12px',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                            textAlign: 'center',
                            color: '#333',
                            minWidth: '300px',
                            minHeight: '150px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <h4 style={{ margin: 0, fontSize: '1.5rem' }}>No Data to Show</h4>
                    </div>
                </div>
            )}
        </>
    );
};

export default NoDataMessage;
