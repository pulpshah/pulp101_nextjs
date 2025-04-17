'use client';
import React, { useState, useRef, useEffect } from 'react';

import ContractTesting from '@/components/ContractTesting';
import NDAForm from '../NDAForm/page';

const App: React.FC = () => {
    const [currentDocument, setCurrentDocument] = useState(0);
    const [buttonName, setButtonName] = useState("Next");

    const documents = [
        { id: 1, component: <ContractTesting /> },
        { id: 2, component: <NDAForm/> },
    ];

    const handleNext = () => {
        if (currentDocument < documents.length - 1) {
            setCurrentDocument(currentDocument + 1);
            if(currentDocument == documents.length - 2){
                setButtonName("Submit");
            }
        } else {
            alert("All documemnts are completed");
        }
    };
    return (
        <div className=''>
            <div className='flex flex-col items-center'>
                {documents[currentDocument].component}
                <div className='flex flex-row justify-end w-full px-4 m-5'>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleNext}>{buttonName}</button>
                </div>
            </div>

        </div>

    );
};
export default App;