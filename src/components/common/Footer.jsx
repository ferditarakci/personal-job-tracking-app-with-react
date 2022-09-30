import React from 'react'
import styles from './styles/footer.module.scss'
import Package from '../../../package.json'

const Footer = () => {
	return (
		<footer className={styles.wrapper}>
			<div className="container">
				<div className="row">
					<div className="col-6">
						<div className={styles.repository}>
							<a href={`https://github.com/ferditarakci/${Package.name}`} target="_blank" rel="noreferrer">
								<i className="fa-brands fa-git"></i>repository
							</a>
						</div>
					</div>
					<div className="col-6">
						<div className={styles.copyright}>
							© 2022 Ferdi Tarakcı
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer