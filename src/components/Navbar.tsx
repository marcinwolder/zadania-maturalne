import React from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { MenuBtn } from '../context/menuContext';
import Infinity from '../img/Infinity.png';
import InfinityDark from '../img/Infinity-dark.png';
import ThemeImg from './ThemeImg';
import { useWindowScroll } from '@mantine/hooks';
import styled from 'styled-components';
import _ from 'lodash';
import AuthComp from './AuthComp';

const NavbarDiv = styled.div.attrs(() => {
	const [scroll] = useWindowScroll();
	return {
		style: {
			marginInline: `${_.clamp(
				scroll.y / (window.innerHeight * 1.08),
				0,
				0.5
			).toFixed(2)}rem`,
			filter: `drop-shadow(0 0.2rem 0.2rem hsla(var(--b3) / ${_.clamp(
				scroll.y / (window.innerHeight * 0.7),
				0,
				1
			).toFixed(2)}))`,
		},
	};
})``;

// TODO: Change navbar layout on mobile

const Navbar: React.FC = () => {
	const [scroll, scrollTo] = useWindowScroll();
	scroll;
	return (
		<NavbarDiv className='sticky mt-1 top-0 z-10'>
			<div className='navbar bg-base-100 gap-2 rounded-b-xl'>
				<div className='flex-none'>
					<input id='my-drawer' type='checkbox' className='drawer-toggle' />
					<MenuBtn className='btn btn-square btn-ghost drawer-button'>
						<svg
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
					<Link
						to={'/'}
						onClick={() => {
							scrollTo({ y: 0 });
						}}
						className='btn btn-ghost normal-case text-xl small-caps'>
						<ThemeImg
							className='h-10'
							options={{
								dark: Infinity,
								halloween: Infinity,
								emerald: InfinityDark,
								valentine: InfinityDark,
								default: Infinity,
							}}
						/>
					</Link>
				</div>
				<AuthComp />
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
		</NavbarDiv>
	);
};

export default Navbar;
