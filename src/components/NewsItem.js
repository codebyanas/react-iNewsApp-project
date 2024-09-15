import React from 'react'

export default function NewsItem({ $title, $description, $imageUrl, $url, $date, $sourceName }) {
    return (
        <>
            <div className="container my-4">
                <span className="badge text-bg-primary rounded-pill fw-normal">{$sourceName}</span>
                <div className="card">
                    <div className="card-header fst-italic">
                        Published at: <span className="fw-light">{$date}</span>
                    </div>
                    <img src={$imageUrl} className="card-img-left" alt="..." style={{ height: "185px" }} />
                    <div className="card-body">
                        <h5 className="card-title">{$title}...</h5>
                        <p className="card-text">{$description}...</p>
                        <a href={$url} rel="noreferrer" target="_blank" className="btn btn-link btn-readmore">Read More</a>
                    </div>
                </div>
            </div>
        </>
    )
}


