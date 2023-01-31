import { useState } from "react";
import { apiNbp } from "../Services/fetchNBP";
import AmountArea from "./AmountArea";
import CurrencyArea from "./CurrencyArea";
import Loader from "./Loader";

const Main = () => {
	const [isErr, setIsErr] = useState("");
	const [isLoader, setIsLoader] = useState(false);
	const [currencyVal, setCurrencyVal] = useState("EUR");

	const onAcceptCurrency = (value) => {
		setCurrencyVal(value);
	};

	const [amountVal, setAmountVal] = useState(0);

	const onAcceptAmount = (value) => {
		if (value > 0) {
			setAmountVal(value);
		} else {
			setAmountVal(0);
		}
	};

	function count(currency) {
		setExchangeValue((currency * amountVal).toFixed(2));
	}

	const [exchangeValue, setExchangeValue] = useState("");
	let errMSg;
	function exchange(e) {
		e.preventDefault();

		if (amountVal > 0) {
			setIsLoader(true);

			apiNbp(currencyVal)
				.then((data) => {
					count(data.rates[0].mid);
				})
				.catch((error) => {
					setIsErr(error);
					errMSg = error;
				})
				.finally(setIsLoader(false));
		} else {
			setExchangeValue(0);
		}
	}

	return (
		<>
			<main>
				<div className="pos-center">
					<section className="changeCurrecy">
						<form action="" onSubmit={exchange}>
							<AmountArea
								onAcceptAmount={onAcceptAmount}
							></AmountArea>
							<CurrencyArea
								onAcceptCurrency={onAcceptCurrency}
								currency={currencyVal}
							></CurrencyArea>
							<button type="submit" id="getCurrencies">
								Przelicz
							</button>
						</form>
						<h2 id="result">
							to jest: <span>{exchangeValue}</span> PLN
						</h2>
					</section>
					<div className="api-err">
						{isErr ? "Wystąpił błąd:" + { errMSg } : ""}
					</div>
				</div>
			</main>
			<Loader
				classLoader={
					isLoader
						? "loader test-true"
						: "loader invisible test-false"
				}
			></Loader>
		</>
	);
};

export default Main;
