import React, { useState } from "react";
import style from "./game-tile.module.css";
import Image from "next/image";

interface IGame {
	id: number;
	name: string;
	first_release_date: number;
	cover_image_url: string;
	summary: string;
}

const convertUnixToDate = (unixTimestamp: number): string => {
	const date = new Date(unixTimestamp * 1000);
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	return `${day}/${month}`;
};

const daysUntilRelease = (releaseDateUnix: number): number => {
	const currentDate = new Date();
	const releaseDate = new Date(releaseDateUnix * 1000);

	const timeDifference = releaseDate.getTime() - currentDate.getTime();

	const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));

	return daysLeft;
};

const GameTile = (game: IGame) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleSummary = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className={style.gameTile}>
			<h2 className={style.gameHeader}>{game.name}</h2>
			{game.cover_image_url && (
				<Image sizes="100vw" fill src={game.cover_image_url} alt={game.name} />
			)}
			<span>
				<p
					className={`${style.gameSummary} ${isExpanded ? style.expanded : ""}`}
				>
					{game.summary}
				</p>
				<button className={style.showMoreButton} onClick={toggleSummary}>
					{isExpanded ? "Show less" : "Show more"}
				</button>
			</span>

			<div className={style.dateContent}>
				<p className={style.gameDate}>
					{convertUnixToDate(game.first_release_date)}
				</p>
				<p>{`${daysUntilRelease(
					game.first_release_date
				)} days until release!`}</p>
			</div>
		</div>
	);
};

export default GameTile;
