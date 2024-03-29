import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import styles from "../styles/Game.module.css";
import NextImage from "next/image"; // Import the Image component with an alias

export default function Game() {
  const [userInput, setUserInput] = useState("");
  const [gameText, setGameText] = useState("Type a command to start playing!");
  const gameTextArea = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("/api/generateText", { userInput });
      setGameText(
        (prevText) =>
          `${prevText}\n\n> ${userInput}\n\n${response.data.aiResponse}`
      );
    } catch (error) {
      console.error("Error generating text:", error);
      setGameText(
        (prevText) =>
          `${prevText}\n\n> ${userInput}\n\nError generating response. Please try again.`
      );
    }

    setUserInput("");
  }

  useEffect(() => {
    if (gameTextArea.current) {
      gameTextArea.current.scrollTop = gameTextArea.current.scrollHeight;
    }
  }, [gameText]);

  return (
    <div className={styles.container}>
      <Head>
        <title>AI Text-based Adventure Game</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="An AI-powered text-based adventure game created with OpenAI."
        />
        <meta property="og:title" content="AI Text-based Adventure Game" />
        <meta
          property="og:description"
          content="An AI-powered text-based adventure game created with OpenAI."
        />
        <meta
          property="og:image"
          content="https://images.freeimages.com/images/large-previews/a9a/the-game-1287704.jpg"
        />
        <meta property="og:url" content="https://images.freeimages.com/images/large-previews/a9a/the-game-1287704.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Text-based Adventure Game" />
        <meta
          name="twitter:description"
          content="An AI-powered text-based adventure game created with OpenAI."
        />
        <meta
          name="twitter:image"
          content="https://images.freeimages.com/images/large-previews/a9a/the-game-1287704.jpg"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>GameGPT</h1>
        <h2 className={styles.subtitle}>AI text-based adventure game</h2>
        <div className={styles.gameArea}>
          <pre ref={gameTextArea} className={styles.gameText}>
            {gameText}
          </pre>
          <form onSubmit={handleSubmit} className={styles.commandForm}>
            <label className={styles.commandLabel}>Command:</label>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your command here"
              className={styles.commandInput}
            />
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Made With <span className={styles.heart}>&hearts;</span> in NYC by
          Daniel Merja{" "}
          <a
            href="https://twitter.com/danielmerja"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.twitterIcon}
          >
            <NextImage
              src="/twitter-icon.svg"
              alt="Twitter Icon"
              width={24}
              height={24}
            />
          </a>
        </p>
      </footer>
    </div>
  );
}
