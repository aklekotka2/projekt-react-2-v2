const apiNbp = (curr) =>
	fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${curr}/`).then(
		(response) => response.json()
	);

export { apiNbp };
