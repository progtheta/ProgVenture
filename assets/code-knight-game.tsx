import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sword, Shield, Book, Heart, Trophy, XCircle, Code, Sparkles } from 'lucide-react';

const CodeBlock = ({ code, language = 'c' }) => (
  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto relative group">
    <div className="absolute top-2 right-2 text-gray-500 text-xs">{language}</div>
    <pre className="whitespace-pre-wrap">{code}</pre>
    <Sparkles className="absolute bottom-2 right-2 w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
);

const Scene = ({ imagePath, children }) => (
  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-b from-blue-100 to-blue-200">
    <img 
      src={`/api/placeholder/800/400`} 
      alt="Scene illustration" 
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/20" />
    <div className="absolute inset-0 flex items-center justify-center">
      {children}
    </div>
  </div>
);

const CodeFragment = ({ collected }) => (
  <div className={`
    absolute top-4 right-4 
    w-12 h-12 
    bg-gradient-to-br from-purple-500 to-blue-500 
    rounded-lg shadow-lg 
    flex items-center justify-center
    transform transition-all duration-500
    ${collected ? 'scale-110 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100'}
  `}>
    <Code className="w-6 h-6 text-white" />
  </div>
);

const ParticleEffect = ({ active }) => {
  if (!active) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `particle-float-${i} 1s ease-out forwards`
          }}
        />
      ))}
    </div>
  );
};

const CodeKnightGame = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [gameState, setGameState] = useState('playing');
  const [isAnimating, setIsAnimating] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showParticles, setShowParticles] = useState(false);
  const [collectedFragment, setCollectedFragment] = useState(false);

const levels = [
  {
    title: "The Basic Gate",
    description: "You stand at the entrance of the great Binary Forest, where the first fragment of the Lost Code is hidden. The forest looms ahead, shrouded in shadows and flickering lights, as if the very trees are alive with data. An ancient, rune-covered stone gate blocks your way, humming with a strange energy. A soft voice echoes from the forest, 'Prove that you understand the essence of numbers, or be forever lost in the shadows.' You take a deep breath, feeling the weight of the quest ahead, and prepare to solve the first riddle.",
    question: "What is the correct way to declare an integer variable in C?",
    code: `// Choose the correct declaration:
    
1. int number;
2. variable number;
3. float number;
4. integer number;`,
    options: [
      "int number;",
      "variable number;",
      "float number;",
      "integer number;"
    ],
    correct: 0,
    icon: <Shield className="w-8 h-8 text-blue-500" />,
    sceneTitle: "Binary Forest Gate"
  },
  {
    title: "The Enchanted River of Syntax",
    description: "The path leads you to the edge of the Enchanted River, its waters shimmering like liquid code. A lone boat sways gently at the shore, tethered by a golden rope. It is said that only the worthy can command the river’s currents. You remember the tales of those who failed, left stranded on the shore, trapped forever in their confusion. A riddle appears in the air above the boat, 'Only those who respect the order of operations may proceed.' The river stirs, waiting for your answer.",
    question: "What is the result of this expression?",
    code: `int result = 5 + 3 * 2;
printf("%d", result);

// What will be printed?`,
    options: ["10", "16", "11", "13"],
    correct: 2,
    icon: <Book className="w-8 h-8 text-purple-500" />,
    sceneTitle: "Enchanted River"
  },
  {
    title: "The Debugger's Cave",
    description: "After crossing the river, you step into the mouth of a cave that seems to swallow the light around you. Inside, the air is cold, and you hear the low, growling murmur of a creature hidden in the darkness. The Debugger Troll, known to trick even the wisest of travelers, emerges from the shadows. 'You wish to pass?' he roars. 'Then prove your worth by understanding the nature of true and false!' His eyes glow, reflecting the uncertainty of your knowledge, and the cave walls seem to close in around you.",
    question: "What will this code snippet print?",
    code: `int x = 10;

if (x > 5) {
    printf("Success");
} else {
    printf("Failure");
}`,
    options: ["Success", "Failure", "Error", "Nothing"],
    correct: 0,
    icon: <Sword className="w-8 h-8 text-red-500" />,
    sceneTitle: "Debugger's Cave"
  },
  {
    title: "The Looping Bridge",
    description: "The path takes you to a swaying bridge suspended over a chasm of mist and darkness. Each step echoes, but you notice the bridge repeating movements, like an endless loop. An inscription on the first plank reads, 'Understand the pattern, and the bridge will carry you safely to the other side. Fail, and you will be lost in the loop forever.' The ground beneath quivers as you step forward, feeling the tension build with each answer you ponder.",
    question: "What will the following code print?",
    code: `for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}

// Output?`,
    options: ["0 1 2 3 4", "1 2 3 4 5", "0 1 2 3 4 5", "1 2 3 4"],
    correct: 0,
    icon: <Bridge className="w-8 h-8 text-green-500" />,
    sceneTitle: "Looping Bridge"
  },
  {
    title: "Array Cliff",
    description: "The mist clears, revealing a jagged cliff that drops sharply into the depths below. Stones float mysteriously in the air, each one etched with numbers, suspended like a perfectly ordered array. The only way across is to choose the correct stone, creating a path that leads to safety. One wrong step could send you plunging into the abyss. The whispers of the wind speak of indexing and positions—will you find the correct element in the array to proceed?",
    question: "What is the value of `numbers[2]` in the following array?",
    code: `int numbers[] = {2, 4, 6, 8, 10};`,
    options: ["2", "4", "6", "8"],
    correct: 2,
    icon: <Mountain className="w-8 h-8 text-gray-500" />,
    sceneTitle: "Array Cliff"
  },
  {
    title: "The String Meadow",
    description: "After the treacherous cliff, you step into a vast meadow bathed in the golden light of a setting sun. The air is warm, and strings of words float like petals on the breeze, forming messages and symbols. The meadow is known to reveal the truth of characters, but only if you understand the language hidden within each string. You catch a floating phrase, and it shapes into a question before your eyes. The ground seems solid, yet you sense that only the correct answer will keep you from sinking into illusion.",
    question: "What will this code snippet output?",
    code: `char greeting[] = "Hello";
printf("%c", greeting[1]);`,
    options: ["H", "e", "l", "o"],
    correct: 1,
    icon: <Flower className="w-8 h-8 text-pink-500" />,
    sceneTitle: "String Meadow"
  },
  {
    title: "The Conditional Crossing",
    description: "Ahead, a narrow bridge crosses a deep, fast-moving river. A frail old hermit stands in the middle, holding a lantern that flickers as if caught between realities. 'Many have tried to cross,' he says, 'but only those who truly understand the path of choices may pass unscathed.' The air crackles with tension as he presents a parchment, challenging your grasp of conditional logic. The wind picks up, urging you to make a choice, while the river roars below.",
    question: "What will the code print?",
    code: `int score = 85;

if (score >= 90) {
    printf("Excellent");
} else if (score >= 75) {
    printf("Good");
} else {
    printf("Needs Improvement");
}`,
    options: ["Excellent", "Good", "Needs Improvement", "Nothing"],
    correct: 1,
    icon: <Key className="w-8 h-8 text-yellow-500" />,
    sceneTitle: "Conditional Crossing"
  },
  {
    title: "The String Challenge of the Whispering Woods",
    description: "Deep within the heart of the Whispering Woods, the trees are said to hold the answers to riddles hidden in strings. Strange runes shimmer on the bark, and the trees seem to whisper your name, knowing your quest. As you step closer, a breeze swirls around you, bringing forth a string riddle that only the wise can unravel. The forest watches, its fate tied to the outcome of your answer.",
    question: "What will be the output of the following code?",
    code: `char word[] = "Magic";
printf("%s", word);`,
    options: ["M", "Magic", "cigam", "Error"],
    correct: 1,
    icon: <Leaf className="w-8 h-8 text-green-700" />,
    sceneTitle: "Whispering Woods"
  },
  {
    title: "The Loop Tower",
    description: "You stand before a tall, spiraling tower that seems to reach into the clouds. The stairs inside are endless, looping upon themselves like a never-ending cycle. A sign at the entrance warns, 'Those who do not understand the flow of loops will wander here forever.' Each step you take echoes like a countdown, the rhythm of iterations pounding in your ears. The walls seem to shift, awaiting your understanding of loops to guide you upward.",
    question: "How many times will this loop run?",
    code: `int count = 0;
while (count < 3) {
    printf("%d ", count);
    count++;
}

// Number of iterations?`,
    options: ["2", "3", "4", "Infinite"],
    correct: 1,
    icon: <Tower className="w-8 h-8 text-blue-600" />,
    sceneTitle: "Loop Tower"
  },
  {
    title: "Array Garden",
    description: "Your journey brings you to a lush, vibrant garden where flowers grow in perfectly arranged rows, just like arrays. The flowers are said to hold secrets, and only by choosing the correct bloom will you unlock the path forward. Each row pulses with a gentle glow, hinting at the order within. Choose carefully, for the wrong choice could cause the garden to entangle you

 forever, its vines wrapping around any who fail to understand the structure.",
    question: "What is the value of `flowers[3]`?",
    code: `char flowers[][10] = {"Rose", "Lily", "Tulip", "Daisy", "Sunflower"};`,
    options: ["Rose", "Lily", "Tulip", "Daisy"],
    correct: 3,
    icon: <Garden className="w-8 h-8 text-orange-500" />,
    sceneTitle: "Array Garden"
  }
];


Each description now carries more drama and suspense, enhancing the adventure feel while keeping the focus on programming basics.
  const handleAnswer = (optionIndex) => {
    setIsAnimating(true);
    setCollectedFragment(false);
    
    if (optionIndex === levels[currentLevel].correct) {
      setScore(score + 1);
      setFeedback('Correct! You found a fragment of the Lost Code!');
      setShowParticles(true);
      setCollectedFragment(true);
      
      setTimeout(() => {
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(currentLevel + 1);
        } else {
          setGameState('victory');
        }
        setIsAnimating(false);
        setFeedback('');
        setShowParticles(false);
      }, 2000);
    } else {
      setHealth(health - 1);
      setFeedback('Incorrect! Try again, brave Code Knight!');
      if (health <= 1) {
        setGameState('defeat');
      }
      setTimeout(() => {
        setIsAnimating(false);
        setFeedback('');
      }, 1500);
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setHealth(3);
    setGameState('playing');
    setFeedback('');
    setShowParticles(false);
    setCollectedFragment(false);
  };

  if (gameState === 'victory') {
    return (
      <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="text-center space-y-6">
          <Trophy className="w-20 h-20 mx-auto text-yellow-300 animate-bounce" />
          <h1 className="text-3xl font-bold">Victory!</h1>
          <p className="text-xl">
            Congratulations, brave Code Knight! You have restored the Lost Code and saved Binarya!
          </p>
          <div className="relative">
            <CodeBlock code="// The Lost Code has been restored!" />
            <ParticleEffect active={true} />
          </div>
          <p className="text-lg">Final Score: {score}/{levels.length}</p>
          <Button 
            onClick={resetGame}
            className="bg-white text-blue-600 hover:bg-blue-100"
          >
            Play Again
          </Button>
        </div>
      </Card>
    );
  }

  if (gameState === 'defeat') {
    return (
      <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-red-500 to-gray-800 text-white">
        <div className="text-center space-y-6">
          <XCircle className="w-20 h-20 mx-auto text-red-300 animate-pulse" />
          <h1 className="text-3xl font-bold">Game Over</h1>
          <p className="text-xl">
            Your journey ends here, but the Lost Code still awaits a worthy knight...
          </p>
          <CodeBlock 
            code="// Error: Knight needs more training
return GAME_OVER;" 
          />
          <p className="text-lg">Score: {score}/{levels.length}</p>
          <Button 
            onClick={resetGame}
            className="bg-white text-red-600 hover:bg-red-100"
          >
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <div className="space-y-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-bold">Level {currentLevel + 1}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>{score}</span>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <Heart 
                  key={i}
                  className={`w-5 h-5 transition-colors duration-300 ${
                    i < health ? 'text-red-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scene */}
        <Scene>
          <h2 className="text-3xl font-bold text-white text-center drop-shadow-lg">
            {levels[currentLevel].sceneTitle}
          </h2>
          <CodeFragment collected={collectedFragment} />
        </Scene>

        {/* Level Content */}
        <div className={`space-y-4 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
          <div className="flex items-center space-x-3">
            {levels[currentLevel].icon}
            <h2 className="text-2xl font-bold">{levels[currentLevel].title}</h2>
          </div>
          <p className="text-gray-600">{levels[currentLevel].description}</p>
          <CodeBlock code={levels[currentLevel].code} />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {levels[currentLevel].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full justify-start font-mono ${
                isAnimating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isAnimating}
            >
              {option}
            </Button>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`text-center p-4 rounded-lg ${
            feedback.includes('Correct') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {feedback}
          </div>
        )}

        {/* Particle Effect */}
        <ParticleEffect active={showParticles} />
      </div>
    </Card>
  );
};

export default CodeKnightGame;
