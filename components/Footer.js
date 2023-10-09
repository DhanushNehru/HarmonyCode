import {
	FacebookIcon,
	FacebookShareButton, LinkedinIcon, LinkedinShareButton,
	PinterestIcon,
	PinterestShareButton, RedditIcon,
	RedditShareButton,
	TwitterShareButton, TwitterIcon,
	WhatsappIcon,
	WhatsappShareButton
} from "next-share";
import { AiFillGithub, AiOutlineInstagram, FaXTwitter, AiOutlineLinkedin, AiOutlineYoutube } from "react-icons/ai"

const Footer = () => {
	return (
		<footer className=" bg-white mt-24 p-4 flex  flex-col  md:flex-row  space-y-10 md:space-y-0  justify-between items-center  dark:bg-[#1a1a1a]">

			<div className="text-md dark:text-gray-300 md:ml-2">
				⚙️ Made with ❤️ by{" "}
				<a
					href="https://www.github.com/DhanushNehru"
					className="underline"
				>
					Dhanush Nehru
				</a>
			</div>


			<div className="flex gap-4  flex-wrap">
				<a href="https://github.com/DhanushNehru"><AiFillGithub size={40} /></a>
				<a href="https://www.instagram.com/dhanush_nehru/"><AiOutlineInstagram size={40} /></a>
				<a href="https://www.linkedin.com/in/dhanushnehru/"><AiOutlineLinkedin size={40} /></a>
				<a href="https://twitter.com/Dhanush_Nehru"><FaXTwitter size={40} /></a>
				<a href="https://www.youtube.com/@dhanushnehru?sub_confirmation=1"><AiOutlineYoutube size={40} /></a>
			</div>


			<div className="flex-col justify-center items-center space-y-2 mr-2">
				<h1>Share</h1>
				<div className="flex-col space-x-2">
					<FacebookShareButton
						url={'harmonycode.vercel.app/'} >
						<FacebookIcon size={32} round />
					</FacebookShareButton>
					<PinterestShareButton
						url={'harmonycode.vercel.app/'} >
						<PinterestIcon size={32} round />
					</PinterestShareButton>
					<RedditShareButton
						url={'harmonycode.vercel.app/'} >
						<RedditIcon size={32} round />
					</RedditShareButton>
					<WhatsappShareButton
						url={'harmonycode.vercel.app/'} >
						<WhatsappIcon size={32} round />
					</WhatsappShareButton>
					<LinkedinShareButton
						url={'harmonycode.vercel.app/'} >
						<LinkedinIcon size={32} round />
					</LinkedinShareButton>
					<TwitterShareButton
						url={'harmonycode.vercel.app/'} 
						style={{ marginRight: '40px' }}>
						<TwitterIcon size={32} round />
					</TwitterShareButton>
				</div>
			</div>
		</footer>
	);
};

export default Footer;




