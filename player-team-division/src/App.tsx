import { Delete, Edit } from '@mui/icons-material';
import { Button, Card, CardContent, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const App = () => {
  const [players, setPlayers] = useState<{ name: string; rating: number }[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [playerRating, setPlayerRating] = useState(1);
  const [teams, setTeams] = useState<{ teamA: { name: string; rating: number }[], teamB: { name: string; rating: number }[] }>({
    teamA: [],
    teamB: []
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddOrEditPlayer = () => {
    if (playerName.trim() && playerRating > 0 && playerRating <= 5) {
      if (editIndex !== null) {
        const updatedPlayers = [...players];
        updatedPlayers[editIndex] = { name: playerName, rating: playerRating };
        setPlayers(updatedPlayers);
        setEditIndex(null);
      } else {
        setPlayers([...players, { name: playerName, rating: playerRating }]);
      }
      setPlayerName('');
      setPlayerRating(1);
    }
  };
  const handleEditPlayer = (index: number) => {
    setPlayerName(players[index].name);
    setPlayerRating(players[index].rating);
    setEditIndex(index);
  };
  const handleDeletePlayer = (index: number) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);
  };

  const handleDivideTeams = () => {
    const sortedPlayers = [...players].sort((a, b) => b.rating - a.rating);
    let teamA: { name: string; rating: number }[] = [];
    let teamB: { name: string; rating: number }[] = [];
    let sumA = 0, sumB = 0;

    sortedPlayers.forEach(player => {
      if (sumA <= sumB) {
        teamA.push(player);
        sumA += player.rating;
      } else {
        teamB.push(player);
        sumB += player.rating;
      }
    });

    setTeams({ teamA, teamB });
  };

  const handleClearPlayers = () => {
    setPlayers([]);
    setTeams({ teamA: [], teamB: [] });
    setPlayerName('');
    setPlayerRating(1);
    setEditIndex(null);
  };

  const handleClearTeams = () => {
    setTeams({ teamA: [], teamB: [] });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
      <Typography variant="h4" className="mb-4">Player Team Divider</Typography>
      <Card style={{ padding: '16px', width: '100%', maxWidth: '400px', marginBottom: '16px' }}>
        <CardContent>
        <TextField
            label="Player Name"
            variant="outlined"
            fullWidth
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Rating (1-5)"
            type="number"
            variant="outlined"
            fullWidth
            value={playerRating}
            onChange={(e) => setPlayerRating(Number(e.target.value))}
            margin="normal"
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleAddOrEditPlayer}>
            {editIndex !== null ? "Update Player" : "Add Player"}
          </Button>
        </CardContent>
      </Card>

      <Card style={{ padding: '16px', width: '100%', maxWidth: '400px', marginBottom: '16px' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Players List</Typography>
          {players.length === 0 ? (
            <Typography>No players added yet.</Typography>
          ) : (
            players.map((player, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Typography>{player.name} - Rating: {player.rating}</Typography>
                <div>
                  <IconButton color="primary" onClick={() => handleEditPlayer(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeletePlayer(index)}>
                    <Delete />
                  </IconButton>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Button variant="contained" color="secondary" onClick={handleDivideTeams} style={{ marginBottom: '8px' }}>
        Divide into Teams
      </Button>
      <Button variant="outlined" color="error" onClick={handleClearPlayers} style={{ marginBottom: '8px' }}>
        Clear Players List
      </Button>
      <Button variant="outlined" color="warning" onClick={handleClearTeams}>
        Clear Teams
      </Button>

      {teams && (
        <div style={{ display: 'flex', gap: '16px' }}>
          <Card style={{ padding: '16px' }}>
            <CardContent>
              <Typography variant="h6">Team A</Typography>
              {teams.teamA.map((player, index) => (
                <Typography key={index}>{player.name}</Typography>
              ))}
            </CardContent>
          </Card>
          <Card style={{ padding: '16px' }}>
            <CardContent>
              <Typography variant="h6">Team B</Typography>
              {teams.teamB.map((player, index) => (
               <Typography key={index}>{player.name}</Typography>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default App;
