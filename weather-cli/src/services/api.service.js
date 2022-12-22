import axios from "axios";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

export const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case "01":
			return "☀️";
		case "02":
			return "🌤️";
		case "03":
			return "☁️";
		case "04":
			return "☁️";
		case "09":
			return "🌧️";
		case "10":
			return "🌦️";
		case "11":
			return "🌩️";
		case "13":
			return "❄️";
		case "50":
			return "🌫️";
	}
};

export const getWeather = async (city) => {
	const token =
		process.env.WEATHER_TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));

	if (!token) {
		throw new Error(
			"Не задан ключ API, задайте его через команду -t [API_KEY]"
		);
	}

	const { data } = await axios.get(
		"https://api.openweathermap.org/data/2.5/weather",
		{
			params: {
				q: city,
				appid: token,
				lang: "uk",
				units: "metric",
			},
		}
	);

	return data;
};

// 305801f16c8d63c09b55e7bdefc4e2df
