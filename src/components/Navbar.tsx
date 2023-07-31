import React from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { MenuBtn } from '../context/menuContext';
import Infinity from '../img/Infinity.png';
import InfinityDark from '../img/Infinity-dark.png';
import ThemeImg from './ThemeImg';

const Navbar: React.FC = () => {
	return (
		<div className='navbar bg-base-100 gap-2'>
			<div className='flex-none'>
				<input id='my-drawer' type='checkbox' className='drawer-toggle' />
				<MenuBtn className='btn btn-square btn-ghost drawer-button'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						className='inline-block w-5 h-5 stroke-current'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M4 6h16M4 12h16M4 18h16'></path>
					</svg>
				</MenuBtn>
			</div>
			<div className='flex-1'>
				<Link to={'/'} className='btn btn-ghost normal-case text-xl small-caps'>
					<ThemeImg light={Infinity} dark={InfinityDark} />
				</Link>
			</div>
			<div className='flex gap-2'>
				<button
					className='rounded-md p-1 h-6 w-6 ease-in-out transition-all flex justify-center items-center'
					data-set-theme='emerald'
					data-act-class='theme-selected'>
					<BsFillSunFill />
				</button>
				<button
					className='rounded-md p-1 h-6 w-6 ease-in-out transition-all flex justify-center items-center'
					data-set-theme='dark'
					data-act-class='theme-selected'>
					<BsFillMoonFill />
				</button>
			</div>
		</div>
	);
};

export default Navbar;
