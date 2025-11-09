// src/pages/Sair.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function Sair() {
    const navigate = useNavigate();
    
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/dashboard');
        }, 2000);
        
        return () => clearTimeout(timer);
        
    }, [navigate]);

    return (
        <div className="p-8">
            <div className="max-w-md mx-auto mt-20 text-center">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-12">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Até logo!</h1>
                    <p className="text-gray-600">Você será redirecionado...</p>
                </div>
            </div>
        </div>
    );
}