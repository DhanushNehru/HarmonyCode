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

const Footer = () => {
	return (
		<footer className="bg-white shadow-lg mt-24 p-4 flex flex-col space-y-2 md:lg:flex-row md:lg:space-y-0 items-center justify-between dark:bg-[#1a1a1a]">
			<div className="text-md dark:text-gray-300">
				⚙️ Made with &hearts; by{" "}
				<a
					href="https://www.github.com/DhanushNehru"
					className="underline"
				>
					Dhanush Nehru
				</a>
			</div>
			<div style={{
				paddingRight: "80px",
			}}>
				<h1>Share</h1>
				<div style={{
					display: "flex",

				}}>
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
					url={'harmonycode.vercel.app/'} >
					<TwitterIcon size={32} round />
				</TwitterShareButton>
			</div>
			</div>
		</footer>
	);
};

export default Footer;

