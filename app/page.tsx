const Home = () => {
  return (
    <div className="topdiv">
      <h2>blog app</h2>
      <div className="contentdiv">
        <div>
          A course app for{" "}
          <a href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs" className="link">
            Full Stack Open Next.js
          </a>
        </div>
        <div>
          See{" "}
          <a href="https://github.com/hinichijou/full_stack_open_part_14" className="link">
            https://github.com/hinichijou/full_stack_open_part_14
          </a>{" "}
          for the source code
        </div>
      </div>
    </div>
  )
}
export default Home