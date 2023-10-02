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
		</footer>
	);
};

export default Footer;

