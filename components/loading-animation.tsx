import { useState, useEffect } from 'react';

const phrases = [
  'we build future',
  'we with our own idea',
  'we build sass products',
  'we work with web 3.0',
];

const LoadingAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const hasAnimationPlayed = sessionStorage.getItem('hasAnimationPlayed');

    if (hasAnimationPlayed) {
      setShowAnimation(false);
      return;
    }

    const animationTimeout = setTimeout(() => {
      setShowAnimation(false);
      sessionStorage.setItem('hasAnimationPlayed', 'true');
      window.location.href = '/'; // Redirect to home page
    }, 4000);

    const phraseInterval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 1000);

    return () => {
      clearTimeout(animationTimeout);
      clearInterval(phraseInterval);
    };
  }, []);

  useEffect(() => {
    if (showAnimation) {
      let i = 0;
      setTypedText('');
      const typingInterval = setInterval(() => {
        setTypedText(phrases[currentPhraseIndex].substring(0, i));
        i++;
        if (i > phrases[currentPhraseIndex].length) {
          clearInterval(typingInterval);
        }
      }, 50);
      return () => clearInterval(typingInterval);
    }
  }, [currentPhraseIndex, showAnimation]);

  if (!showAnimation) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-white text-2xl md:text-4xl font-mono orbitron neon-text">
        <span className="typing-effect">{typedText}</span>
        <span className="caret">|</span>
      </div>
    </div>
  );
};

export default LoadingAnimation;
