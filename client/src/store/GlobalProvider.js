import React, { useEffect, useState } from 'react';
import {getDatasets} from "../api/api";

export const GlobalContext = React.createContext({});

const GlobalProvider = ({ children }) => {
	const [datasetList, setDatasetList] = useState([]);

	const getDatasetList = async () => {
		let body = await getDatasets(1, 999);
		setDatasetList(body?.data);
	};

	useEffect(() => {
		getDatasetList().then();
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				datasetList,
				setDatasetList,
				getDatasetList,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
