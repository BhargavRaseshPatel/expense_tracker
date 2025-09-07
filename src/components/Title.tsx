
const Title = ({name, italic} : {name : string, italic ?: boolean}) => {
  return (
    <h2 className={`text-2xl font-bold ${italic && 'italic'}`}>{name}</h2>
  )
}

export default Title