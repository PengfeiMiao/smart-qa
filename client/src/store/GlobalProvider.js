import React, { useEffect, useState } from 'react';
import {getDatasets} from "../api/api";

export const GlobalContext = React.createContext({});

const GlobalProvider = ({ children }) => {
	const [datesetList, setDatesetList] = useState(false);

	useEffect(() => {
		getDatasets(1, 999).then(async res => {
			let body = await res.json();
			setDatesetList(body);
		});
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				datesetList,
				setDatesetList,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
