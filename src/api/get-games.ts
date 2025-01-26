import axios from "axios";

const game = {
	getGames: async () => {
		try {
			const gameResponse = await axios.get("/api/igdb");

			const games = await gameResponse.data;
			return games;
		} catch (e) {
			console.log(e);
		}
	},
};

export default game;
