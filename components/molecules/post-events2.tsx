import React, { useCallback, useRef } from 'react';
import axios from 'axios';
import { thumbnail } from './thumbnail';

export const PostEvents2: React.FC = () => {
	const zipcodeRef = useRef<HTMLInputElement>(null);
	const addressRef = useRef<HTMLInputElement>(null);
	const submitHandler = useCallback((e) => {
		e.preventDefault();
		if (zipcodeRef.current?.value === '') return;
		axios
			.get('https://api.zipaddress.net/', {
				params: { zipcode: zipcodeRef.current.value },
			})
			.then((response) => {
				if (addressRef.current !== null)
					addressRef.current.value = response.data.data.address;
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<form onSubmit={submitHandler}>
			<input type="text" placeholder="郵便番号" ref={zipcodeRef} />
			<button>get</button>
			<br />
			<input type="text" readOnly="readonly" ref={addressRef} />
		</form>
	);
};
