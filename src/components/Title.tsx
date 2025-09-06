
const Title = ({name, italic} : {name : string, italic ?: boolean}) => {
  return (
    <div className={`text-2xl font-bold ${italic && 'italic'}`}>{name}</div>
  )
}

export default Title