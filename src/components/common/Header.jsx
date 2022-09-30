import React from 'react'
import styles from './styles/header.module.scss'

const Header = () => {
	return (
		<header className={styles.wrapper}>
			<div className="container">
				<div className="row pt-4 pb-2">
					<div className="col-6">
						<h1 className={styles.logo}>
							<a href={`${process.env.PUBLIC_URL}/`}>LOGO</a>
						</h1>
					</div>
					<div className="col-6"></div>
				</div>
				<div className="border-bottom"></div>
			</div>
		</header>
	)
}

export default Header