import React from 'react';

const dashboard = () => {
    return (
        <div className='bg-gray-100'>
            <div className='w-screen p-2 h-screen flex-row flex '>
                <div className='rounded bg-white shadow-md w-80 flex flex-col items-start gap-2 p-4'>
                    <div className='flex flex-row gap-1'>
                        <span className='text-xl'><ion-icon name="cart-sharp"></ion-icon></span>
                        My Cart
                    </div>
                    <hr className='border-gray-200 border w-full'></hr>
                    <div className='w-full'>
                        <ul className='flex flex-col gap-3 w-full'>
                            <li className='py-1 hover:bg-gray-800 rounded w-full hover:text-white ps-2 cursor-pointer flex items-center gap-1'><ion-icon name="pie-chart-outline"></ion-icon>Dashboard</li>
                            <li className='py-1 hover:bg-gray-800 rounded w-full hover:text-white ps-2 cursor-pointer flex items-center gap-1'><ion-icon name="people-outline"></ion-icon>Accounts</li>
                            <ul className='indent-4'>
                                <li>Pending</li>
                                <li>Active</li>
                                <li>Inactive</li>
                            </ul>
                        </ul>
                    </div>
                </div>
                <div className='p-4 w-full'>
                    <div className='flex w-full flex-row justify-between '>
                        <div>Pages / Dashbord</div>
                        <div className='flex flex-row items-center gap-4'>
                            <input type='search' placeholder='Type here..' className='text-sm h-10 w-60 ps-2 bg-gray-100 border border-gray-300 rounded'></input>
                            <div className='text-xl text-gray-500'><ion-icon name="settings-outline"></ion-icon></div>
                            <div className='text-xl text-gray-500'><ion-icon name="notifications-outline"></ion-icon></div>
                            <div className='text-xl text-gray-500'><ion-icon name="person-circle-outline"></ion-icon></div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default dashboard;