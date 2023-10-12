import {
	FacebookIcon,
	FacebookShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	PinterestIcon,
	PinterestShareButton,
	RedditIcon,
	RedditShareButton,
	TwitterShareButton,
	TwitterIcon,
	WhatsappIcon,
	WhatsappShareButton,
  } from "next-share";
  import {
	AiFillGithub,
	AiOutlineInstagram,
	AiOutlineLinkedin,
	AiOutlineYoutube,
  } from "react-icons/ai";

  import { RiTwitterXFill } from "react-icons/ri";
  
  const Footer = () => {
	return (
	  <footer className=" bg-white mt-24 p-4 flex  flex-col  md:flex-row  space-y-10 md:space-y-0  justify-between items-center  dark:bg-[#1a1a1a]">
		<div className="text-md dark:text-gray-300 md:ml-2">
		  ⚙️ Made with ❤️ by{" "}
		  <a href="https://www.github.com/DhanushNehru" className="underline">
			Dhanush Nehru
		  </a>
		</div>
  
		<div className="flex gap-4  flex-wrap">
		  <a
			href="https://github.com/DhanushNehru"
			className="hover:shadow-2xl  hover:translate-y-1"
		  >
			<AiFillGithub size={40} />
		  </a>
		  <a
			href="https://www.instagram.com/dhanush_nehru/"
			className="hover:shadow-2xl  hover:translate-y-1"
		  >
			<AiOutlineInstagram size={40} />
		  </a>
		  <a
			href="https://www.linkedin.com/in/dhanushnehru/"
			className="hover:shadow-2xl  hover:translate-y-1"
		  >
			<AiOutlineLinkedin size={40} />
		  </a>
		  <a
			href="https://twitter.com/Dhanush_Nehru"
			className="hover:shadow-2xl  hover:translate-y-1"
		  >
			<RiTwitterXFill size={40} />
		  </a>
		  <a
			href="https://www.youtube.com/@dhanushnehru?sub_confirmation=1"
			className="hover:shadow-2xl  hover:translate-y-1"
		  >
			<AiOutlineYoutube size={40} />
		  </a>
		</div>
  
		<div className="flex-col justify-center items-center space-y-2 mr-2">
		  <h1>Share</h1>
		  <div className="flex space-x-2">
			<div className="hover:shadow-2xl  hover:translate-y-1">
			  <PinterestShareButton url={"harmonycode.vercel.app/"}>
				<PinterestIcon size={32} round />
			  </PinterestShareButton>
			</div>
			<div className="hover:shadow-2xl  hover:translate-y-1">
			  <RedditShareButton url={"harmonycode.vercel.app/"}>
				<RedditIcon size={32} round />
			  </RedditShareButton>
			</div>
			<div className="hover:shadow-2xl  hover:translate-y-1">
			  <WhatsappShareButton url={"harmonycode.vercel.app/"}>
				<WhatsappIcon size={32} round />
			  </WhatsappShareButton>
			</div>
			<div className="hover:shadow-2xl  hover:translate-y-1">
			  <LinkedinShareButton url={"harmonycode.vercel.app/"}>
				<LinkedinIcon size={32} round />
			  </LinkedinShareButton>
			</div>
			<div className="hover:shadow-2xl  hover:translate-y-1">
			  <TwitterShareButton
				url={"harmonycode.vercel.app/"}
				style={{ marginRight: "40px" }}
			  >
				<TwitterIcon size={32} round />
			  </TwitterShareButton>
			</div>
		  </div>
		</div>
	  </footer>
	);
  };
  
  export default Footer;