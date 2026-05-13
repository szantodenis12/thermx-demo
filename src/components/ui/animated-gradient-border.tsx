import React from 'react';
import type { CSSProperties, ReactNode, HTMLAttributes } from 'react';

type AnimationMode = 'auto-rotate' | 'rotate-on-hover' | 'stop-rotate-on-hover';

interface BorderRotateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  className?: string;
 
  // Animation customization
  animationMode?: AnimationMode;
  animationSpeed?: number; // Duration in seconds
 
  // Color customization
  gradientColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  backgroundColor?: string;
 
  // Border customization
  borderWidth?: number;
  borderRadius?: number;
 
  // Container styling
  style?: CSSProperties;
}

const defaultGradientColors = {
  primary: '#ff4500', // thermal-orange
  secondary: '#00edff', // insulation-blue
  accent: '#ffffff'
};

const BorderRotate: React.FC<BorderRotateProps> = ({
  children,
  className = '',
  animationMode = 'auto-rotate',
  animationSpeed = 5,
  gradientColors = defaultGradientColors,
  backgroundColor = '#0a0a0a',
  borderWidth = 1,
  borderRadius = 20,
  style = {},
  ...props
}) => {
  // Get animation class based on mode
  const getAnimationClass = () => {
    switch (animationMode) {
      case 'auto-rotate':
        return 'gradient-border-auto';
      case 'rotate-on-hover':
        return 'gradient-border-hover';
      case 'stop-rotate-on-hover':
        return 'gradient-border-stop-hover';
      default:
        return '';
    }
  };
 
  const containerStyle: CSSProperties = {
    '--gradient-primary': gradientColors.primary,
    '--gradient-secondary': gradientColors.secondary,
    '--gradient-accent': gradientColors.accent,
    '--animation-duration': `${animationSpeed}s`,
    position: 'relative',
    padding: `${borderWidth}px`,
    borderRadius: `${borderRadius}px`,
    overflow: 'hidden',
    display: 'inline-block',
    width: '100%',
    ...style,
  } as CSSProperties;

  const gradientStyle: CSSProperties = {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    backgroundImage: `conic-gradient(
      from var(--gradient-angle, 0deg),
      ${gradientColors.primary} 0%,
      ${gradientColors.secondary} 37%,
      ${gradientColors.accent} 30%,
      ${gradientColors.secondary} 33%,
      ${gradientColors.primary} 40%,
      ${gradientColors.primary} 50%,
      ${gradientColors.secondary} 77%,
      ${gradientColors.accent} 80%,
      ${gradientColors.secondary} 83%,
      ${gradientColors.primary} 90%
    )`,
  } as CSSProperties;

  const contentStyle: CSSProperties = {
    position: 'relative',
    zIndex: 1,
    backgroundColor: backgroundColor,
    borderRadius: `${borderRadius - borderWidth}px`,
    width: '100%',
    height: '100%',
  };
 
  return (
    <div
      className="gradient-border-container relative overflow-hidden"
      style={containerStyle}
      {...props}
    >
      {/* The rotating gradient layer */}
      <div className={`gradient-border-animator absolute top-[-50%] left-[-50%] w-[200%] h-[200%] ${getAnimationClass()}`} style={gradientStyle} />
      
      {/* The actual content layer - applying user className here for padding/layout */}
      <div className={`gradient-border-content relative z-10 ${className}`} style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export { BorderRotate };
