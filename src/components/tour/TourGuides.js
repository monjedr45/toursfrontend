

export default function TourGuides({ guides }) {


    return (
        <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
            {guides.map(guide => (
                <div key={guide._id} className="overview-box__detail">
                    <img
                        src={`http://localhost:3000/img/users/${guide.photo}`}
                        alt={guide.role}
                        className="overview-box__img"
                    />
                    <span className="overview-box__label">{guide.role === 'lead-guide' ? 'Lead guide' : 'Tour guide'}</span>
                    <span className="overview-box__text">{guide.name}</span>
                </div>
            ))}

        </div>
    )
}
