import crd from "./assets/images/card.png";
interface FruitType {
    img: string;
    id: number;
    matched: boolean;
  }
interface FruitProps {
  fruit: { id: number; img: string };
  handleChoice: (fruit: FruitType) => void;
  flipped: boolean;
}

export default function Fruit({ fruit, handleChoice, flipped }: FruitProps): JSX.Element {
  const handleClick = () => {
    handleChoice(fruit as FruitType); // Explicitly cast fruit to FruitType
  };

  return (
    <div className={`card ${flipped ? "flipped" : ""}`} key={fruit.id}>
      <img className="front w-12 sm:w-36" src={fruit.img} alt="Card front" />
      <img onClick={handleClick} className="back w-12 sm:w-44" src={crd} alt="Card Back" />
    </div>
  );
}
