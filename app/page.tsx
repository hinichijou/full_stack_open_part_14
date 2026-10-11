import Homepage from "@/app/home/homepage.mdx"
import Footer from "@/app/home/footer.mdx"

const Home = () => {
  return (
    <div className="topdiv">
      <div className="markdown mb-6">
        <Homepage />
      </div>
      <Footer />
    </div>
  )
}
export default Home