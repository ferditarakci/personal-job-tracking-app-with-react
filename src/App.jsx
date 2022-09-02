import React from 'react'
import 'sweetalert2/src/sweetalert2.scss'
import './assets/scss/style.scss'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Job from './components/job/Index'

function App() {
	return (
		<React.Fragment>
			<Header />
			<Job />
			<Footer />
		</React.Fragment>
	)
}

export default App