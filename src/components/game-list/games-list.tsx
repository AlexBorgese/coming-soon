"use client";
import { useEffect, useState } from "react";
import game from "@/api/get-games";
import GameTile from "@/components/game-tile/game-tile";
import styles from "./game-list.module.css";

interface Game {
	id: number;
	name: string;
	first_release_date: number;
	cover_image_url: string;
}

const GamesList = () => {
	const [gamesData, setGamesData] = useState<Game[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	console.log(isLoading);
	useEffect(() => {
		const getGameDataResponse = async () => {
			const gamesResponse = await game.getGames();
			if (gamesResponse) {
				setGamesData(gamesResponse);
				setIsLoading(false);
			}
		};
		getGameDataResponse();
	}, [isLoading]);

	if (isLoading) {
		return (
			<div className={styles.gameList}>
				{[...Array(10)].map((_, index) => (
					<div key={index} className={styles.gameTileSkeleton}>
						<div className={styles.skeletonImage}></div>
						<div>
							<div className={styles.skeletonText}></div>
							<div className={styles.skeletonText}></div>
						</div>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className={styles.gameList}>
			{gamesData.map((game) => (
				<GameTile key={game.id} {...game} />
			))}
		</div>
	);
};

export default GamesList;
