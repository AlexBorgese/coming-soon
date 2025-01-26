import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_URL = "https://api.igdb.com/v4/games";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const tokenResponse = await axios.post(
			"https://id.twitch.tv/oauth2/token",
			null,
			{
				params: {
					client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
					client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
					grant_type: "client_credentials",
				},
			}
		);

		const accessToken = tokenResponse.data.access_token;

		const currentDateUnix = Math.floor(Date.now() / 1000); // Current date in Unix timestamp

		const query = `fields name, first_release_date, hypes, cover, summary;
			where first_release_date > ${currentDateUnix} & hypes > 10;
			sort first_release_date asc;
			limit 10;
        `;

		const response = await axios.post(API_URL, query, {
			headers: {
				"Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
				Authorization: `Bearer ${accessToken}`,
			},
		});
		console.log(response.data);
		res.status(200).json(response.data);
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.error("Error:", error.response?.data || error.message);
			res.status(500).json({ error: "Failed to fetch games" });
		} else {
			console.error("Unexpected error:", error);
			res.status(500).json({ error: "Unexpected error occurred" });
		}
	}
}
