import { FaFacebook,FaInstagram, FaTwitter, FaYoutube  } from 'react-icons/fa';


export default function About() {
  return (
    <div className='py-16 px-12 max-w-8xl mx-auto bg-red-100 w-full'>
      <h1 className='text-3xl font-bold mb-4 text-orange-600'>About Epic Homes</h1>
      <p className='mb-4 text-slate-700'>
      Leading real estate company Epic Homes specializes in guiding customers with the purchase, sale, and rental of homes in the most highly 
      demanded areas. Our experienced team of agents have a goal to provide outstanding customer service and helping an effortless purchase and
      sale transaction.
      </p>
      <p className='mb-4 text-slate-700'>
      Our purpose is to guide our customers in reaching their real estate objectives by giving them professional guidance, private time, and
      in-depth knowledge of the national real estate market. We can assist you at any stage of the process, whether you are wanting to purchase,
      sell, or rent a property.
      </p>
      <p className='mb-4 text-slate-700'>
      Our team of agents is dedicated to giving our clients the best possible service, and we have a wide range of real estate industry 
      expertise and knowledge. We are committed to making sure that each and every one of our clients has an exciting and fulfilling experience 
      when purchasing or selling a property.
      </p>

      <div className=" mt-16  w-full">
      <h1 className=" text-center font-bold text-4xl mb-12">My Blog</h1>
      <div className="flex flex-wrap justify-center  gap-16 w-full  mx-auto p-6">
        <div className=" bg-slate-100 w-80 rounded-md shadow-md overflow-hidden">
          <img
            className="w-80  h-72 object-cover shadow-md transform transition duration-600 hover:scale-105"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnhUS0d9g28kim8ggjP9rh5GJ-M5anP4M8h5439Mg6bA&s"
            alt=""
          />
          <div className=" p-4">
            <p className='font-semibold'>
              The 2024 Real Estate Market: A Look Ahead
            </p>
            <p className='text-slate-600 mt-4'> 
              This blog are on real estate investing, personal finance, realestate markiting and more...
            </p>
            <p className='font-semibold'>
              Read More...
            </p>
          </div>
        </div>

        <div className="bg-slate-100 w-80 rounded-md shadow-md overflow-hidden">
          <img
            className=" w-80 h-72 object-cover rounded-md transform transition duration-600 hover:scale-105"
            src="https://png.pngtree.com/thumb_back/fh260/background/20231008/pngtree-3d-rendering-money-transfer-for-real-estate-investment-image_13570308.png"
            alt=""
          />
          <div className="p-4">
          <p className='font-semibold'>
              How to be successful in Real Estate Investment?
            </p>
            <p className='text-slate-600 mt-4'> 
              This blog are on real estate investing, personal finance, realestate markiting and more...
            </p>
            <p className='font-semibold'>
              Read More...
            </p>
          </div>
        </div>

        <div className="bg-slate-100 w-80 rounded-md shadow-md overflow-hidden">
          <img
            className=" w-80 h-72 object-cover rounded-md transform transition duration-600 hover:scale-105"
            src="https://e1.pxfuel.com/desktop-wallpaper/300/848/desktop-wallpaper-secrets-to-successful-investing-in-real-estate-like-investing.jpg"
            alt=""
          />
          <div className="p-4">
          <p className='font-semibold'>
              Unique Real Estate Marketing Ideas to Attract More
            </p>
            <p className='text-slate-600 mt-4'> 
              This blog are on real estate investing, personal finance, realestate markiting and more...
            </p>
            <p className='font-semibold'>
              Read More...
            </p>
          </div>
        </div>
      </div>
    </div>


    <div className="bg-slate-200 text-black py-2 p-2 mt-auto">
      <div>
            <p className="flex justify-center text-center font-bold mt-2 gap-4">
                Copyright &copy; 2024 - Epic Homes | All Rights Reserved  |  <span className='gap-7'> </span>
                <span className='gap-10'> Contact us - </span>
                <FaFacebook />
                <FaInstagram />
                <FaYoutube />
                <FaTwitter />
            </p>
        </div>
            <hr className="my-2"/>
            <div>
              <p className='text-sm px-6 mb-4'> <span className='font-bold'>Notice: </span> You acknowledge and accept that Epic-Homes is not associated with to any of the transactions involving the products or services that are mentioned on the website. It is only a platform for sharing information about properties among developers, brokers, and owners. Epic-Homes does not hold any responsibility for their act in any circumstances.It is only a web-based application designed to exchange information about properties.</p>
            </div>
        </div>
    </div>
  )
}

