export type SearchBarProps = {
  onSearch?: (text: string) => void;
  onClickUpdateLocation?: (location: number[]) => void;
}

export default function SearchBar(props: SearchBarProps) {
  return (<div className={"z-10"}>SearchBar</div>)
}