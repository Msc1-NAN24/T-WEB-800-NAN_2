export type TextInputProps = {
  prefix?: string;
  onTextChange?: (text: string) => void;
  error?: boolean;
  errorText?: string;
  label?: string;
  type?: 'password' | 'text';
  placeholder?: string;
  value?: string;
}

export default function TextInput(props: TextInputProps) {
  const {prefix = "text", onTextChange = () => null, error = false, errorText = '', label = '', placeholder = '', value = undefined, type = 'text'} = props;

  return (
    <div>
      <label className="label">
        <span className={`${prefix}-label label-text`}>{label}</span>
      </label>
      <input value={value} className={`${prefix}-input input input-bordered w-full ${error ? 'border-red-500' : ''}`} onChange={(e) => onTextChange(e.currentTarget.value)} type={type} placeholder={placeholder}/>
      {error ? <label className="label">
        <span className={`${prefix}-error label-text-alt text-red-500`}>
          {errorText}
        </span>
      </label> : null}
    </div>
  )
}