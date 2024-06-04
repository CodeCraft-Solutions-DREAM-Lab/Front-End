import Switch from "@mui/material/Switch";
import propTypes from "prop-types";

const handleToggleClick = (groupId) => {
	console.log(`Toggle button clicked for group ${groupId}`);

	// Add your toggle logic here
};

const CustomGroupRenderer = ({ group }) => {
	const groupClass = group.sala ? "sala" : "";
	return (
		<div className={`rct-sidebar-row ${groupClass}`} data-cy="group-row">
			{group.title}
			{!group.sala && (
				<Switch
					onChange={() => handleToggleClick(group.id)}
					defaultChecked
					color="white" // Customize the color of the switch
					sx={{
						width: 42,
						height: 26,
						padding: 0,
						margin: 0,
						marginLeft: 2,
						"& .css-1mpet1h-MuiSwitch-root .MuiSwitch-switchBase": {
							margin: "1px",
						},
						"& .MuiSwitch-switchBase": {
							padding: 0,
							margin: 0.3,
							transitionDuration: "300ms",
							"&.Mui-checked": {
								transform: "translateX(16px)",
								color: "#fff",
								"& + .MuiSwitch-track": {
									backgroundColor: "#fff", // Change to white
									opacity: 1,
									border: 0,
								},
								"&.Mui-disabled + .MuiSwitch-track": {
									opacity: 0.5,
								},
							},
							"&.Mui-focusVisible .MuiSwitch-thumb": {
								backgroundColor: "#042E55",
								border: "6px solid #fff",
							},
							"&.Mui-disabled .MuiSwitch-thumb": {
								backgroundColor: "#042E55", // Thumb color
								transform: "translateY(-50%)",
							},
							"&.Mui-disabled + .MuiSwitch-track": {
								opacity: 0.7,
							},
						},
						"& .MuiSwitch-thumb": {
							boxSizing: "border-box",
							width: 22,
							height: 22,
							backgroundColor: "#042E55", // Thumb color
						},
						"& .MuiSwitch-track": {
							borderRadius: 13, // Adjust the borderRadius as needed
							backgroundColor: "#fff", // Track color
							opacity: 1,
							transition: "background-color 500ms",
						},
					}}
				/>
			)}
		</div>
	);
};

CustomGroupRenderer.propTypes = {
	group: propTypes.object.isRequired,
};

export default CustomGroupRenderer;