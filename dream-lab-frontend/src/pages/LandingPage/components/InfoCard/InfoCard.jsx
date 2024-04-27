import "./InfoCard.css";

function InfoCard( { title, description, image } ) {
    return (
        <div className="info-card-container">
            <h1 className="title">{title}</h1>
            <p className="description">{description}</p>
            <img className="picture" src={image}/>
        </div>
    )
}

export default InfoCard;