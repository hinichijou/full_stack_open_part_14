export interface FormButtonProps {
  action: (fd: FormData) => Promise<void>,
  inputValue: number,
  text: string,
  buttonClass: string
}

const FormButton = (
  {action, inputValue, text, buttonClass}:
  FormButtonProps
) => {
  return (
    <form action={action} className="inline">
      <input type="hidden" name="id" value={inputValue} />
      <button type="submit" className={buttonClass}>
        {text}
      </button>
    </form>
  )
}

export default FormButton