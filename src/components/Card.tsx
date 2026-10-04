import { FC } from "react";

interface ICard {
  id: string;
  lastFour: string;
  holderName: string;
  status: "active" | "frozen" | "cancelled";
  monthlySpend: number;
}

interface Props {
  cards: ICard[];
}

const Card: FC<Props> = ({ cards}) => {
  if (!cards.length) {
    return <div>No Cards data</div>;
  }

  return cards?.map((card) => (
    <div key={card.id}>
      {card.holder}
      {card.lastFour}
    </div>
  ));
};

export default Card;
