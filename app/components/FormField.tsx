const FormField = (
  {label, id, name, minLength = 0, defaultValue = "", error = "", itype = "text"}:
  {label: string, id: string, name: string, minLength?: number, defaultValue?: string, error?: string, itype?: string}
) => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <label className="flex items-center ml-1 mr-1 flex-1">
          {label}
        </label>
        <input
          type={itype}
          id={id}
          name={name}
          required
          //Removed to demonstrate that exercise 14 works (server side validation)
          //minLength={minLength}
          defaultValue={defaultValue}
        />
      </div>
      {error && <p style={{ color: "red" }} className="ml-1 mr-1">{error}</p>}
    </div>
  )
}

export default FormField