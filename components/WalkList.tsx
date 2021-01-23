import { DogWalk } from '../data/dogWalk';

type Props = {
  dogWalks: DogWalk[];
};

export default function WalkList({ dogWalks }: Props) {
  return (
    <ul className="walk-list">
      {dogWalks.map(({ id, petName, didPee, didPoop, walkedAt }) => (
        <li key={id}>
          {petName} - {walkedAt} - {didPee} - {didPoop}
        </li>
      ))}
    </ul>
  );
}
