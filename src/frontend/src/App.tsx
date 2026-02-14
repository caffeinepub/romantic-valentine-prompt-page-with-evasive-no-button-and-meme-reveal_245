import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { useEvasiveButton } from '@/hooks/useEvasiveButton';

export default function App() {
  const [answered, setAnswered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const buttonsAreaRef = useRef<HTMLDivElement>(null);

  const { position, handlers } = useEvasiveButton({
    containerRef: buttonsAreaRef,
    buttonRef: noButtonRef,
  });

  const handleYesClick = () => {
    setAnswered(true);
  };

  // URL-encode the exact filename "Kanni 14.PNG"
  const successImagePath = '/assets/generated/' + encodeURIComponent('Kanni 14.PNG');

  if (answered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-romantic-light via-romantic-lighter to-white p-4">
        <Card className="max-w-2xl w-full shadow-2xl border-romantic-border bg-white/95 backdrop-blur">
          <CardContent className="p-8 md:p-12 text-center space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Heart className="w-16 h-16 text-romantic-primary fill-romantic-primary animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-romantic-dark">
                Good choice ❤️
              </h1>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-romantic-primary/20">
              {imageError ? (
                <div className="w-full min-h-[300px] flex items-center justify-center bg-romantic-lighter/50 p-8">
                  <p className="text-romantic-dark/70 text-lg">
                    Image could not be loaded. Please refresh the page.
                  </p>
                </div>
              ) : (
                <img
                  src={successImagePath}
                  alt="Good choice"
                  className="w-full h-auto"
                  onError={() => setImageError(true)}
                  onLoad={() => setImageLoaded(true)}
                  style={{ display: imageLoaded || imageError ? 'block' : 'none' }}
                />
              )}
              {!imageLoaded && !imageError && (
                <div className="w-full min-h-[300px] flex items-center justify-center bg-romantic-lighter/50">
                  <div className="animate-pulse text-romantic-primary">
                    <Heart className="w-12 h-12 fill-romantic-primary" />
                  </div>
                </div>
              )}
            </div>

            <p className="text-lg md:text-xl text-romantic-dark/80 font-medium">
              I knew you'd make the right choice! 💕
            </p>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center text-sm text-romantic-dark/60">
          <p>
            © {new Date().getFullYear()} · Built with{' '}
            <Heart className="inline w-4 h-4 text-romantic-primary fill-romantic-primary" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'valentine-app'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-romantic-primary hover:text-romantic-accent transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-romantic-light via-romantic-lighter to-white p-4">
      <div className="max-w-2xl w-full">
        <Card className="shadow-2xl border-romantic-border bg-white/95 backdrop-blur">
          <CardContent className="p-8 md:p-12 text-center space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Heart className="w-20 h-20 text-romantic-primary fill-romantic-primary animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-romantic-dark leading-tight">
                Will you be kannettan's valentine
              </h1>
              <p className="text-lg md:text-xl text-romantic-dark/70">
                Choose wisely... 💕
              </p>
            </div>

            <div 
              ref={buttonsAreaRef}
              className="relative pt-4 min-h-[280px] flex flex-col items-center justify-start gap-6"
              style={{ touchAction: 'none' }}
            >
              <Button
                onClick={handleYesClick}
                size="lg"
                className="bg-romantic-primary hover:bg-romantic-accent text-white font-bold text-xl px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-10"
              >
                Yes! 💖
              </Button>

              <button
                ref={noButtonRef}
                {...handlers}
                className="bg-romantic-muted hover:bg-romantic-muted/80 text-romantic-dark font-bold text-xl px-12 py-6 rounded-full shadow-lg transition-all duration-200 absolute cursor-pointer"
                style={{
                  top: '80px',
                  left: '50%',
                  transform: `translate(calc(-50% + ${position.x}px), ${position.y}px)`,
                  transition: 'transform 0.3s ease-out',
                  touchAction: 'none',
                }}
              >
                No
              </button>
            </div>

            <p className="text-sm text-romantic-dark/50 italic pt-4">
              Hint: There's only one right answer 😉
            </p>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-8 text-center text-sm text-romantic-dark/60">
        <p>
          © {new Date().getFullYear()} · Built with{' '}
          <Heart className="inline w-4 h-4 text-romantic-primary fill-romantic-primary" /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : 'valentine-app'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-romantic-primary hover:text-romantic-accent transition-colors font-medium"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
