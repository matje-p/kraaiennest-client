import BackButton from "./BackButton";
import SettingsButton from "./SettingsButton";
import HomeButton from "./HomeButton";

interface SimpleHeaderProps {
  settings?: boolean;
}

const SimpleHeader = ({ settings = false }: SimpleHeaderProps) => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <BackButton />
        <div>
          {settings && <SettingsButton />}
          <HomeButton />
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
