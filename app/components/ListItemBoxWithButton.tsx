import Link from "next/link"
import FormButton, { FormButtonProps } from "@/components/FormButton"

const ListItemBoxWithButton = (
  {href, text, liClassName = "listitembox", linkClassName = "listitem", formButtonProps}:
  {href: string, text: string, liClassName?: string, linkClassName?: string, formButtonProps: FormButtonProps}
) => {
  return (
    <li className={liClassName}>
      <Link href={href} className={linkClassName}>
        {text}
      </Link>
      <FormButton
        {...formButtonProps}
      />
    </li>
  )
}

export default ListItemBoxWithButton