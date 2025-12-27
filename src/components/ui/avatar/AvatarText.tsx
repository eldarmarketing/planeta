import { getPlanetAvatar } from "../../../utils/planetAvatar";

interface AvatarTextProps {
  name: string;
  className?: string;
}

const AvatarText: React.FC<AvatarTextProps> = ({ name, className = "" }) => {
  // Get a consistent planet based on the name
  const planetSrc = getPlanetAvatar(name);

  return (
    <div
      className={`flex h-10 w-10 ${className} items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 p-1.5`}
    >
      <img src={planetSrc} alt={name} className="w-full h-full" />
    </div>
  );
};

export default AvatarText;
