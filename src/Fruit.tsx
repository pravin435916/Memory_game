import crd from "./assets/images/card.png";
import './custom.css'

interface FruitProps {
  fruit: { id: number; img: string };
  handleChoice: (fruit: { id: number; img: string }) => void;
  flipped: boolean;
}

export default function Fruit({ fruit, handleChoice, flipped }: FruitProps): JSX.Element {
  const handleClick = () => {
    handleChoice(fruit);
  };

  return (
    <div className={`card ${flipped ? "flipped" : ""}`} key={fruit.id}>
      <img className="front w-12 sm:w-36" src={fruit.img} alt="Card front" />
      <img onClick={handleClick} className="back w-12 sm:w-44" src={crd} alt="Card Back" />
    </div>
  );
}
