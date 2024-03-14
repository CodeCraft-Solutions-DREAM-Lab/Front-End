import { Avatar, AvatarIcon } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

function UserAvatar() {
	let navigate = useNavigate();
	function handleClick() {
		navigate(`/profile/`);
	}

	return (
		<div className="flex items-center" onClick={handleClick}>
			<Avatar
				icon={<AvatarIcon />}
				classNames={{
					base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
					icon: "text-black/80",
				}}
			/>
		</div>
	);
}

export default UserAvatar;