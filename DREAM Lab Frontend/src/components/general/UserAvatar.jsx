import { Avatar } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../../images/profile.svg'; // Importing the SVG file

function UserAvatar() {
    let navigate = useNavigate();
    function handleClick() {
        navigate(`/profile/`);
    }

    return (
        <div className="flex items-center" onClick={handleClick}>
            <Avatar
                icon={<img src={ProfileIcon} alt="Profile" />} // Using the imported SVG file
                classNames={{
                    base: "bg-transparent", // Removing background gradient
                }}
            />
        </div>
    );
}

export default UserAvatar;
