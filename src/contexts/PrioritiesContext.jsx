import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const PrioritiesContext = createContext()

const PrioritiesProvider = ({ children }) => {

	const [priorities, setPriorities] = useState([])

	const getPriorities = async () => {
		try {
			await axios.get(`${process.env.REACT_APP_API_URL}/priorities.json`)
				.then(response => {
					setPriorities(response.data)
				})
				.catch(error => {
					console.error('getPriorities', error)
				})
		}
		catch (error) {
			console.error('getPriorities', error)
		}
	}

	useEffect(() => {
		getPriorities()
	}, [])

	const values = {
		priorities,
		setPriorities
	}

	return (
		<PrioritiesContext.Provider value={values}>
			{children}
		</PrioritiesContext.Provider>
	)
}

export { PrioritiesProvider }
export default PrioritiesContext