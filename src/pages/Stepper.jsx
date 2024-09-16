
import React, { useState, useRef } from 'react';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';

export default function Stepper() {
    const [activeIndex, setActiveIndex] = useState(0);
    const toast = useRef(null);
    const items = [
        {
            label: 'Create/Select Project',
            command: (event) => {
                toast.current.show({ severity: 'info', summary: 'First Step', detail: event.item.label });
            }
        },
        {
            label: 'Select Shipping Address',
            command: (event) => {
                toast.current.show({ severity: 'info', summary: 'Second Step', detail: event.item.label });
            }
        },
        {
            label: 'Add Items',
            command: (event) => {
                toast.current.show({ severity: 'info', summary: 'Third Step', detail: event.item.label });
            }
        },
        {
            label: 'Add Terms&Conditions',
            command: (event) => {
                toast.current.show({ severity: 'info', summary: 'Third Step', detail: event.item.label });
            }
        },
        
        {
            label: 'QuotationSaved',
            command: (event) => {
                toast.current.show({ severity: 'info', summary: 'Last Step', detail: event.item.label });
            }
        }
    ];
    return (
        <>
            <Toast ref={toast}></Toast>
            <Steps 
                model={items} 
                activeIndex={activeIndex} 
                onSelect={(e) => setActiveIndex(e.index)} 
                readOnly={false} 
                style={{ width: '100%' }}  // Full width stepper
            />
        </>
    );
}
        
