import { Result } from "../interface"

interface Props {
    character: Result
}
export const Card = ({ character }: Props) => {
    return (
        <div className='card z-0 w-1/3'>
            <img src={character.img} alt={character.fullName} width={50} loading='lazy' />
            <p className="text-3xl font-bold underline" >{character.fullName}</p>
            <ul>
            {
            character && character.jobs.map(job => (
              <li key={job}>{job}</li>
            ))
          }
          </ul>
        </div>
    )
}