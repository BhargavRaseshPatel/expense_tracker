
const Title = ({name, italic} : {name : string, italic ?: boolean}) => {
  return (
    <h1 className={`text-2xl font-bold ${italic && 'italic'}`}>{name}</h1>
  )
}

export default Title