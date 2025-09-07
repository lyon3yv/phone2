import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";

export default function FlappyBird({ onBack }) {
  const canvasRef = useRef(null);
  const gameLoopRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("flappybird-highscore") || "0");
  });
  const [gameOver, setGameOver] = useState(false);

  // Game state
  const [bird, setBird] = useState({ x: 50, y: 200, velocity: 0 });
  const [pipes, setPipes] = useState([]);

  const CANVAS_WIDTH = 320;
  const CANVAS_HEIGHT = 400;
  const BIRD_SIZE = 20;
  const PIPE_WIDTH = 50;
  const PIPE_GAP = 120;
  const GRAVITY = 0.5;
  const JUMP_STRENGTH = -8;
  const PIPE_SPEED = 2;

  const jump = useCallback(() => {
    if (!gameOver) {
      setBird(prev => ({ ...prev, velocity: JUMP_STRENGTH }));
      if (!isPlaying) {
        setIsPlaying(true);
      }
    }
  }, [gameOver, isPlaying]);

  const resetGame = useCallback(() => {
    setBird({ x: 50, y: 200, velocity: 0 });
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(false);
  }, []);

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = () => {
      setBird(prev => {
        let newY = prev.y + prev.velocity;
        let newVelocity = prev.velocity + GRAVITY;

        // Check bounds
        if (newY < 0) {
          newY = 0;
          newVelocity = 0;
        }
        if (newY > CANVAS_HEIGHT - BIRD_SIZE) {
          setGameOver(true);
          setIsPlaying(false);
        }

        return { ...prev, y: newY, velocity: newVelocity };
      });

      setPipes(prev => {
        let newPipes = [...prev];

        // Move pipes
        newPipes = newPipes.map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }));

        // Remove off-screen pipes and add score
        newPipes = newPipes.filter(pipe => {
          if (pipe.x + PIPE_WIDTH < 0) {
            setScore(s => s + 1);
            return false;
          }
          return true;
        });

        // Add new pipe
        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < CANVAS_WIDTH - 200) {
          const topHeight = Math.random() * (CANVAS_HEIGHT - PIPE_GAP - 100) + 50;
          newPipes.push({
            x: CANVAS_WIDTH,
            topHeight,
            gap: PIPE_GAP,
          });
        }

        return newPipes;
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameOver]);

  // Collision detection
  useEffect(() => {
    if (!isPlaying) return;

    const checkCollision = () => {
      for (const pipe of pipes) {
        // Check if bird is in pipe's x range
        if (bird.x + BIRD_SIZE > pipe.x && bird.x < pipe.x + PIPE_WIDTH) {
          // Check if bird hits top or bottom pipe
          if (bird.y < pipe.topHeight || bird.y + BIRD_SIZE > pipe.topHeight + pipe.gap) {
            setGameOver(true);
            setIsPlaying(false);
            return;
          }
        }
      }
    };

    checkCollision();
  }, [bird, pipes, isPlaying]);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("flappybird-highscore", score.toString());
    }
  }, [score, highScore]);

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw pipes
    ctx.fillStyle = "#228B22";
    pipes.forEach(pipe => {
      // Top pipe
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
      // Bottom pipe
      ctx.fillRect(pipe.x, pipe.topHeight + pipe.gap, PIPE_WIDTH, CANVAS_HEIGHT - pipe.topHeight - pipe.gap);
    });

    // Draw bird
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(bird.x, bird.y, BIRD_SIZE, BIRD_SIZE);

    // Add simple bird details
    ctx.fillStyle = "#FF4500";
    ctx.fillRect(bird.x + 15, bird.y + 8, 5, 4); // Beak
    ctx.fillStyle = "#000000";
    ctx.fillRect(bird.x + 5, bird.y + 5, 3, 3); // Eye
  });

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-400 to-blue-600">
      {/* Header */}
      <div className="bg-yellow-500 border-b border-yellow-600 flex items-center justify-between p-4">
        <ArrowLeft
          data-testid="button-back"
          className="cursor-pointer text-white"
          onClick={onBack}
        />
        <h2 className="text-lg font-bold text-white">Flappy Bird</h2>
        <div className="w-6" />
      </div>

      {/* Game Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Score Display */}
        <div className="text-center mb-4">
          <div className="text-white text-xl font-bold">Score: {score}</div>
          <div className="text-yellow-300 text-sm">High Score: {highScore}</div>
        </div>

        {/* Game Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="border-2 border-white rounded-lg bg-sky-300 cursor-pointer"
            onClick={jump}
            data-testid="game-canvas"
          />

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
                <p className="text-lg mb-4">Score: {score}</p>
                {score === highScore && score > 0 && (
                  <p className="text-yellow-300 mb-4">🎉 New High Score! 🎉</p>
                )}
                <Button
                  onClick={resetGame}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  data-testid="button-restart"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              </div>
            </div>
          )}

          {/* Start Screen */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <div className="text-center text-white">
                <h3 className="text-xl font-bold mb-4">Tap to Start!</h3>
                <p className="text-sm mb-4">Tap the screen to make the bird fly</p>
                <Button
                  onClick={jump}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  data-testid="button-start"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Game
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="mt-4 text-center">
          <p className="text-white text-sm mb-2">Tap screen or button to fly!</p>
          <div className="flex gap-2 justify-center">
            {isPlaying && !gameOver && (
              <Button
                onClick={() => setIsPlaying(false)}
                className="bg-red-500 hover:bg-red-600 text-white"
                data-testid="button-pause"
              >
                <Pause className="w-4 h-4" />
              </Button>
            )}
            {!isPlaying && !gameOver && score > 0 && (
              <Button
                onClick={() => setIsPlaying(true)}
                className="bg-green-500 hover:bg-green-600 text-white"
                data-testid="button-resume"
              >
                <Play className="w-4 h-4" />
              </Button>
            )}
            <Button
              onClick={resetGame}
              className="bg-gray-500 hover:bg-gray-600 text-white"
              data-testid="button-reset"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
