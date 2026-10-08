const FormField = (
  {label, id, name, minLength, defaultValue, error, itype = "text"}:
  {label: string, id: string, name: string, minLength: number, defaultValue: string, error: string, itype?: string}
) => {
  return (
    <div>
      <label>
        {label}
        <input
          type={itype}
          id={id}
          name={name}
          required
          //Removed to demonstrate that exercise 14 works (server side validation)
          //minLength={minLength}
          defaultValue={defaultValue}
        />
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}

export default FormField