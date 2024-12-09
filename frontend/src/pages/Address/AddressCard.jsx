import "../../styles/AddressCard.css";

const AddressCard = ({ firstName, lastName, address, onEdit, onRemove }) => {
	return (
		<div className="address-card">
			<div className="address-details">
				<p className="address-name">
					<strong>
						{firstName} {lastName}
					</strong>
				</p>
				<p>
					<strong>Address:</strong> {address.house}, {address.street},{" "}
					{address.area}
				</p>
				<p>
					<strong>City:</strong> {address.city}
				</p>
				<p>
					<strong>State:</strong> {address.state}
				</p>
				<p>
					<strong>Pincode:</strong> {address.postalCode}
				</p>
				<p>
					<strong>Phone:</strong> {address.phoneNumber}
				</p>
			</div>
			<div className="address-actions">
				<button onClick={() => onEdit(address._id)} className="edit-button">
					Set Default
				</button>
				<button onClick={() => onRemove(address._id)} className="remove-button">
					Remove
				</button>
			</div>
		</div>
	);
};

export default AddressCard;
