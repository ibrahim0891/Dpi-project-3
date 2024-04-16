

let Home = () => {
  return (
    <div>
      <div className="post m-4 flex justify-between items-center">
        <div className=" w-8 h-8  m-3 border rounded-full flex justify-center items-center overflow-hidden bg-white">
          <img src={userData.avater} alt="" className=""/>
        </div>
        <div >
          <input type="text" className="w-full p-2 outline-none" placeholder="What's on your mind?"/>
        </div>
      </div>
      <div className="body">

      </div>
    </div>
  )
}

export default Home