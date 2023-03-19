export default function TourInfo({tour}) {
    return (
        <div className='tour-details-container'>

            <div className='tour-details' >
                <h4 >{tour.data.doc.name}</h4>
                <h2>${tour.data.doc.price}</h2>
                <p>{tour.data.doc.summary}</p>

                <div className="tour-img">
                    <img width={'300px'} height='300px' src={`http://localhost:3000/img/tours/${tour.data.doc.imageCover}`} alt="tour img" />
                </div>
            </div>
        </div>
    )
}