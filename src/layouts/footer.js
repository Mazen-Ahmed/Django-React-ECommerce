import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer className='h-auto pt-10 pb-3 pr-20 pl-20 text-gray-800 bg-white grid grid-flow-row grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-3 lg:grid-rows-1 gap-4  '>
                <div className='flex flex-col pr-10'>
                <span className='text-gray-800 font-sans  font-bold text-3xl w-full  '>E-Commerce</span>
                <p>It is a long established fact that a reader will be distracted by the readable </p>
                </div>
                <div>
                <span className='text-gray-800 font-sans  font-bold text-3xl w-3/4  '>Links</span>
                <ul>
                    <li className='font-bold'>Home</li>
                    <li className='font-bold'>Shop</li>
                    <li className='font-bold'>Contact</li>
                </ul>
                </div>
                <div className='flex flex-col pr-10'>
                <span className='text-gray-800 font-sans  font-bold text-3xl w-3/4 '>Support</span>
                <ul>
                    <li className='font-bold'>Frequantly asked questions</li>
                    <li className='font-bold'>Terms&Conditions</li>
                    <li className='font-bold'>Privacy policy</li>
                    <li className='font-bold'>Payment Issues</li>
                </ul>
                </div>
            </footer>
        )
    }
}
