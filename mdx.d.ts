// Based on a Github discussion https://github.com/remix-run/react-router/issues/12362#issuecomment-2495714466
// Typescript was giving an error with mdx file imports that wasn't fixable following the nextjs instructions. This fixed the issue.
declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}