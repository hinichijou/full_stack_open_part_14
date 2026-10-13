export interface FormButtonProps {
  action: (fd: FormData) => Promise<void>,
  inputValue: number,
  text: string,
  buttonClass: string,
  data_testid?: string
}

const FormButton = (
  {action, inputValue, text, buttonClass, data_testid = ""}:
  FormButtonProps
) => {
  return (
    <form action={action} className="inline">
      <input type="hidden" name="id" value={inputValue} />
      <button data-testid = {data_testid} type="submit" className={buttonClass}>
        {text}
      </button>
    </form>
  )
}

export default FormButton