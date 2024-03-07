import { useState, useEffect } from 'react';
import apple from "../assets/images/apple.svg";
import banana from "../assets/images/banana.svg";
import orange from "../assets/images/Orange.svg";
import bg from "../assets/images/bg.png";
import watermelon from "../assets/images/watermelon.webp";
import cherry from "../assets/images/cherry.webp";
import pine from "../assets/images/pine.webp";
import Fruit from '../Fruit';
import arr from '../assets/images/arr.svg'
import msg from '../assets/images/msg.svg'
import {Link} from "react-router-dom"
import '../custom.css'
interface FruitType {
  img: string;
  id: number;
  matched: boolean;
}

function Play(): JSX.Element {
  const [fruits, setFruits] = useState<FruitType[]>([]);
  const [one, setOne] = useState<FruitType | null>(null);
  const [two, setTwo] = useState<FruitType | null>(null);
  const [score, setScore] = useState<number>(0);
  const [turn, setTurn] = useState<number>(0);

  const fruitsImages: FruitType[] = [
    { img: apple, id: 1, matched: false },
    { img: banana, id: 2, matched: false },
    { img: pine, id: 3, matched: false },
    { img: orange, id: 4, matched: false },
    { img: cherry, id: 5, matched: false },
    { img: watermelon, id: 6, matched: false },
  ];

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = (): void => {
    const shuffled: FruitType[] = [...fruitsImages, ...fruitsImages]
      .sort(() => Math.random() - 0.5)
      .map((fruit) => ({ ...fruit, id: Math.random() }));

    setFruits(shuffled);
  };

  const handleChoice = (card: FruitType): void => {
    setTurn(turn + 0.5);
    if (!one) {
      setOne(card);
    } else if (!two) {
      setTwo(card);
    }
  };

  useEffect(() => {
    if (one && two) {
      if (one.img === two.img) {
        setScore(score + 10);
        setFruits((prevFruits) =>
          prevFruits.map((item) =>
            item.img === one.img ? { ...item, matched: true } : item
          )
        );
      }
      setTimeout(() => {
        setOne(null);
        setTwo(null);
      }, 500);
    }
  }, [one, two]);
  const resetGame = (): void => {
    setFruits([]);
    setOne(null);
    setTwo(null);
    setScore(0);
    setTurn(0);
    shuffleCards();
  };
  const checkScore = () => {
    alert(`Your current score is: ${score}/60 in ${Math.floor(turn)}-Turn`);
  };
  return (
    <>
      <div className='w-full h-screen flex justify-center items-center overflow-hidden'>
      <img className='absolute top-0 object-cover bg-center w-full h-[100rem] sm:h-full' src={bg} alt="" />
      <div className='absolute flex flex-col gap-2 top-4 right-8 text-black font-bold'>
        <span>Score: {score}/60</span>
        <span>{Math.floor(turn)} - turn</span>
      </div>
      <div className="absolute top-16 mx-auto w-44 sm:w-[16rem] flex justify-center items-center">
        <span className="text-[#11AEC6] font-bold uppercase text-xl sm:text-2xl z-10">
          select a card !
        </span>
        <img className="absolute w-[30rem]" src={msg} alt="" />
      </div>
      <Link to="/"><img className='absolute w-16 sm:w-24 top-4 left-4' src={arr} alt="" /></Link>
        <div className='w-full sm:w-[90vw] flex flex-wrap sm:gap-1 mt-20 gap-0'>
          {fruits.map((fruit) => (
            <Fruit
            fruit={fruit}
            key={fruit.id}
            handleChoice={handleChoice}
            flipped={fruit === one || fruit === two || fruit.matched}
            />
          ))}
        </div>
        <div>
        <button className="button absolute bottom-8 left-14 text-white py-2 px-6 rounded-lg" onClick={resetGame}>Reset Game</button>
        <button className="button absolute bottom-8 right-14 text-white py-2 px-6 rounded-lg" onClick={checkScore}>check Score</button>
        </div>
      </div>
    </>
  );
}

export default Play;
