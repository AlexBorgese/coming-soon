import Image from "next/image";
import styles from "./page.module.css";
import GamesList from "@/components/game-list/games-list";

export default function Home() {
	return (
		<div className={styles.page}>
			<h1 className={styles.pageHeader}>Coming Soon!</h1>
			<main className={styles.main}>
				<GamesList />
			</main>
			<footer className={styles.footer}>
				<a
					href="https://api-docs.igdb.com/#getting-started"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/file.svg"
						alt="File icon"
						width={16}
						height={16}
					/>
					Made with IGDB
				</a>
			</footer>
		</div>
	);
}
