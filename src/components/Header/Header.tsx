// src/components/Header/Header.tsx
import React from 'react';

//Para que cada página defina o próptio titulo
interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <div className='bg-white shadow-md p-3'>
            <h1 className='font-poppins text-[12px] font-medium text-gray-500'>{title}</h1>
        </div>
    )
}

export default Header;