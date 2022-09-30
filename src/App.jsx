import React from 'react'
import 'sweetalert2/src/sweetalert2.scss'
import './assets/scss/style.scss'
import { PrioritiesProvider } from './contexts/PrioritiesContext'
import { JobProvider } from './contexts/JobContext'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Job from './components/job/Index'

function App() {
	return (
		<PrioritiesProvider>
			<JobProvider>
				<Header />
				<Job />
				<Footer />
			</JobProvider>
		</PrioritiesProvider>
	)
}

export default App