import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
}

const icons = LucideIcons as unknown as Record<string, React.FC<{ className?: string; size?: number; color?: string }>>;

export default function Icon({ name, className, size = 24, color }: IconProps) {
  const LucideIcon = icons[name];
  if (!LucideIcon) {
    const Fallback = icons['HelpCircle'];
    return <Fallback className={className} size={size} color={color} />;
  }
  return <LucideIcon className={className} size={size} color={color} />;
}
