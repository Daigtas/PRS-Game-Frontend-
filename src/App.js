import React, { useEffect, useState, useCallback } from 'react';
import Main from './components/Main';
import './styles/main.css';
import API_URL from './config';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [gameState, setGameState] = useState({
    playerChoice: null,
    computerChoice: null,
    gameCount: 0,
    result: 'VS',
    history: [],
    scores: { zaidejas: 0, pc: 0 }
  });
  const loadFromLocalStorage = useCallback(() => {
    try {
      const storedHistory = localStorage.getItem('istorija');
      const storedScores = localStorage.getItem('taskai');

      if (storedHistory && storedScores) {
        const historyData = JSON.parse(storedHistory);
        const scoresData = JSON.parse(storedScores);
        
        setGameState(prevState => ({
          ...prevState,
          gameCount: historyData.length > 0 ? historyData[historyData.length - 1].zaidimas : 0,
          history: historyData,
          scores: {
            zaidejas: scoresData.zaidejas || 0,
            pc: scoresData.pc || 0
          },
          playerChoice: null,
          computerChoice: null,
          result: 'VS'
        }));
      }
    } catch (error) {
      console.error('LocalStorage Error:', error);
    }
  }, []);

  const syncLocalStorageToApi = useCallback(async () => {
    if (!currentUser || !currentUser.id) return;
    
    try {
      const storedHistory = localStorage.getItem('istorija');
      if (storedHistory) {
        const historyData = JSON.parse(storedHistory);
        
        const batchSize = 10;
        for (let i = 0; i < historyData.length; i += batchSize) {
          const batch = historyData.slice(i, i + batchSize);
          
          await fetch(`${API_URL}/game_history/batch`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${currentUser.token}`
            },
            body: JSON.stringify({
              user_id: currentUser.id,
              games: batch.map(item => ({
                zaidimas: item.zaidimas,
                zaidejas: item.zaidejas,
                pc: item.pc,
                laimetojas: item.laimetojas
              }))
            }),
          });
        }        const storedScores = localStorage.getItem('taskai');
        if (storedScores) {
          const scoresData = JSON.parse(storedScores);
          const userScore = scoresData.zaidejas || 0;
          
          if (userScore > (currentUser.highscore || 0)) {            await fetch(`${API_URL}/update_highscore`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`
              },
              credentials: 'include',
              body: JSON.stringify({
                user_id: currentUser.id,
                highscore: userScore
              }),
            });
            
            setCurrentUser(prev => ({
              ...prev,
              highscore: userScore
            }));
          }
        }

        localStorage.removeItem('istorija');
        localStorage.removeItem('taskai');
      }
    } catch (error) {
      console.error('Sync Error:', error);
    }
  }, [currentUser]);

  const fetchUserGameData = useCallback(async () => {
    if (!currentUser || !currentUser.id || !currentUser.token) {
      return;
    }
    
    if (!window.lastGameDataFetch) {
      window.lastGameDataFetch = {};
    }
    
    const now = Date.now();
    const userId = currentUser.id;
    const lastFetch = window.lastGameDataFetch[userId] || 0;
    
    if (now - lastFetch < 300000 && window.userDataLoaded) {
      return;
    }
    
    try {
      window.lastGameDataFetch[userId] = now;
        const historyResponse = await fetch(`${API_URL}/game_history/${userId}`, {
        headers: {
          'Authorization': `Bearer ${currentUser.token}`
        },
        credentials: 'include'
      });
      
      if (historyResponse.ok) {
        const historyData = await historyResponse.json();        const localHistory = JSON.parse(localStorage.getItem('istorija')) || [];
        const localScores = JSON.parse(localStorage.getItem('taskai')) || { zaidejas: 0, pc: 0 };
        
        if (historyData.gameHistory && historyData.gameHistory.length > localHistory.length) {
          setGameState(prev => ({
            ...prev,
            history: historyData.gameHistory,
            scores: historyData.scores || localScores
          }));
          
          localStorage.setItem('istorija', JSON.stringify(historyData.gameHistory));
          localStorage.setItem('taskai', JSON.stringify(historyData.scores || localScores));
        } else if (localHistory.length > 0) {
          await syncLocalStorageToApi();
        }
        
        window.userDataLoaded = true;
      }
    } catch (error) {
      console.error('Error fetching user game data:', error);
    }
  }, [currentUser, syncLocalStorageToApi]);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      fetchUserGameData();
    } else {
      loadFromLocalStorage();
    }
  }, [currentUser, fetchUserGameData, loadFromLocalStorage]);

  const updatePlayerChoice = (choice) => {
    setGameState(prevState => ({
      ...prevState,
      playerChoice: choice,
      result: 'VS'
    }));
  };
  const playGame = () => {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    const winner = determineWinner(gameState.playerChoice, computerChoice);
    const newGameCount = gameState.gameCount + 1;
    
    const newScores = { ...gameState.scores };
    if (winner === 'zaidejas') {
      newScores.zaidejas += 1;
    } else if (winner === 'pc') {
      newScores.pc += 1;
    }

    const historyItem = {
      zaidimas: newGameCount,
      zaidejas: gameState.playerChoice,
      pc: computerChoice,
      laimetojas: winner
    };

    const newHistory = [...gameState.history, historyItem];
    
    setGameState({
      ...gameState,
      computerChoice,
      gameCount: newGameCount,
      result: winner,
      history: newHistory,
      scores: newScores
    });
    
    localStorage.setItem('istorija', JSON.stringify(newHistory));
    localStorage.setItem('taskai', JSON.stringify(newScores));
    const currentScore = newScores.zaidejas;
    if (currentUser && currentUser.id && currentScore > (currentUser.highscore || 0)) {
      setCurrentUser(prev => ({
        ...prev,
        highscore: currentScore
      }));
        fetch(`${API_URL}/update_highscore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          user_id: currentUser.id,
          highscore: currentScore
        })
      })
      .then(() => console.log('Highscore updated immediately to:', currentScore))
      .catch(error => console.error('Failed to update highscore immediately:', error));
    }

    if (currentUser && currentUser.id) {
      if (!window.pendingGameUpdates) {
        window.pendingGameUpdates = [];
      }
      window.pendingGameUpdates.push(historyItem);
      
      if (window.apiUpdateTimeout) {
        clearTimeout(window.apiUpdateTimeout);
      }
      
      window.apiUpdateTimeout = setTimeout(async () => {
        try {
          if (window.pendingGameUpdates && window.pendingGameUpdates.length > 0) {
            const updates = [...window.pendingGameUpdates];
            window.pendingGameUpdates = [];              await fetch(`${API_URL}/game_history/batch`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`
              },
              credentials: 'include',
              body: JSON.stringify({
                user_id: currentUser.id,
                games: updates
              })
            });
            
            const currentScore = newScores.zaidejas;            if (currentScore > (currentUser.highscore || 0)) {              await fetch(`${API_URL}/update_highscore`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${currentUser.token}`
                },
                credentials: 'include',
                body: JSON.stringify({
                  user_id: currentUser.id,
                  highscore: currentScore
                })
              });
              
              setCurrentUser(prev => ({
                ...prev,
                highscore: currentScore
              }));
              
              console.log('Highscore updated to:', currentScore);
            }
          }
        } catch (error) {
          console.error('Failed to send game data to API:', error);
        }
      }, 1000);
    }
  };

  const resetGame = async () => {
    setGameState({
      playerChoice: null,
      computerChoice: null,
      gameCount: 0,
      result: 'VS',
      history: [],
      scores: { zaidejas: 0, pc: 0 }
    });

    localStorage.removeItem('istorija');
    localStorage.removeItem('taskai');
    
    if (currentUser && currentUser.id) {

      fetchUserGameData();
    }
  };

  const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
      return 'tie';
    }
    
    if (
      (playerChoice === 'rock' && computerChoice === 'scissors') ||
      (playerChoice === 'paper' && computerChoice === 'rock') ||
      (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
      return 'zaidejas';
    }
    
    return 'pc';
  };  const handleLogin = async (user) => {
    console.log('User logging in with data:', user);
    setCurrentUser(user);
    await syncLocalStorageToApi();
    
    try {      const response = await fetch(`${API_URL}/user/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        const userData = await response.json();
        setCurrentUser(prev => ({
          ...prev,
          highscore: userData.highscore || 0
        }));
      }
    } catch (error) {
      console.error('Error fetching updated user data:', error);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    loadFromLocalStorage();
  };

  return (
    <div className="app">
      <Main 
        gameState={gameState}
        updatePlayerChoice={updatePlayerChoice}
        playGame={playGame}
        resetGame={resetGame}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;
