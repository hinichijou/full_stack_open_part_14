import Link from "next/link"

const ListItemBox = (
  {href, text, liClassName = "listitembox", linkClassName = "listitem"}:
  {href: string, text: string, liClassName?: string, linkClassName?: string}
) => {
  return (
    <li className={liClassName}>
      <Link href={href} className={linkClassName}>
        {text}
      </Link>
    </li>
  )
}

export default ListItemBox