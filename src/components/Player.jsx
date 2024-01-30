import { useState } from "react";
export default function Player({ name, symbol, isActive, nameChange }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setEditing] = useState(false);
  const handleEditing = () => {
    setEditing((editing) => !editing);
    if (isEditing) {
      nameChange(symbol, playerName);
    }
  };
  const handleChange = (e) => {
    setPlayerName(e.target.value);
  };
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            onChange={handleChange}
          />
        ) : (
          <span className="player-name"> {playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>

      <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
